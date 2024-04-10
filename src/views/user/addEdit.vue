<template>
  <el-dialog
    title="添加"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form ref="myForm" :model="form" label-width="150px">
      <el-form-item label="二维数组" prop="myArr">
        <el-popover
          @show="myArrShow"
          @hide="myArrHide"
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
              <span>添加</span>
            </el-button>
            <div
              v-for="(itemArr, index) in testArr"
              style="
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                padding: 5px;
                margin: 5px;
              "
              :key="index"
            >
              <div>
                <i
                  class="el-icon-circle-close text-center"
                  style="font-size: 18px; color: #f56c6c; cursor: pointer"
                  v-show="testArr.length > 1"
                  @click="removeItem(index)"
                ></i>
                <span style="font-size: 16px">
                  <span style="white-space: pre"> 实例{{ index + 1 }}: </span>
                  <span
                    v-for="(item, index2) in itemArr"
                    :key="`${index}-${index2}`"
                  >
                    <span
                      v-if="
                        (item.key !== '' || item.value !== '') &&
                        index2 !== itemArr.length - 1
                      "
                      >{{ item.key }}={{ item.value }},</span
                    >
                    <span v-else-if="item.key !== '' || item.value !== ''"
                      >{{ item.key }}={{ item.value }}</span
                    >
                  </span>
                </span>
              </div>
              <div
                v-for="(item, index2) in itemArr"
                :key="`${index}-${index}-${index2}`"
                style="margin: 8px"
              >
                <el-row :gutter="20" type="flex" align="middle">
                  <el-col :span="8">
                    <el-input
                      size="mini"
                      v-model="item.key"
                      @change="clearTestArr"
                    ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <span class="text-center">=</span>
                  </el-col>
                  <el-col :span="8">
                    <el-input size="mini" v-model="item.value"></el-input>
                  </el-col>
                  <el-col :span="2" v-show="itemArr.length > 1">
                    <i
                      class="el-icon-error text-center custom-icon-button"
                      style="color: #f56c6c"
                      @click="removeItem(index, index2)"
                    ></i>
                  </el-col>
                  <el-col :span="2" v-show="index2 + 1 == itemArr.length">
                    <i
                      class="el-icon-circle-plus-outline text-center custom-icon-button"
                      style="color: #67c23a"
                      @click="addItem(index)"
                    ></i>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <span class="my-arr" slot="reference">
            <i class="el-icon-edit-outline"></i>
            <span>编辑 / 查看</span>
          </span>
        </el-popover>
        <span> 共 {{ form.myArr.length }} 组参数 </span>
      </el-form-item>
      <el-form-item label="时间范围" prop="myTimeArr">
        <el-popover
          @show="myTimeArrShow"
          @hide="myTimeArrHide"
          placement="right"
          width="400"
          trigger="click"
        >
          <div>
            <el-button
              type="success"
              size="mini"
              style="font-size: 12px"
              round
              @click="addMyTime"
            >
              <i class="el-icon-plus"></i>
              <span>添加一个时间范围</span>
            </el-button>
            <div
              class="loop-exe-time-div"
              v-for="(item, index) in testTimeArr"
              :key="index"
            >
              <el-row :gutter="20">
                <el-col :span="22">
                  <el-time-picker
                    is-range
                    v-model="testTimeArr[index]"
                    size="mini"
                    :clearable="false"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  >
                  </el-time-picker>
                </el-col>
                <el-col :span="2" style="margin-top: 5px">
                  <i
                    class="el-icon-error text-center custom-icon-button"
                    style="color: #f56c6c; font-size: 20px"
                    @click="removeMyTime(index)"
                  ></i>
                </el-col>
              </el-row>
            </div>
          </div>
          <span class="my-arr edit-look" slot="reference">
            <i class="el-icon-edit-outline"></i> 编辑
          </span>
        </el-popover>
        <span> 已设置 {{ form.myTimeArr.length }} 组范围 </span>
        <div>
          <span v-for="(item, index) in testTimeArr" :key="index">
            <span>{{ formatTime(item[0]) }} - {{ formatTime(item[1]) }}</span>
            <span
              v-show="
                testTimeArr.length > 1 && index !== testTimeArr.length - 1
              "
              >,</span
            >
            <br v-show="(index + 1) % 3 === 0" />
          </span>
        </div>
      </el-form-item>
      <el-form-item label="选项" prop="myRadio">
        <el-radio-group v-model="radioValue">
          <el-radio label="All"></el-radio>
          <el-radio label="">
            <el-input
              v-model.trim="myInput"
              :disabled="isInput && form.myRadio == 'All'"
              @input="isInput = true"
              placeholder="请输入内容"
            ></el-input>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="下拉框只读" prop="mySelect">
        <el-select
          class="readonly-select"
          v-model="form.mySelect"
          placeholder="请选择"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开关" prop="mySwitch">
        <el-switch :value="form.mySwitch" @change="handleSwitch"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      <el-button type="primary" @click="test1">测试1</el-button>
      <el-button type="primary" @click="test2">测试2</el-button>
      <el-button type="primary" @click="test3">测试3</el-button>
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
      isInput: false,
      form: {
        name: "",
        // 多个键值组成的字符串的数组 ['1=1,a=a,b=b','2=2','c=c,d=d','e=e,f=f,3=3']
        myArr: [],
        // 时间组
        myTimeArr: [],
        myRadio: "",
        mySwitch: false,
      },
      // 将myArr的结构转成比较容易理解的结构，二维数组，最小的元素是key value对象
      testArr: [
        [
          {
            key: "",
            value: "",
          },
        ],
      ],
      testTimeArr: [],
    };
  },
  watch: {
    /* 'form.name'(item1,item2){
      console.log("name new:", item1);
      console.log("name old:", item2);
    },
    // 此处监听variable变量，当期有变化时执行
    testArr(item1, item2) {
      console.log("testArr new:", item1);
      console.log("testArr old:", item2);
      this.arrayConversion(item2);
    },
    myTime(item1, item2) {
      console.log("myTime new:", item1);
      console.log("myTime old:", item2);
    },
    radioValue(item1,item2){
      console.log("radioValue new:", item1);
      console.log("radioValue old:", item2);
    },
    myInput(item1,item2){
      console.log("myInput new:", item1);
      console.log("myInput old:", item2);
    }, */
  },
  computed: {
    radioValue: {
      set(value) {
        this.form.myRadio = value;
      },
      get() {
        return this.form.myRadio == "All" ? this.form.myRadio : "";
      },
    },
    myInput: {
      set(value) {
        this.form.myRadio = value || "";
      },
      get() {
        if (this.isInput) {
          return this.form.myRadio;
        }
        return this.form.myRadio != "All" ? this.form.myRadio : "";
      },
    },
  },
  methods: {
    openDia() {
      this.dialogVisible = true;
      this.form.myRadio = "NHSC";
    },
    handleClose() {
      this.$refs["myForm"].resetFields();
      this.dialogVisible = false;
    },
    onSubmit() {
      console.log("submit!");
    },

    arrayConversion(arr) {
      let resultArr = [];
      for (let i = 0; i < arr.length; i++) {
        let strItem = arr[i]
          .filter((item) => item && item.key !== "" && item.value !== "")
          .map((item) => item.key + "=" + item.value);
        resultArr.push(strItem);
      }
      let mapArr = arr
        .map((itemArr) =>
          itemArr
            .filter((item) => item && item.key !== "" && item.value !== "")
            .map((item) => item.key + "=" + item.value)
        )
        .filter((arr) => arr.length > 0);
      console.log("resultArr: ", resultArr);
      console.log("mapArr:", mapArr);
      //arr[i].map(item=>item.key+"="+item.value);
    },
    test1() {
      let arr = ["1=1,2=2,3=3", "4=4", "5=5,6=6"];
      //["1=1,2=2","3=3,4=4"]
      let arr3 = arr.map((strItem) => {
        let arr1 = strItem.split(",");
        let arr2 = arr1.map((str) => {
          let strArr = str.split("=");
          return {
            key: strArr[0],
            value: strArr[1],
          };
        });
        console.log(arr2);
        return arr2;
      });
      console.log("abc:", arr3);
      arr3.push("111");
      console.log("abc:", arr3);
      arr3.pop();
      console.log("abc:", arr3);

      let a = {
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        i: "iii",
      };
      let b = {
        e: "e",
        a: "f",
        c: "f",
        d: "f",
        g: "g",
        h: "h",
        i: "iiiii",
      };
      a = { ...a, ...b };
      console.log(a);
    },
    test2() {
      let arr = ["1=1,2=2,3=3", "4=4", "5=5,6=6"];
      let arr3 = arr.map((strItem) => {
        return strItem.split(",").map((str) => {
          let [key, value] = str.split("=");
          return { key, value };
        });
      });
      console.log("arr3:", arr3);
    },
    test3() {
      let str = "1=";
      let arr = str.split(",");
      console.log("bbb:", arr);
    },
    handleSwitch() {
      this.$confirm("啦啦啦?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.mySwitch = true;
        })
        .catch(() => {
          this.form.mySwitch = false;
        });
    },
    myArrShow() {
      // 隐藏弹出框，将 myArr 传递给 testArr
      let arr = this.form.myArr;
      console.log(arr)
      this.testArr = arr.map((strItem) => 
        strItem.split(",").map((str) => {
          let [key, value] = str.split("=");
          return { key, value };
        })
      );
      console.log(this.testArr)
    },
    myArrHide() {
      // 隐藏弹出框，将 testArr 传递给 myArr
      this.form.myArr = this.testArr
        .map((itemArr) =>
          itemArr
            .filter((item) => item && item.key !== "" && item.value !== "")
            .map((item) => item.key + "=" + item.value)
            .join(',')
        )
        .filter((array) => array.length > 0);
        console.log(this.form.myArr)
    },
    clearTestArr() {
      this.testArr = this.testArr
        .map((itemArr) =>
          itemArr
            .filter((item) => item.key !== "" || item.value !== "")
            .map((item) => item)
        )
        .filter((array) => array.length > 0);
      console.log(this.extParamList);
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
    // 存在时间重合返回true 不存在返回false
    existTimeIntersect(timeArr) {
      for (let i = 0; i < timeArr.length - 1; i++) {
        const [start1, end1] = timeArr[i];
        for (let j = i + 1; j < timeArr.length; j++) {
          const [start2, end2] = timeArr[j];
          if (!(end1 < start2 || end2 < start1)) {
            console.log("循环生效时间存在重合的时间区间");
            return true;
          }
        }
      }
      return false;
    },
    formatTime(dateTime) {
      let hour = dateTime.getHours().toString().padStart(2, "0");
      let minute = dateTime.getMinutes().toString().padStart(2, "0");
      let second = dateTime.getSeconds().toString().padStart(2, "0");
      return hour + ":" + minute + ":" + second + " ";
    },
    myTimeArrShow() {
      console.log("this.form.myTimeArr: ", this.form.myTimeArr);
      console.log("this.testTimeArr: ", this.testTimeArr);
    },
    myTimeArrHide() {
      this.form.myTimeArr = this.testTimeArr.map((timeArr) => {
        let [startTime, endTime] = timeArr.map((item) => item.getTime());
        return { startTime, endTime };
      });
    },
    addMyTime() {
      this.testTimeArr.push([
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 1, 1, 23, 59, 59),
      ]);
    },
    removeMyTime(index) {
      this.testTimeArr.splice(index, 1);
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
.custom-icon-button {
  font-size: 25px;
  cursor: pointer;
}

.edit-look {
  color: #d33b30;
  cursor: pointer;
  padding-bottom: 2px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: white;
}
.edit-look:hover {
  border-bottom-color: red;
}
.readonly-select:hover {
  cursor: not-allowed;
}
</style>
