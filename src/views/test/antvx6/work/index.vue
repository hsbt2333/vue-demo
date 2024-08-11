<template>
  <div>
    <div id="container" class="container"></div>
  </div>
</template>

<script>
import "@antv/x6-vue-shape";
import { Graph, Shape, Addon } from '@antv/x6'
import dataJson from "./data.json";
import ProgressNode from "./progressNode.vue";

export default {
  components: {
  },
  data() {
    return {
      graph: null,
      ports: {},
      dataJson,
    };
  },
  methods: {
    initGraph() {
      // 初始化画布
      this.graph = new Graph({
        container: document.getElementById('container'),
        grid: 0,

        panning: {
          enabled: true,
          eventTypes: ["leftMouseDown", "mouseWheel"],
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: "ctrl",
          minScale: 0.5,
          maxScale: 3,
        },
        interacting: {
          edgeLabelMovable: false,
          nodeMovable: (cellView) => {
            return !!cellView.graph.options.editable;
          },
          magnetConnectable: (cellView) => {
            return !!cellView.graph.options.editable;
          },
        },
        connecting: {
          router: {
            name: "manhattan",
            args: {
              padding: 1,
            },
          },
          connector: {
            name: "rounded",
            args: {
              radius: 8,
            },
          },
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#A2B1C3",
                  strokeWidth: 2,
                  targetMarker: {
                    name: "block",
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            });
          },
          validateConnection({ targetMagnet }) {
            return !!targetMagnet;
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#5F95FF",
                stroke: "#5F95FF",
              },
            },
          },
        },
        snapline: true,
        keyboard: true,
        clipboard: true,
        history: true,
      });
      this.graph.options.editable = false; //不可拖拉
    },
    // 绑定画布快捷键
    graphBindKey() {
      this.graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.copy(cells)
        }
        return false
      })
      this.graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.cut(cells)
        }
        return false
      })
      this.graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 })
          this.graph.cleanSelection()
          this.graph.select(cells)
        }
        return false
      })
      // undo redo
      this.graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (this.graph.history.canUndo()) {
          this.graph.history.undo()
        }
        return false
      })
      this.graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (this.graph.history.canRedo()) {
          this.graph.history.redo()
        }
        return false
      })
      // select all
      this.graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = this.graph.getNodes()
        if (nodes) {
          this.graph.select(nodes)
        }
      })
      // delete
      this.graph.bindKey('backspace', () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.removeCells(cells)
        }
      })
      // zoom
      this.graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = this.graph.zoom()
        if (zoom < 1.5) {
          this.graph.zoom(0.1)
        }
      })
      this.graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = this.graph.zoom()
        if (zoom > 0.5) {
          this.graph.zoom(-0.1)
        }
      })
    },
    // 画布绑定监听事件
    graphOnEvent() {
      // 控制连接桩显示/隐藏
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      /* this.graph.on('node:mouseenter', () => {
        const container = document.getElementById(this.id)
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, true)
      })
      this.graph.on('node:mouseleave', () => {
        const container = document.getElementById(this.id)
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, false)
      }) */
      // 监听点击画布的节点
      this.graph.on('node:click', ({ e, x, y, node, view }) => {
        this.curNode = node
        this.isNode = true
      })
      // 监听画布添加节点动作
      this.graph.on('node:added', ({ node, index, options }) => {
        this.curNode = node
        this.isNode = true
        // todo 监听到画布添加了node之后，调后端接口创建一个接口
        // console.log('node:added')
        // console.log(node)
        // console.log(node.attrs.text.fontSize)
        // node.setLabel('xwtest') // 修改label的值
        // console.log('监听到拖入一个控件id：' + node.id)
        // console.log(this.graph.getNodes())
      })
      // 监听画布移除节点动作
      this.graph.on('node:removed', ({ node, index, options }) => {
        this.curNode = node
        // console.log('node:removed')
        // console.log(node)
      })
      // 监听节点之间连接动作
      this.graph.on('edge:added', ({ edge, index, options }) => {
        this.isNode = false
        this.curEdge = edge
        // todo 监听到连接线动作之后，调后端接口绑定关系
        // console.log('edge:added')
        // console.log(edge)
      })
      // 监听点击节点之间连接动作
      this.graph.on('edge:click', ({ e, x, y, edge, view }) => {
        this.isNode = false
        this.curEdge = edge
        // console.log('edge:click')
      })
      // 监听节点之间移除连接动作
      this.graph.on('edge:removed', ({ edge, index, options }) => {
        // todo 监听到连接线动作之后，调后端接口绑定关系
        // console.log('edge:removed')
        // console.log(edge)
      })

      // 监听边右键动作
      this.graph.on('edge:contextmenu', ({ e, x, y, edge, view }) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          this.$refs.menuBar.initFn(e.offsetX, e.offsetY + 41, { type: 'edge', item: edge })
        })
      })
      // 监听节点右键动作
      this.graph.on('node:contextmenu', ({ e, x, y, node, view }) => {
        this.showContextMenu = true
        this.$nextTick(() => {
          // this.$refs.menuBar.setItem({ type: 'node', item: node })
          let status = '0'
          for (let i = 0; i < this.nodeStatusList.length; i++) {
            if (this.nodeStatusList[i].flowJobId === node.label) {
              status = this.nodeStatusList[i].status
              break
            }
          }
          let isBreakPointSet = false
          for (let i = 0; i < this.breakPointList.length; i++) {
            if (this.breakPointList[i].flowJobId === node.label) {
              isBreakPointSet = this.breakPointList[i].breakPoint
              break
            }
          }
          const p = this.graph.localToPage(x, y)
          this.$refs.menuBar.initFn(p.x - 200, p.y - 120, {
            type: 'node',
            item: node,
            status: status,
            isBreakPointSet: isBreakPointSet
          })
        })
      })
      // 监听节点单击选中
      this.graph.on('cell:click', evt => {
        if (this.selectCell) {
          this.selectCell.removeTools()
        }
        console.log('  this.selectCell', this.selectCell)

        const { cell, node } = evt
        console.log('  evt', evt)
        if (cell.isNode()) {
          this.graph.centerCell(node, { padding: { top: 200 } })
          this.selectCell = cell
          //#region
          this.selectCell.addTools([
            {
              name: 'boundary',
              args: {
                padding: 1,
                attrs: {
                  stroke: '#5F95FF',
                  fill: '#7c68fc',
                  'stroke-width': 3,
                  'fill-opacity': 0.2,
                  'stroke-dasharray': '5,5',
                  'pointer-events': 'none'
                }
              }
            }
          ])
          //#endregion
        }
      })

      // 监听节点双击动作
      this.graph.on('node:dblclick', ({ e, x, y, node, view }) => {
        console.log('node:dblclick')
        console.log('node:dblclick', this.batchName)
        let arr = this.flowJobList
        this.$nextTick(() => {
          if (node.data.typeNode === 'dialogJob') {
            this.$refs.dialogJob.visible = true
            this.$refs.dialogJob.init({ type: 'node', batchName: this.batchName, item: node }, arr)
          } else if (node.data.typeNode === 'dialogExternJob') {
            this.$refs.dialogExternJob.visible = true
            this.$refs.dialogExternJob.init({ type: 'node', item: node })
          } else if (node.data.typeNode === 'dialogGroup') {
            this.$refs.dialogGroup.visible = true
            this.$refs.dialogGroup.init({ type: 'node', batchName: this.batchName, item: node }, arr)
          } else if (node.data.typeNode === 'dialogEventFire') {
            this.$refs.dialogEventFire.visible = true
            this.$refs.dialogEventFire.init({ type: 'node', item: node })
          } else if (node.data.typeNode === 'dialogEventWait') {
            this.$refs.dialogEventWait.visible = true
            this.$refs.dialogEventWait.init({ type: 'node', item: node })
          } else if (node.data.typeNode === 'dialogConnector') {
            // this.$refs.dialogConnector.visible = true
            // this.$refs.dialogConnector.init({type: 'node', item: node})
          } else if (node.data.typeNode === 'dialogStart') {
            this.$refs.dialogStart.visible = true
            this.$refs.dialogStart.init({ type: 'node', item: node })
          }
        })
      })

      // 运行时边线动画
      this.graph.on('edge:connected', ({ edge }) => {
        edge.attr({
          line: {
            strokeDasharray: ''
          }
        })
      })
      this.graph.on('node:change:data', ({ node }) => {
        // console.log('node', node)
        const edges = this.graph.getIncomingEdges(node)
        // console.log('edges', edges)
        const { status } = node.getData()
        edges?.forEach(edge => {
          const sourceNode = edge.getSourceNode()
          const sourceStatus = sourceNode.getData().status
          if ((status === '1' && sourceStatus === '2') || (status === '6' && sourceStatus === '2')) {
            edge.attr('line/strokeDasharray', 5)
            edge.attr('line/style/animation', 'running-line 30s infinite linear')
          } else {
            edge.attr('line/strokeDasharray', '')
            edge.attr('line/style/animation', '')
          }
        })
      })
    },
    initPorts() {
      this.ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden'
                }
              }
            }
          }
        },
        items: [
          {
            group: 'top'
          },
          {
            group: 'right'
          },
          {
            group: 'bottom'
          },
          {
            group: 'left'
          }
        ]
      }
    },
    // 渲染所有左侧控件图形
    loadStencil() {
      //起始节点
      Graph.registerNode(
        'custom-start',
        {
          inherit: 'rect',
          width: 200,
          height: 45,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626',
              textWrap: {
                width: -10,
                height: -10,
                ellipsis: true
              }
            }
          },
          ports: {
            groups: {
              topStart: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                }
              },
              rightStart: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                }
              },
              bottomStart: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                }
              },
              leftStart: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden'
                    }
                  }
                }
              }
            },
            items: [
              {
                group: 'topStart'
              },
              {
                group: 'rightStart'
              },
              {
                group: 'bottomStart'
              },
              {
                group: 'leftStart'
              }
            ]
          }
        },
        true
      )
      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'vue-shape',
          width: 200,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626',
              textWrap: {
                width: -10,
                height: -10,
                ellipsis: true
              }
            }
          },
          ports: { ...this.ports }
        },
        true
      )

      Graph.registerVueComponent("ProgressNode", ProgressNode, true);
      /* Graph.registerNode("ProgressNode", {
          inherit: 'vue-shape',
          width: 200,
          height: 36,
          component: ProgressNode,
          attrs: {
            body: {
            },
            text: {},
          },
          ports: { ...this.ports }
        }, true); */

      Graph.registerNode(
        'custom-polygon',
        {
          inherit: 'polygon',
          width: 70,
          height: 35,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626'
            }
          },
          ports: { ...this.ports }
        },
        true
      )

      Graph.registerNode(
        'custom-circle',
        {
          inherit: 'circle',
          width: 48,
          height: 48,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626'
            }
          },
          ports: { ...this.ports }
        },
        true
      )
      Graph.registerNode(
        'custom-cylinder',
        {
          inherit: 'cylinder',
          width: 62,
          height: 48,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626',
              refY: 32
            },
            top: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            }
          },
          ports: { ...this.ports }
        },
        true
      )

      Graph.registerNode(
        'custom-text',
        {
          inherit: 'text-block',
          width: 60,
          height: 36,
          attrs: {
            body: {
              // strokeWidth: 0,
              rx: 4,
              ry: 4,
              fill: '#fff',
              stroke: '#fff'
            },
            text: {
              fontSize: 12,
              fill: '#000'
            }
          },
          ports: { ...this.ports }
        },
        true
      )

      Graph.registerNode(
        'custom-path',
        {
          inherit: 'path',
          width: 60,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF'
            },
            text: {
              fontSize: 12,
              fill: '#262626'
            }
          },
          ports: { ...this.ports }
        },
        true
      )
      Graph.registerNode(
        'custom-image',
        {
          inherit: 'rect',
          width: 200,
          height: 52,
          markup: [
            {
              tagName: 'rect',
              selector: 'body'
            },
            {
              tagName: 'image'
            },
            {
              tagName: 'text',
              selector: 'label'
            }
          ],
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#00A4FF',
              fill: '#00A4FF'
            },
            image: {
              width: 26,
              height: 26,
              refX: 13,
              refY: 16
            },
            label: {
              refX: 3,
              refY: 2,
              textAnchor: 'left',
              textVerticalAnchor: 'top',
              fontSize: 12,
              fill: '#fff'
            }
          },
          ports: { ...this.ports }
        },
        true
      )
      // const r1 = this.graph.createNode({
      //   shape: 'custom-rect',
      //   label: '开始',
      //   attrs: {
      //     body: {
      //       rx: 18,
      //       ry: 26
      //     }
      //   }
      // })
      // const r2 = this.graph.createNode({
      //   shape: 'custom-rect',
      //   label: '过程'
      // })
      // const r3 = this.graph.createNode({
      //   shape: 'custom-rect',
      //   attrs: {
      //     body: {
      //       rx: 6,
      //       ry: 6
      //     }
      //   },
      //   label: '可选过程'
      // })
      // const r4 = this.graph.createNode({
      //   shape: 'custom-polygon',
      //   attrs: {
      //     body: {
      //       refPoints: '0,10 10,0 20,10 10,20'
      //     }
      //   },
      //   label: '决策'
      // })
      // const r5 = this.graph.createNode({
      //   shape: 'custom-polygon',
      //   attrs: {
      //     body: {
      //       refPoints: '10,0 40,0 30,20 0,20'
      //     }
      //   },
      //   label: '数据'
      // })
      // const r6 = this.graph.createNode({
      //   shape: 'custom-circle',
      //   label: '连接'
      // })
      // const r7 = this.graph.createNode({
      //   shape: 'custom-cylinder',
      //   label: '数据库'
      // })
      // const r8 = this.graph.createNode({
      //   shape: 'custom-path',
      //   label: '文档',
      //   attrs: {
      //     body: {
      //       refD: 'M 0 0 0 4 C 10 8 15 2 25 5 L 25 0 Z'
      //     }
      //   }
      // })
      // const r9 = this.graph.createNode({
      //   shape: 'custom-path',
      //   label: '手动输入',
      //   attrs: {
      //     body: {
      //       refD: 'M 0 7 0 15 15 15 15 5 Z'
      //     }
      //   }
      // })
      // const r10 = this.graph.createNode({
      //   shape: 'custom-text',
      //   text: '文本'
      // })
      // this.stencil.load([r1, r2, r3, r4, r5, r6, r7, r8, r9, r10], 'group1')
      // const imageShapes = [
      //   {
      //     label: 'Client',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg'
      //   },
      //   {
      //     label: 'Http',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg'
      //   },
      //   {
      //     label: 'Api',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg'
      //   },
      //   {
      //     label: 'Sql',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg'
      //   },
      //   {
      //     label: 'Clound',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg'
      //   },
      //   {
      //     label: 'Mq',
      //     image:
      //       'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg'
      //   }
      // ]
      // const imageNodes = imageShapes.map((item) =>
      //   this.graph.createNode({
      //     shape: 'custom-image',
      //     label: item.label,
      //     attrs: {
      //       image: {
      //         'xlink:href': item.image
      //       }
      //     }
      //   })
      // )
      // this.stencil.load(imageNodes, 'group2')
    },
    initData(data = []) {
      const cells = []
      data.forEach(item => {
        if (item.shape === 'edge') {
          cells.push(this.graph.createEdge(item))
        } else {
          delete item.component
          // if (item.size) {
          //   item.size.width = '180'
          // }
          item.component = 'ProgressNode';
          console.log(item);
          cells.push(this.graph.createNode(item))
        }
      })
      this.graph.resetCells(cells)
    },
  },
  mounted() {
    console.log(this.dataJson);

    this.initGraph();
    this.graphBindKey();
    this.graphOnEvent();
    this.initPorts();
    this.loadStencil();
    this.initData(this.dataJson);
  },
  created() {
    
  },
};
</script>

<style scoped>
.container{
  width: 1200px;
  height: 500px;
}
</style>