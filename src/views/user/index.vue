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
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column prop="date" label="日期" min-width="100px" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-input v-if="scope.row.seen" v-model="scope.row.name"></el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="120px" align="center"> </el-table-column>
      <el-table-column label="操作" min-width="100px" fixed="right" align="center">
        <template slot-scope="scope">
          <div v-if='scope.row.seen'>
            <span class='common-span edit-span' @click="handleEdit(scope.row)">
              <i class="el-icon-check"></i>{{ scope.row.submitLabel }}
            </span>
            <span class='common-span setting-span' @click="handleCancel(scope.row)">
              <i class="el-icon-close"></i>取消
            </span>
          </div>
          <div v-else>
            <span class='common-span edit-span' @click="handleEdit(scope.row)">
              <i class="el-icon-edit-outline"></i>编辑
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="addEdit" @search="search" />
    <!-- <app-report /> -->
    <!-- <div class="img-dev" id="dev1">
      <img clas="main-img" src="../../../public/0 04-29-27-1695.png" />
      <img class="img-up-1" src="../../../public/xiyangyang.png" width="122" height="122">
      <img class="img-down-1" src="../../../public/juejuezi.png" width="122" height="122">
    </div>

    <div class="img-dev" id="dev2">
      <img clas="main-img" src="../../../public/1 04-29-27-1995.png" />
      <img class="img-up-2" src="../../../public/xiyangyang.png" width="122" height="122">
      <img class="img-down-2" src="../../../public/juejuezi.png" width="122" height="122">
    </div>

    <div class="img-dev" id="dev3">
      <img clas="main-img" src="../../../public/2 04-29-27-2077.png" />
      <img class="img-up-3" src="../../../public/xiyangyang.png" width="122" height="122">
      <img class="img-down-3" src="../../../public/juejuezi.png" width="122" height="122">
    </div>
    <el-button @click="click1">生成1</el-button>
    <el-button @click="click2">生成2</el-button>
    <el-button @click="click3">生成3</el-button> -->
    <img id="meimg" class="black-and-white" src="../../../public/1.jpg" />
    <el-button @click="myClick">生成4</el-button>
  </div>
</template>
<script>
import addEdit from "./addEdit";
import html2canvas from 'html2canvas'

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
    myClick(){
      html2canvas(document.querySelector("#meimg")).then(canvas => {
        document.body.appendChild(canvas)
      });
    },
    click1(){
      html2canvas(document.querySelector("#dev1")).then(canvas => {
        document.body.appendChild(canvas)
      });
    },
    click2(){
      html2canvas(document.querySelector("#dev2")).then(canvas => {
        document.body.appendChild(canvas)
      });
    },
    click3(){
      html2canvas(document.querySelector("#dev3")).then(canvas => {
        document.body.appendChild(canvas)
      });
    },
    handleEdit(row){
      this.$set(row,'seen',true)
      row.submitLabel = '提交修改'
    },
    handleCancel(row){
      this.$set(row,'seen',false)
      row.submitLabel = ''
    },
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
<style scoped>
.common-span{
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: white;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  -o-user-select: none; /* Opera */
}
.edit-span{
  color: #D33B30;
}
.edit-span:hover {
  border-bottom-color: #D33B30;
}
.setting-span{
  color: #E6A23C;
}
.setting-span:hover {
  border-bottom-color: #E6A23C;
}

.img-dev {
  position: relative;
  display: inline-block;
}
.main-img {
  display: block;
}
.img-down-1 {
  position: absolute;
  top: 170px;
  left: -5px;
  transform: rotate(270deg);
}
.img-up-1 {
  position: absolute;
  top: -8px;
  right: 60px;
  transform: rotate(345deg);
}
.img-down-2{
  position: absolute;
  top: 170px;
  left: 5px;
  transform: rotate(270deg);
}
.img-up-2{
  position: absolute;
  top: 3px;
  right: 70px;
  transform: rotate(345deg);
}
.img-down-3{
  position: absolute;
  top: 160px;
  left: 0px;
  transform: rotate(270deg);
}
.img-up-3{
  position: absolute;
  top: -10px;
  right: 50px;
  transform: rotate(345deg);
}

.black-and-white {
  filter: grayscale(100%); /* 将图片转换为黑白 */
}
</style>
