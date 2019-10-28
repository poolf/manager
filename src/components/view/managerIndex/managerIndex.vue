<template>
  <div class="manager_index">
    <div class="manager_user_fast">
      <div class="left">
        <div class="left_top">
            <div class="logo_wrapper">
              <img src="./logo.png" alt="">
              <div class="username_wrapper">
                <span style="font-size:22px;color:#324157"><strong>{{Manager_name}}</strong></span><br>
              <span>超级管理员</span>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="login_histroy_wrapper">
              <span>上次登陆时间：{{login_oldTime}}</span><br>
              <span>上次登陆地点：{{login_oldPlace}}</span>
            </div>
        </div>
        <div class="left_bottom"></div>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="user_sum_wrapper">
            <div class="sum_icon sum_icon1"><i class="el-icon-user"></i></div>
            <div class="sum_content">
              <span class="content f1">1234</span><br>
              <span>用户数量</span>
            </div>
          </div>
          <div class="comm_sum_wrapper">
            <div class="sum_icon sum_icon2"><i class="el-icon-goods"></i></div>
            <div class="sum_content">
              <span class="content f2">3210</span><br>
              <span>商品数量</span>
            </div>
          </div>
          <div class="order_sum_wrapper">
            <div class="sum_icon sum_icon3"><i class="el-icon-tickets"></i></div>
            <div class="sum_content">
              <span class="content f3">5000</span><br>
              <span>订单数量</span>
            </div>
          </div>
        </div>
        <div class="right_bottom">
        </div>
      </div>
    </div>
    <div class="manger_data_fast">
      <div class="manager_user_data">
        <a-echarst class="echart_demo"></a-echarst>
      </div>
      <div class="manager_order_data"></div>
    </div>
  </div>
</template>
<script>
import echartsDemo from '../managerIndex/ehcarts/echartsDemo'
export default {
  components: {
    'a-echarst': echartsDemo
  },
  data () {
    return {
      Manager_name: 'zoraka',
      login_oldTime: '2018-08-07',
      login_oldPlace: '深圳'
    }
  }
}
</script>
<style lang="scss" scoped>
@import './managerIndex.scss';
.manager_index{
  .el-divider--horizontal{
    margin-top: 2px;
  }
}
</style>
