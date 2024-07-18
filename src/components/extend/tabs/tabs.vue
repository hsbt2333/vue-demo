<template>
  <!-- @tab-click="onTabClick" @tab-remove="onTabRemove" -->
  <el-tabs ref="elTabs" :value="value" :type="type" :tab-position="tabPosition" :before-leave="beforeLeave">
    <my-tab-pane v-for="(item,index) in tabs"  :key="index" :name="item.name" :closable="item.closable" :src="item.src" :params="item.params" />
   <slot></slot>
  </el-tabs>
</template>

<script>
import { Tabs } from "element-ui/lib/tabs";
import myTabPane from "./tabPane.vue";
export default {
  name: "myTabs",
  components: {
    Tabs,
    myTabPane,
  },
  props: {
    //选中选项卡的 name
    value: String,
    /**
     * 风格类型，可选值：
     * card     - 选项卡
     * border-card  - 卡片化
     * base     - 简洁样式
     */
    type: {
      type: String,
      default: "card",
    },
    //选项卡数组，每项的属性与<rtp-tab-pane>一致
    tabs: Array,
    //选项卡所在位置
    tabPosition: String,
    //切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
    beforeLeave: Function,
  },
};
</script>

<style scoped>
</style>