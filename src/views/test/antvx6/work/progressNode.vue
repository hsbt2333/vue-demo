<template>
  <div>
    <div class="rect">
      <span id="label" class="center text">{{ label }}</span>
    </div>
    <el-progress :percentage="38"></el-progress>
  </div>
</template>

<script>
export default {
  inject: ["getGraph", "getNode"],
  data() {
    return {
      label: '',
      model: {},
    };
  },
  mounted() {
    const node = this.getNode();
    console.log('node',node);
    this.label = node.attrs.text.text;
  },
};
</script>

<style scoped>
.rect{
  display: grid;  
  grid-template-rows: 25% 50% 25%;
  align-items: start; 
  width: 100px;
  height: 36px;
}
.center{
  grid-row: 2;
  justify-self: center; 
}
</style>