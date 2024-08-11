<!-- 

  antv x6 自定义节点，带进度条
-->
<template>
  <div class="my-node">
    <div class="rect">
      <span class="left text">{{ nodeStatus }}</span>
      <span class="center text">{{ label }}</span>
      <span class="right text">节点 ID: {{ nodeId }}</span>
    </div>
    <div class="my-progress">
      <el-progress :percentage="percentage" :status="status" :format="myFormat" type="line" :stroke-width="12" :show-text="true" :text-inside="true" stroke-linecap="round">
      </el-progress>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    nodeStatus: String,
    nodeId: Number,
    label: String,
    percentage: Number,
  },
  data(){
    return {
      // success/exception/warning
      status: 'success',
      visable: false
    }
  },
  methods:{
    myFormat(percentage){
      return "进度 " + percentage + "%";
    }
  },
  mounted(){
    console.log(this.label)
  }
}
</script>

<style scoped>
.my-node{
  width: 240px;
  height: 40px;
}
.rect{
  display: grid;  
  grid-template-rows: 25% 50% 25%;
  align-items: start; 
  width: 240px;
  height: 50px;
  border-radius: 10px;
  margin: 1px;
  background-color: #3ba272;
}
.text{
  color: white;
  font-weight: 700;
}
.left{
  grid-row: 1;
  padding-left: 8px;
  font-size: 12px;
}
.center{
  grid-row: 2;
  justify-self: center; 
}
.right{
  grid-row: 3;
  justify-self: end; 
  align-self: flex-end;
  padding-right: 8px; 
  font-size: 12px;
}

.my-progress >>> .el-progress-bar__outer{

}
.my-progress >>> .el-progress-bar__inner{
  display: flex;
  justify-content: center;
  align-items: center; 
  position: relative;
}
.my-progress >>> .el-progress-bar__innerText{
  display: inline;
  vertical-align:text-top;
  font-size: 10px;
  color: white;
}
</style>