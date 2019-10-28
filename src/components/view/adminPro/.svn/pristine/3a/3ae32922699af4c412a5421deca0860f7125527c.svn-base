<template>
  <div class="proadd">
      <div class="proadd_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-Proform :formStatus="formStatus"></a-Proform>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          formStatus: 0
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
