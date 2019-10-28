<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide: function(){
    return {
      reload: this.reload
    }
  },
  data: function(){
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload: function(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss">
body{
  margin:0;
}
</style>
