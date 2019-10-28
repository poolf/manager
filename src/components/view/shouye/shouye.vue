<template>
  <div class="shouye_wrapper">
      <el-container>
          <el-header>
              <m-header></m-header>
          </el-header>
          <el-container class="main_wrpper">
              <el-aside style="width:200px;">
                  <m-nav></m-nav>
              </el-aside>
              <el-main>
                  <router-view></router-view>
              </el-main>
          </el-container>
          <el-footer style="height:30px;">{{footerContext}}</el-footer>
      </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true,
      footerContext: '2019 @广东凯芝林 版权所有 Copyright © 研发中心'
    }
  }
}
</script>
<style lang="scss" scoped>
@import './shouye.scss';
</style>
