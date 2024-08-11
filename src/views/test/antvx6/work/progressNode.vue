<template>
  <div class="my-progress">
    <el-progress :format="myFormat" v-show="visible" :status="status" :percentage="percentage" :stroke-width="12"  :show-text="true" :text-inside="true" stroke-linecap="round" />
  </div>
</template>

<script>
export default {
  inject: ["getGraph", "getNode"],
  data() {
    return {
      label: '',
      visible: false,
      status: 'success',
      percentage: 0,
    };
  },
  methods:{
    myFormat(percentage){
      return "进度 " + percentage + "%";
    }
  },
  mounted() {
    const node = this.getNode();
    console.log(node);
    this.label = node.attrs.text.text;
    console.log(this.label);
    if(this.label === '每日任务前置处理'){
      this.visible = true;
      this.percentage = 0;
    }
    if(this.label === '后批批前检查'){
      this.visible = true;
      this.percentage = 75;
    }
    if(this.label === '主批后批-当日事务处理'){
      this.visible = true;
      this.percentage = 100;
    }
  },
};
</script>

<style scoped>
.my-progress{
  position: relative;
  top: 35px;
}

.my-progress >>> .el-progress-bar__innerText{
  display: inline;
  vertical-align:text-top;
  font-size: 12px;
  color: white;
}
</style>