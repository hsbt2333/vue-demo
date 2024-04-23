<template>
    <div class="myDiv">
            <el-time-picker
                is-range
                v-model="abc"
                size="mini"
                :clearable="false"
                value-format="timestamp"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-time-picker>
              <i
                class="el-icon-success"
                style="color: #67C23A; font-size: 25px"
              ></i>
              <i
                class="el-icon-warning"
                style="color: #E6A23C; font-size: 20px"
              ></i>
              <i
                class="el-icon-error"
                style="color: #f56c6c; font-size: 15px"
              ></i>
              <span style="font-size: small;"> 让你放电影，你不是mv就是live，唱了一晚上了兄弟，你以为KTV啊，你耍我啊 </span>
          </div>
</template>
<script>
export default {
    data(){
      return {
        abc: ''
      }
    }
}
</script>
<style scoped>
.myDiv{
    display: flex;
    padding-bottom: 20px;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
}
</style>