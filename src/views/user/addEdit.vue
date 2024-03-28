<template>
  <el-dialog
    title="添加"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form ref="myForm" :model="form" label-width="80px">
      <el-form-item label="二维数组" prop="myArr">
        <el-popover
          popper-class="my-popover"
          placement="right"
          width="400"
          trigger="click"
        >
          <div style="min-height: 500px">
            <el-button type="success" size="small" round @click="addItem(-1)">
              <i
                class="el-icon-circle-plus-outline"
                style="font-size: 12px"
              ></i>
              <span>增增增增增增增加</span>
            </el-button>
            <div
              v-for="(itemArr, index) in testArr"
              style="
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                padding: 5px;
                margin: 5px;
              "
            >
              <div>
                <i
                  class="el-icon-remove-outline text-center"
                  style="font-size: 18px; color: #f56c6c; cursor: pointer"
                  @click="removeItem(index)"
                ></i>
                <span style="font-size: 18px">
                  <span style="white-space: pre"> 实例{{ index + 1 }}: </span>
                  <span v-for="(item, index2) in itemArr">
                    <span v-if="item.key !== '' || item.value !== ''"
                      >{{ item.key }}={{ item.value }}</span
                    >
                    <span v-if="index2 !== itemArr.length - 1">,</span>
                  </span>
                </span>
              </div>
              <div v-for="(item, index2) in itemArr" style="margin: 8px">
                <el-row :gutter="20" type="flex" align="middle">
                  <el-col :span="8">
                    <el-input size="mini" v-model="item.key"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <span class="text-center">=</span>
                  </el-col>
                  <el-col :span="8">
                    <el-input size="mini" v-model="item.value"></el-input>
                  </el-col>
                  <el-col :span="2" v-show="itemArr.length > 1">
                    <i
                      class="el-icon-remove-outline text-center"
                      style="font-size: 25px; color: #f56c6c; cursor: pointer"
                      @click="removeItem(index, index2)"
                    ></i>
                  </el-col>
                  <el-col :span="2" v-show="index2 + 1 == itemArr.length">
                    <i
                      class="el-icon-circle-plus-outline text-center"
                      style="font-size: 25px; color: #67c23a; cursor: pointer"
                      @click="addItem(index)"
                    ></i>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <span class="my-arr" slot="reference">
            <i class="el-icon-edit-outline"></i>
            <span>编辑</span>
          </span>
        </el-popover>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        myArr: [],
      },
      testArr: [
        [
          {
            key: "",
            value: "",
          },
        ],
      ],
    };
  },
  watch: {
    // 此处监听variable变量，当期有变化时执行
    testArr(item1, item2) {
      console.log("old:", item1);
      console.log("new:", item2);
      this.arrayConversion(item2);
    },
  },
  computed: {},
  methods: {
    openDia() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.$refs["myForm"].resetFields();
      this.dialogVisible = false;
    },
    onSubmit() {
      console.log("submit!");
    },
    addItem(i) {
      if (i !== -1) {
        this.testArr[i].push({
          key: "",
          value: "",
        });
      } else {
        this.testArr.push([
          {
            key: "",
            value: "",
          },
        ]);
      }
    },
    removeItem(i, j) {
      if (j >= 0) {
        this.testArr[i].splice(j, 1);
      } else {
        this.testArr.splice(i, 1);
      }
    },
    arrayConversion(arr) {
      let resultArr = [];
      for (let i = 0; i < arr.length; i++) {
        let strItem = arr[i]
          .filter((item) => item && item.key !== "" && item.value !== "")
          .map((item) => item.key + "=" + item.value);
        resultArr.push(strItem);
      }
      let mapArr = arr.map((itemArr) =>
        itemArr
          .filter((item) => item && item.key !== "" && item.value !== "")
          .map((item) => item.key + "=" + item.value)
      );
      console.log("resultArr: ", resultArr);
      console.log("mapArr:", mapArr);
      //arr[i].map(item=>item.key+"="+item.value);
    },
  },
  created() {},
  mounted() {
    console.log("mounted");
  },
};
</script>
<style>
.my-arr {
  color: green;
  border-width: 1px;
  cursor: pointer;
}
.my-arr:hover {
  border-bottom-style: solid;
}
.el-popover.my-popover {
  border: 1px solid #dcdfe6;
}
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保文本垂直居中 */
}
</style>
