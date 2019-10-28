<template>
  <div class="userupdate">
      <div class="userupdate_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-userform :formStatus="formStatus" :userID="userID"></a-userform>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          formStatus: 1, //表单为修改状态
          userID: ''
        }
   },
  created () {
    var dataItem = JSON.parse(this.$route.query.id)
    this.userID = dataItem
  },
  methods: {
    goBack(){
      this.$router.push('/adminUserSearch')
    }
  }
}
</script>
<style>
</style>
