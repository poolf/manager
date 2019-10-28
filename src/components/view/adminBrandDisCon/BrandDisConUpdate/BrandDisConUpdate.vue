<template>
  <div class="BrandDisConUpdate">
      <div class="BrandDisConUpdate_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-BrandDisConform :formStatus="formStatus" :getId="getId"></a-BrandDisConform>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          formStatus: 1,
          getId: ''
        }
   },
  created () {
    var dataItem = JSON.parse(this.$route.query.id)
    this.getId = dataItem
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
