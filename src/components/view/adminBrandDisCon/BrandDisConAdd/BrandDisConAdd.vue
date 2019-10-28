<template>
  <div class="BrandDisConAdd">
      <div class="BrandDisConAdd_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-BrandDisConform :formStatus="formStatus"></a-BrandDisConform>
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
