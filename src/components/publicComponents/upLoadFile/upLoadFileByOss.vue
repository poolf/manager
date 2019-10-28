<template>
  <div>
        <el-upload action=""
                     :http-request="fnUploadRequest"
                     :show-file-list="showFileList"
                     :limit="limitNum"
                     :on-remove="handleRemove"
                     :on-exceed="beyondFile"
                     :on-success="handleFilesSuccess"
                     :before-upload="beforeUploadFile"
                     :list-type="listType"
                     :multiple = "multipleB"      
                     :file-list = "fileListInit"      
                     >
                <el-button size="small" type="primary">{{butText}}</el-button>              
                <div slot="tip" class="el-upload__tip">只能上传{{fileExStr}}类型文件，且不超过{{fileSizeStr}}MB</div>
    </el-upload>
  </div>
</template>

<script>
import oss from "@/components/publicComponents/aliOss/aliOss"
import Global from "@/baseconfig/global_variable"

var fileListInit = []
const fileExStr = ""
const fileSizeStr = ""
export default {
  name: 'upLoadFileByOss',
  props:{
      /**
       * @description [最大允许上传个数]       
       */
      limitNum:{
            type: Number,
            required: true
      },
        /**
       * @description [是否支持多选文件]
       */
      multipleB:{
            type:Boolean
      },
       /**
       * @description [是否显示已上传文件列表]
       */
      showFileList:{	
            type:Boolean
      },
      /**
       * @description [允许上传的文件类型，Array类型，例如：['jpg','gif','png']]
       */
      fileExtensionName:{
          type:Array,
          required: true
      },
      /**
       * @description [允许单文件多大容量，单位：M]
       */
      isFileSize:{
           type: Number,
           required: true
      },  
       /**
       * @description [获取文件列表对象Json,当不为空则显示文件，添加或删除后也会将该属性重新赋值，父类可获取更新或的属性值，
       *                例如var fileJson={val:"[图片地址],[图片地址]"},:getFileJson.sync="fileJson"]
       */   
      getFileJson:{
          type:Object
      },
      /**
       * @description [设置上传按钮文字]
       */
      butText:{
          type:String,
          required: true
      },
       /**
       * @description [文件列表的类型,text/picture/picture-card]
       */
      listType:{
          type:String,
          required: true
      }
  },
  data: function(){
    return {
     fileListInit,fileExStr,fileSizeStr
    }
  },  
  methods: {
     
      /**
       * @description [fnUploadRequest 覆盖默认的上传行为，实现自定义上传]
       * @param    {object}   option [上传选项]
       * @return   {null}   [没有返回]
       */
      async fnUploadRequest (option) {
        oss.ossUploadFile(option)
      },
      /**
       * @description[delFile 删除阿里Oss文件]
       * @param    {object}   file [文件对象] 
       * @return   {string}   [错误信息]
       */
      handleRemove(file,fileList){        
         let filename = ""         
         if(file.url!=null){
           filename = file.url;
           filename = filename.replace(Global.aliOssAdd,'');
           }
         if(file.response!=null)         
           filename = file.response.name;
           //删除
           oss.delFile(filename);
           //异步
        //  let result = oss.delFile(filename).then((resolve)=>{                            
        //                         this.$message({
        //                         message: '文件删除成功',
        //                         type: 'success'
        //                     }),
        //                     (reject)=>{
        //                         this.$message({
        //                         message: reject,
        //                         type: 'warning'
        //                     })
        //                     }
        //                 })
         
         this.bingFileListJson(fileList);
      },
      // 文件上传前做校验
      beforeUploadFile (file) {
        let extensionName = file.name.substr(file.name.indexOf('.'));
        let b = false;
        for(var i in this.fileExtensionName)
        {
            if("."+this.fileExtensionName[i]==extensionName)
            {
                b = true;
                break;
            }
        }
        if (!b)
        {            
            this.$message({
                    message: '上传文件只能是'+ this.fileExtensionName.toString() +'格式!',
                    type: 'warning'
                  });    
            return false;
        }
        const isSize = file.size / 1024 / 1024 < this.isFileSize      
       
        if(!isSize) {
					this.$message({
						message: '上传文件大小不能超过'+  this.isFileSize +'MB!',
						type: 'warning'
                    });
                    return false;
				}      
      },
      // 文件上传成功后
      handleFilesSuccess (response, file, fileList) {       
        this.bingFileListJson(fileList);   
      },
      // 文件数量超出时
      beyondFile (files, fileList) {
         this.$message('只允许提交'+ this.limitNum +'个文件');
         type: 'warning'
      },
      //文件数据Json，用于返回
      bingFileListJson(fileList){  
          //console.log(fileList)  
        let arr = new Array();
        if(fileList.length>0)
        {      
            for(var i in fileList)
            {
                //console.log()               
                if(fileList[i].url != null && fileList[i].response==null)
                    arr.push(fileList[i].url.replace(Global.aliOssAdd,''))
                if(fileList[i].response != null)
                    arr.push(fileList[i].response.name);    
            }  
        }
        this.getFileJson.val = JSON.stringify(arr);  
      },
      //绑定文件列表
      setFileList(){     
        
          if(this.getFileJson.val!='')      
          {
            let arr = JSON.parse(this.getFileJson.val);    
            if(arr.length > 0)
            {
                var reg = /([^\\/]+)\.([^\\/]+)/i;
                for(var i in arr)
                    {
                        let o = new Object();         
                        o.url =  Global.aliOssAdd +arr[i];   
                        if(reg.test(arr[i]))
                            o.name = RegExp.$1 + '.' + RegExp.$2;       
                        fileListInit.push(o);
                    }
            }    
          } 
         this.fileExStr = this.fileExtensionName.toString();
         this.fileSizeStr =   this.isFileSize;
           
      }
  }
}
</script>

<style lang="scss">
body{
  margin:0;
}
</style>
