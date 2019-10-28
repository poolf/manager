<template>
  <div class="login">
    <div class="bg_login">
      <div class="bg_left">
        <div class="bg_left_canvas"></div>
        <div class="bg_picutre">
          <div><img class="img1"
                 src="./img/picture.png"
                 alt=""></div>
          <div><img class="img2"
                 src="./img/material.png"
                 alt=""></div>
          <div><img class="img3"
                 src="./img/globe.png"
                 alt=""></div>
          <div><img class="img4"
                 src="./img/calendar.png"
                 alt=""></div>
          <div><img class="img5"
                 src="./img/envelope.png"
                 alt=""></div>
        </div>
      </div>
      <div class="bg_right">
        <div class="bg_right_canvas"></div>
        <div class="bg_picutre">
          <div><img class="img1"
                 src="./img/wheel.png"
                 alt=""></div>
          <div><img class="img2"
                 src="./img/folder.png"
                 alt=""></div>
          <div><img class="img3"
                 src="./img/filepacket.png"
                 alt=""></div>
          <div><img class="img4"
                 src="./img/notebook.png"
                 alt=""></div>
          <div><img class="img5"
                 src="./img/upload.png"
                 alt=""></div>
          <div><img class="img6"
                 src="./img/label.png"
                 alt=""></div>
        </div>
      </div>
      <div class="bg_top"></div>
      <div class="bg_bottom"></div>
    </div>
    <div class="login_title">
      <span>{{managerTtile}}</span>
    </div>
    <div class="login_wrapper">
      <div class="login_name">
        <span class="title1">登陆</span>
        <el-divider direction="vertical"></el-divider>
        <span class="title2">LOG IN</span>
      </div>
      <div class="login_content">
        <el-form :model="loginform"
                 :rules="rules"
                 ref="loginform"
                 label-width="70px">
          <el-form-item label="用户 :"
                        prop="username">
            <el-input class="inputclass"
                      v-model="loginform.username"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码 :"
                        prop="psw">
            <el-input class="inputclass"
                      v-model="loginform.psw"
                      type="password"
                      placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <span>找回密码</span>
      </div>
      <div class="login_button">
        <el-button @click="openIndex()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      managerTtile: '欢迎登录凯芝林商城智能后台',
      loginform: {
        username: 'admin',
        psw: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', tigger: 'blur' }
        ],
        psw: [
          { required: true, message: '密码不能为空', tigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openIndex () {
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          sessionStorage.setItem('user', JSON.stringify(this.loginform.username))
          this.$router.push('/managerIndex')
        } else {
          console.log('error')
          this.$message.error('数据校验不通过')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./login.scss";
</style>
<style lang="scss">
.login {
  .el-input__inner {
    height: 27px;
    line-height: 27px;
    border-radius: 10px;
  }
  .el-form-item__label {
    font-size: 16px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__error {
    padding-top: 0;
  }
}
</style>
