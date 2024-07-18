<template>
  <div>
    <my-tabs v-model="activeTab" ref="tabs" :tabs="tabs">
      <my-tab-pane name="fisrt">
        <div class="my-div"></div>
      </my-tab-pane>
    </my-tabs>
  </div>
</template>

<script>
import {myTabs,myTabPane} from "@/components/extend";
export default {
  components:{
    myTabs,
    myTabPane
  },
  data() {
    return {
      activeTab: "fisrt",
      tabs: [
        {
          name: "home",
          label: "首页",
          src: ''
        },
        {
          name: "home",
          label: "首页",
          src: ''
        },
      ],
    };
  },
};
</script>

<style scoped>
.my-div{
  width: 300px;
  height: 300px;
  border: 1px solid #606266;
  background-color: #606266;
}
</style>