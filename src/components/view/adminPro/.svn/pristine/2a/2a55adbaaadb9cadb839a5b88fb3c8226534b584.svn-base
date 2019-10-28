<template>
  <div class="proclassadd">
      <div class="proclassadd_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-ProClassform :formStatus="formStatus"></a-ProClassform>
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
      //this.$router.push('/adminBraSearch')
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
