<template>
    <el-select v-model="value">
        <my-option v-for="(item, index) in list" :key="item.name+index" :value="item.name" :label="item.label" >

        </my-option>
        <slot></slot>
    </el-select>
</template>
<script>
import myOption from './myOption'

export default {
    components:{
        myOption
    },
    props:{
        list:[]
    },
    data(){
        return {
            value: ''
        }
    },
    mounted() {
        
    },
}
</script>