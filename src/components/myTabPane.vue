<template>
    <div>
        <el-tab-pane :name="name" :label="label">
            <slot></slot>
        </el-tab-pane>
        {{ name }} - {{ label }}
    </div>
</template>

<script>
export default {
    name: 'myTabPane',
    props:{
        name: String,
        label: String
    }
}
</script>