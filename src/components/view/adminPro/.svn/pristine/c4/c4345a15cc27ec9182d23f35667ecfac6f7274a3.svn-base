<template>
  <div class="proclassupdate">
      <div class="proclassupdate_wrapper">
          <el-page-header @back="goBack"></el-page-header>
          <a-ProClassform :formStatus="formStatus" :getId="getId"></a-ProClassform>
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
