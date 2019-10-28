<template>
  <div class="manager_nav">
    <el-menu :collapse="iscollapse"
             default-active="managerIndex"
             @open="handleOpen"
             @close="handleClose"
             router
             class="el-menu-vertical-demo"
             background-color="#324157"
             text-color="#fff"
             active-text-color="#2f82ef">
      <el-menu-item index="managerIndex">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">测试导航1</span>
        </template>
        <el-submenu index="2-1">
          <span slot="title">测试选项1-1</span>
          <el-menu-item index="2-1-1">测试选项2.1.1</el-menu-item>
          <el-menu-item index="2-1-2">测试选项2.1.2</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-2">测试选项1-2</el-menu-item>
      </el-submenu> -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="adminUserAdd">用户信息添加</el-menu-item>
        <el-menu-item index="adminUserSearch">用户信息搜索</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">门店管理</span>
        </template>
        <el-submenu index="4-1">
          <span slot="title">门店信息管理</span>
          <el-menu-item index="adminBraAdd">门店信息添加</el-menu-item>
          <el-menu-item index="adminBraSearch">门店信息搜索</el-menu-item>
        </el-submenu>
        <el-menu-item index="adminBrandDisConList">门店配送规则管理</el-menu-item>
        <!-- <el-menu-item index="adminBraSearchUpdate">更新门店集群号</el-menu-item> -->
      </el-submenu>
      <el-submenu index="managerComm">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="adminProClassList">商品类别管理</el-menu-item>
        <el-submenu index="5-1">
          <span slot="title">商品信息管理</span>
          <el-menu-item index="adminProAdd">商品信息添加</el-menu-item>
          <el-menu-item index="adminProList">商品信息列表</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="managerOrder">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-submenu index="managerCluster">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">集群管理</span>
        </template>
        <el-menu-item index="branchCluster">门店集群管理</el-menu-item>
        <el-menu-item index="branPriceCluster">商品集群价格管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iscollapse: false,
      pagedefault: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  watch: {
    $route () {
      if (this.$route.meta.parentPath) {
        this.pagedefault = this.$route.meta.parentPath
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./managerNav.scss";
</style>
