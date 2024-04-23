<template>
    <div>
        <percent-bar :valueList="barData" :setBarItemColorFunc="setBarColor" stillShowZeroBar hasTextInside hasTooltip ensureLabelVisible />
    </div>
</template>

<script>

import percentBar from './components/percentBar.vue';
export default {
    components: {
        percentBar,
    },
    data(){
        return {
            barData: [
                {value: 5, name: '无调度', key: 'NoTask'},
                {value: 5, name: '运行中', key: 'Running'},
                {value: 5, name: '停止中', key: 'Stopping'},
                {value: 5, name: '失败', key: 'Failed'},
                {value: 5, name: '成功', key: 'Succeed'},
            ],
            color: {
                Running: '#73c0de',
                Succeed: '#3ba272',
                Failed: '#d33b30',
                Stopping: '#e58308',
                None: '#808080',
                NoTask: '#d3d3d3'
            },
        }
    },
    methods: {
        setBarColor({data: {key}}){
            return this.color[key]
        }
    }
}
</script>
<style scoped>

</style>