<template>
  <div>
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
          <!-- <h1>Main</h1>
                    <my-tabs :list="list">
                        
                    </my-tabs>
                    <my-select :list="list"></my-select>
                    <el-tabs type="border-card" tab-position="left" style="height: 200px;">
                        <el-tab-pane v-for="(item, index) in list" :key="index" :name="item.name" :label="item.label">
                            {{ item.label }}
                        </el-tab-pane>
                    </el-tabs> -->
          <user-manage />
          <el-row :gutter="20">
            <el-col :span="16"
              ><div class="grid-content bg-purple"></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple"></div
            ></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="9">
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
            </el-col>
            <el-col :span="2">
              <i
                class="el-icon-error"
                style="color: #f56c6c;font-size: 18px; margin-top: 5px;"
              ></i>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content bg-purple"></div
            ></el-col>
            <el-col :span="16"
              ><div class="grid-content bg-purple"></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple"></div
            ></el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import myTabs from "@/components/myTabs.vue";
import mySelect from "@/components/mySelect.vue";
import userManage from "@/views/user/index.vue";

export default {
  name: "index",
  components: {
    myTabs,
    mySelect,
    userManage,
  },
  data() {
    return {
      list: [
        {
          name: "1",
          label: "致命魔术",
        },
        {
          name: "2",
          label: "死神来了",
        },
      ],
      abc:[]
    };
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>