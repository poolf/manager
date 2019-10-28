<template>
  <div class="admindra">
    <div class="admindra_wrapper">
      <a-branchform :formStatus="formStatus"></a-branchform>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formStatus: 0
    }
  }
}
</script>
<style lang="scss">
</style>
