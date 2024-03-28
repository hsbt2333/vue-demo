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
                </el-main>
            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>
<script>
import myTabs from '@/components/myTabs.vue'
import mySelect from '@/components/mySelect.vue';
import userManage from '@/views/user/index.vue';

export default {
  name: "index",
  components:{
    myTabs,
    mySelect,
    userManage
  },
  data() {
    return {
        list: [
            {
                name: '1',
                label: '致命魔术'
            },
            {
                name: '2',
                label: '死神来了'
            }
        ]
    }
  },
};
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>