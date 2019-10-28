<template>
  <div class="mHeader">
     <div class="header_title">
         <div class="header_icon">
             <img src="./logo.png" alt="">
         </div>
         <span><strong>{{titieName}}</strong></span>
     </div>
     <div class="header_bar">
        <div class="manager_user">{{ManagerName}}，你好</div>
        <el-tooltip class="item" effect="dark" content="有2条未读消息" placement="bottom-end">
           <el-button icon="el-icon-bell"></el-button>
        </el-tooltip>
        <el-dropdown>
            <span class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登陆</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
     </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      titieName: '广东凯芝林商城后台管理系统',
      isCollapse: false,
      ManagerName: 'zoraka'
    }
  },
  methods: {
    setCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
@import './managerHeader.scss';
</style>
