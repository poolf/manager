<template>
  <div class="echartsdemo">
      <div id="echarts_1" style="height:350px;"></div>
  </div>
</template>
<script>
var echarts = require('echarts')
var mychart
export default {
  mounted () {
      this.initChart()
  },
  methods: {
      initChart(){
      mychart = echarts.init(document.getElementById('echarts_1'))
      mychart.setOption({
          title: {text: '123'},
          tooltip: {},
          xAxis:{
              data: ["龙湖区","金平区","朝阳区","潮南区","澄海区"]
          },
          yAxis:{},
          series:[{
              name: '销量',
              type: 'bar',
              data: [1000,3500,100,0,100]
          }]
      })
      window.onresize = function(ev){
          mychart.resize()
      }
    }
  }
}
</script>
<style>
</style>
