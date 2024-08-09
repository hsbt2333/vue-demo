<template>
  <div>
    <div class="progress-node">
    <div class="label">{{ label }}</div>
    <el-progress :percentage="progress"></el-progress>
  </div>

  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.progress-node {
  border: 1px solid #5F95FF;
  border-radius: 4px;
  background-color: #f0f0f0;
  padding: 10px;
  width: 120px;
  text-align: center;
}
.label {
  margin-bottom: 5px;
}
</style>