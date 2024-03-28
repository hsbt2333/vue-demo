<template>
    <el-tabs type="border-card" tab-position="left" style="height: 200px;">
        <my-tab-pane style="width: 100px;height: 100px;" v-for="(item, index) in list" :key="item.name+index" :name="item.name" :label="item.label">
            {{ item.label }}
        </my-tab-pane>
        <slot></slot>
    </el-tabs>
</template>
<script>
import myTabPane from '@/components/myTabPane.vue'

export default {
    components:{
        myTabPane
    },
    props:{
        list:[]
    },
    mounted() {
        console.log("mounted list:",this.list);
        let i = 1;
        console.log(i---++i);
    },
}
</script>