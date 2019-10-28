<template>
  <div class="proupdate">
      <div class="proupdate_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-Proform :formStatus="formStatus"></a-Proform>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          formStatus: 1
        }
   },
  methods: {
    goBack(){
      this.$router.push('/adminProList')
      //this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
