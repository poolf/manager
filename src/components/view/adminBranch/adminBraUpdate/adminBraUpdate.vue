<template>
  <div class="braupdate">
      <div class="braupdate_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-branchform :formStatus="formStatus" :braID="braID"></a-branchform>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          formStatus: 1,
          braID: ''
        }
   },
  created () {
    var dataItem = JSON.parse(this.$route.query.id)
    this.braID = dataItem
  },
  methods: {
    goBack(){
      //this.$router.push('/adminBraSearch')
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
