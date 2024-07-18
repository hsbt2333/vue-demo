<template>
  <el-tab-pane :label="label" :name="name" :disabled="disabled" :closable="closable">
    <template slot="label">
      <slot name="label"></slot>
    </template>
    <slot></slot>
  </el-tab-pane>
</template>

<script>
import { TabPane } from "element-ui/lib/tab-pane";
export default {
  name: "myTabPane",
  components: {
    TabPane,
  },
  props: {
    //标题
    label: String,
    //是否禁用
    disabled: Boolean,
    //选项卡别名
    name: String,
    //标签是否可关闭
    closable: Boolean,
    //页面路径，如果设置则自动内嵌<rtp-iframe>
    src: String,
    //设置了src有效，页面参数，会自动合并到src
    params: Object,
  },
};
</script>

<style scoped>
</style>