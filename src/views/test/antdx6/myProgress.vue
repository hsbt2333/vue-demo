<template>
  <div>
    <el-progress :percentage="percentage" :type="type" :stroke-width="strokeWidth"
                :text-inside="textInside" :status="status" :color="color" :width="width"
                :show-text="showText" :stroke-linecap="strokeLinecap" :format="format"
                :define-back-color="defineBackColor" :text-color="textColor"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name: 'MyProgress',
  inject: ["getGraph", "getNode"],
  props: {
    percentage: {type: Number,default: 0},
    type: {type: String,default: 'line'},
    strokeWidth: {type: Number,default: 6},
    textInside: {type: Boolean,default: false},
    status: String,
    color: String,
    width: {type: Number,default: 126},
    showText: {type: Boolean, default: true},
    strokeLinecap: {type: String,default: 'round'},
    format: String,
    defineBackColor: String,
    textColor: String
  },
  mounted(){
  },
  created(){
  }
}
</script>

<style>

</style>