<template>
  <div>
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu class="my-menu" :router="true">
            <el-menu-item index="/user">
              <span slot="title">user</span>
            </el-menu-item>
            <el-menu-item index="/test">
              <span slot="title">test</span>
            </el-menu-item>
            <el-submenu index="/steal">
              <template slot="title">
                <span>take</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/steal/appReport">appReport</el-menu-item>
                <el-menu-item index="/steal/percentBar">percentBar</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="height: 700px">
          <router-view />
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="css" scoped>
.my-menu {
  height: 100%;
}
</style>