<template>
  <div class="managerOrder">
    <div class="select">
      <span>模板选择：</span>
      <ul>
        <li v-for="item in temList"
            :key="item.index"
            @click="getItem(item)">
          <div class="templet_select">
            <span>{{item.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="content"
         id="getData"></div>
    <div class="right_tem">
      <el-button type="primary"
                 @click="Apply_tem">应用此样式</el-button>
      <div class="tem_content_wrapper">
        <component :is="currentView"
                   ref="tempSend"
                   id="divModel"></component>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      temList: [
        { id: 1, name: "模板选择1", params: "divmodel" },
        { id: 2, name: "模板选择2", params: "divmode2" },
        { id: 3, name: "模板选择3", params: "divmode4" },
        { id: 4, name: "模板选择4", params: "divmodel2" },
        { id: 5, name: "模板选择5", params: "divmode5" }
      ],
      currentView: ""
    }
  },
  methods: {
    getItem (item) {
      console.log(item.params)
      import(`./${item.params}.vue`).then(divItem => {
        //   Vue.component(item.params, divItem.default)
        //   this.currentView = item.params
        //   //new Profile().$mount(".tem_content_wrapper")
      })
    },
    Apply_tem () {
      var test = this.$refs.tempSend.$el
      var newTest = test.cloneNode(true)
      var dom = document.querySelector('#getData')
      var child = dom.childNodes
      if (child.length === 0) {
        dom.appendChild(newTest)
      } else {
        for (var i = 0; i < child.length; i++) {
          dom.removeChild(child[i])
        }
        dom.appendChild(newTest)
      }
    }
  }
}
</script>
<style lang="scss">
.managerOrder {
  position: relative;
  .select {
    padding: 10px;
    width: 300px;
    height: 200px;
    background: #fff;
    border-radius: 15px;
    ul {
      margin: 0;
      padding: 5;
      li {
        float: left;
        display: block;
        list-style: none;
        cursor: pointer;
        .templet_select {
          background: #f2f2f2;
          padding: 10px;
          margin: 10px;
        }
      }
    }
  }
  .content {
    padding: 10px;
    margin-top: 10px;
    width: 300px;
    height: 300px;
    background: #fff;
    border-radius: 15px;
  }
  .right_tem {
    position: absolute;
    right: 10px;
    top: 0;
    width: 500px;
    height: 600px;
    background: rgb(161, 170, 190);
    border-radius: 15px;
    padding: 10px;
  }
}
</style>
