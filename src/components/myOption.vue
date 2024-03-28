<template>
    <el-option :label="label" :value="value">
        <slot></slot>
    </el-option>
</template>
<script>
export default {
    components:{
    },
    props:{
        label: String,
        value: String
    },
    mounted() {
        
    },
}
</script>