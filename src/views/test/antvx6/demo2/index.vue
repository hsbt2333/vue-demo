<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
import { Graph, Shape } from '@antv/x6'
import '@antv/x6-vue-shape'
import ProgressNode from './progressNode.vue'

export default {
  components:{
    ProgressNode
  },
  data(){
    return {
      data: {

      },
    }
  },
  methods: {
  },
  mounted(){
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      grid: {
        size: 10,
        visible: true
      }
    })

    // 注册自定义节点
    Graph.registerNode('progress-node', {
      inherit: 'vue-shape',
      width: 120,
      height: 60,
      component: {
        template: `<progress-node :label="label" :progress="progress" />`,
        components: {
          ProgressNode
        },
        props: ['label','progress'],
        data() {
          return {
            label: this.label,
            progress: this.progress
          }
        }
      }
    })

    // 添加自定义节点到画布
    graph.addNode({
      x: 100,
      y: 100,
      shape: 'progress-node',
      data: {
        label: '任务 2',
        progress: 75
      }
    })
  },
  created(){

  }
}
</script>
<style scoped>
#container {
  width: 800px;
  height: 600px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>