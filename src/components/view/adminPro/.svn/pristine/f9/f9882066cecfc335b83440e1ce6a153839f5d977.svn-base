<template>
  <div class="proCascader">
    <div class="value_wrapper">
      <el-input class="value_input"
                v-model="showclsString"
                placeholder="请点击'选择类别'按钮选择类别"
                disabled></el-input>
      <el-button class="value_button"
                 type="primary"
                 plain
                 v-show="divStatus"
                 @click="openCascader">选择类别</el-button>
    </div>
    <div class="select_wrapper"
         v-show="!divStatus">
      <el-cascader :props="clsProps"
                   :options="options"
                   ref="cascaderAdd"
                   placeholder="请选择所属类别"
                   @change="selectValue"
                   class="select_casc">
      </el-cascader>
      <el-button class="select_button"
                 type="primary"
                 plain
                 @click="submitValue">确认</el-button>
    </div>
  </div>
</template>
<script>
const clsnode = ''
import { getItemParClassList, getAllParClsID } from '@/api/api'
export default {
  //props: ["clsnode_temp"],//接收父组件传递过来的参数
  data () {
    var that = this
    return {
      clsnode1: '', //input绑定选择的值
      //clsnode: '',
      showclsArray: [],
      showclsString: '',
      divStatus: true,
      options: [{
        value: 100,
        label: "100"
      }], //下拉菜单的数据
      clsProps: {
        checkStrictly: true,//单选选择任意一级选项
        lazy: true,
        lazyLoad (node, resolve) {
          if (node != null) {
            getItemParClassList(node.value).then((res) => {
              let arr = new Array();
              if (res.data.success) {
                let clsList = res.data.returnData;
                for (var i in clsList) {
                  let o = {
                    value: clsList[i].clsID,
                    label: clsList[i].clsName
                  }
                  arr.push(o);
                }
              }
              //console.log(arr)
              resolve(arr)
            })
          }
        }
      }
    }
  },
  mounted () {
    //this.initCls()
    //this.showInput()
  },
  methods: {
    //根据父id请求获取当前所有子类
    getProClassUrl (id) {
      getItemParClassList(id).then((res) => {
        res = res.data
        const SUCCESS_OK = true
        const SUCCESS_NO = false
        if (res.success === SUCCESS_OK) {
          var datalist = res.returnData
          for (var i in datalist) {
            this.options.push({
              value: datalist[i].clsID,
              label: datalist[i].clsName,
              children: []
            })
          }
        } else if (res.success === SUCCESS_NO) {
          console.log(res.msgStr)
        }
      })
    },
    //数据加载
    initCls () {
      this.getProClassUrl(100)
    },
    //选择类别按钮
    openCascader () {
      this.divStatus = false
    },
    //级联选择器的选中的值
    selectValue (node) {
      //console.log(node)
      var data = node
      this.clsnode1 = data[data.length - 1]
      var labels = this.$refs['cascaderAdd'].getCheckedNodes()[0].pathLabels
      this.showclsArray = labels
    },
    //确认获取选择的值
    submitValue () {
      this.divStatus = true
      // this.clsnode = this.clsnode1
      var changeString = this.showclsArray.toString().replace(/,/g, "/")
      this.showclsString = changeString
      this.$emit("clsparidChange", this.clsnode1)
    },
    //父组件通过调用该方法（根据父组件input的值获取当前的所有父编号返回label）
    showInput (clsID) {
      if(clsID === 100){
        this.showclsString = "100"
      } else {
        getAllParClsID(clsID).then((res) => {
          res = res.data
          if (res.success === true) {
            var nodelist = []
            var newlsit = res.returnData
            for (var i in newlsit) {
              nodelist.push(newlsit[i].key)
            }
            nodelist.push("100")
            //console.log(nodelist)
            var newNodeList = nodelist.reverse()
            var nodeString = newNodeList.toString().replace(/,/g, "/")
            //var nodeString = nodelist.toString().replace(/,/g, "/")/
            this.showclsString = nodeString
          }
        })
      }
      // this.showclsString = this.clsnode_temp
      // console.log(this.clsnode_temp)
    }
  }
}
</script>
<style lang="scss">
@import "./proCascader.scss";
</style>
