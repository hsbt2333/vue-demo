<template>
  <div>
    <div id="container"></div>
    <!-- <my-progress :percentage="65"></my-progress>
    <el-progress :percentage="20"></el-progress> -->
    <!-- <div style="width: 15%;">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="100" status="success"></el-progress>
    </div> -->
    <my-node :percentage="25" label="获取批量日期" nodeStatus="作业" :nodeId="-2"></my-node>

    <div class="my-div">
      <el-progress :show-text="false" :stroke-width="12" :percentage="25"></el-progress>
    </div>
    <div class="mydiv2"></div>
    <div class="mydiv3"></div>
  </div>
</template>
<script>
import "@antv/x6-vue-shape";
import { Graph } from "@antv/x6";
import MyProgress from "./myProgress.vue";
import MyNode from "./myNode.vue";

export default {
  components: {
    MyProgress,
    MyNode,
  },
  data() {
    return {
      graph: null,
      data: {
        // 节点
        nodes: [
          {
            id: "node1", // String，可选，节点的唯一标识
            shape: "rect", //指定矩形
            x: 40, // Number，必选，节点位置的 x 值
            y: 40, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            attrs: {
              body: {
                fill: "#2ECC71",
                stroke: "#000",
                strokeDasharray: "10,2",
              },
              label: {
                text: "Hello",
                fill: "#333",
                fontSize: 13,
              },
            },
            label: "hello", // String，节点标签
          },
          {
            id: "node2", // String，节点的唯一标识
            shape: "ellipse", //指定椭圆
            x: 160, // Number，必选，节点位置的 x 值
            y: 180, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            attrs: {
              body: {
                fill: "#F39C12",
                stroke: "#000",
                rx: 16,
                ry: 16,
              },
              label: {
                text: "World",
                fill: "#333",
                fontSize: 18,
                fontWeight: "bold",
                fontVariant: "small-caps",
              },
            },
            label: "world", // String，节点标签
          },
          {
            id: "node3", // String，节点的唯一标识
            shape: "rect",
            x: 10, // Number，必选，节点位置的 x 值
            y: 10, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "node3", // String，节点标签
          },
        ],
        // 边
        edges: [
          {
            source: "node1", // String，必须，起始节点 id
            target: "node2", // String，必须，目标节点 id
            //shape: 'double-edge',
            attrs: {
              line: {
                stroke: "orange",
              },
            },
          },
        ],
      },
    };
  },
  methods: {},
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("container"),
      width: 800,
      height: 600,
      background: {
        //color: '#fffbe6', // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    });

    //graph.fromJSON(this.data);
    this.graph.centerContent(); // 图形居中

    /* graph.addNode({
          id: 'node789',
          x: 100,
          y: 60,
          shape: 'custom-rect',
          label: 'My Custom Rect', // label 继承于基类的自定义选项

        }); */

    // 注册自定义节点
    Graph.registerNode(
      "my-node",
      {
        inherit: "vue-shape",
        width: 120,
        height: 60,
        component: {
          template: `<my-node :label="model.label" :percentage="model.percentage" :nodeStatus="model.nodeStatus" :nodeId="model.nodeId" />`,
          inject: ["getGraph", "getNode"],
          components: {
            MyNode,
          },
          data() {
            return {
              model: {},
            };
          },
          mounted() {
            console.log(this.props);
            console.log("num: ", this.num);

            const node = this.getNode();
            this.model = { ...node.data };
            console.log("node: ", node.data);
          },
        },
      },
      true
    );

    let mynode1 = this.graph.addNode({
      id: "mynode1",
      x: 100,
      y: 100,
      shape: "my-node",
      data: {
        label: "我的作业",
        nodeStatus: "作业",
        nodeId: 2,
        percentage: 10,
        num: 100,
      },
    });

    let mynode2 = this.graph.addNode({
      id: "mynode2",
      x: 100,
      y: 200,
      shape: "my-node",
      data: {
        label: "我的任务",
        nodeStatus: "任务",
        nodeId: 3,
        percentage: 75,
        num: 200,
      },
    });

    this.graph.addEdge({
      shape: "edge", // 指定使用何种图形，默认值为 'edge'
      source: mynode1,
      target: mynode2,
    });

    this.graph.centerContent();
  },
  created() {
    console.log("1111");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>
<style scoped>
.my-div{
  width: 200px;
  height: 200px;
}
.mydiv2{
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  background: #FE8620;
}
.mydiv3{
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  background: #DAEED2;
}
</style>