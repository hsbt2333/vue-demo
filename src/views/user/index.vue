<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="openAddEdit">添加</el-button>
        <el-button type="primary" @click="test1">Test1</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="true" style="width: 70%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <add-edit ref="addEdit" @search="search" />
    <!-- <app-report /> -->
  </div>
</template>
<script>
import addEdit from "./addEdit";

export default {
  components: {
    addEdit
  },
  props: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    openAddEdit() {
      this.$refs.addEdit.openDia();
    },
    test1() {
      this.$confirm("不允许手动执行", "提示", {
        showCancelButton: false,
        type: "warning",
      });
    },
    search(key){
      console.log(key)
    },
  },
  watch:{
  },
  created() {},
  mounted() {
    console.log("mounted");
  },
};
</script>
<style scoped></style>
