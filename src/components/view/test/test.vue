<template>
  <div id="test">
    <el-cascader :change-on-select="true" :props="clsProps" :options="options" ></el-cascader>
   <el-input size="small" v-model="fileJson.val"></el-input> 
   <upLoadFile ref="upObj" :limitNum=4 :multipleB=true :showFileList=true :fileExtensionName="fileExName"  :isFileSize=2  :getFileJson.sync="fileJson" butText="点击选择上传文件" listType="picture-card"></upLoadFile>
 <wangEditor :value="wEditorVal.val" @change="getInfo" :isUpload=true :isFullEditor=true :isViewSource=true></wangEditor>
  </div>
</template>

<script>
import upLoadFile from "@/components/publicComponents/upLoadFile/upLoadFileByOss"
import wangEditor from "@/components/publicComponents/wangEditor/wangEditor"

const fileExName = ['jpg','gif','png']
const fileJson = {val:''}
const wEditorVal = {val:''}

export default {
  name: 'test', 
  data: function(){
    let that = this;
    return {
      fileExName,
      fileJson,
      wEditorVal,
      options:[],
      clsProps:{
         lazy: true,
          lazyLoad(node,resolve){
            
            if(node!=null){
              that.$axios({
              url: '/api/ProductClass/GetByParClsID/' + node.value,
              method: 'GET',
              header: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(function(res){            
                    let arr = new Array();
                    if(res.data.success){   
                      let clsList = res.data.returnData;
                      for(var i in clsList){
                      let o = {
                      value:clsList[i].clsID,
                      label:clsList[i].clsName
                        }
                        arr.push(o);
                      }
                    }                        
                    //console.log(arr)
                    resolve(arr) 
                });
            }
        }
      }
    }
  },
  mounted (){   
    this.gg();   
    this.initCls(); 
  },
  methods: {
      gg(){
        fileJson.val = '["Files/branch/20190917/20190917094302_m58b.jpg","Files/branch/20190917/20190917094307_yzwf.jpg"]';    
        this.$refs.upObj.setFileList();   
        wEditorVal.val = "abc";
        
      },
      getInfo(txt){
        console.log("内容"+txt)
      },
      getClsList(){
        console.log("123")
      },      
      getpreProClassUrl(getParClsID){
      return new Promise((resolve, reject)=>{
        this.$axios({
          url: '/api/ProductClass/GetByParClsID/' + getParClsID,
          method: 'GET',
          header: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
         }).then((res)=>{
            resolve(res)
         }).catch((err)=>{
            reject(err)
        })
       })
    },
    async initCls(){
        let res = await this.getpreProClassUrl(100)
        if(res.data.success){
            let clsList = res.data.returnData
            //console.log(res.data)
            for(var i in clsList)
            {
              //console.log(clsList[i].clsID)
              this.options.push({
                value:clsList[i].clsID,
                label:clsList[i].clsName,                
                children: []
             });
            }
        }
       
    },
   
  },
   components: {
　　    upLoadFile,wangEditor
　　},
}
</script>

<style lang="scss">
body{
  margin:0;
}
</style>
