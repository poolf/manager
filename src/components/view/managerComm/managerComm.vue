<template>
  <div class="managerComm">
    <el-input size="small" v-model="mapNum.val"></el-input> 
    <MapGetLngLat :bingObject.sync="mapNum"></MapGetLngLat>

    <el-upload action=""
                     :http-request="fnUploadRequest"
                     :show-file-list="true"
                     :limit=2
                     :on-remove="handleRemove"
                     :on-exceed="beyondFile"
                     :on-success="handleFilesSuccess"
                     :before-upload="beforeUploadFile"
                     list-type="picture"
                     :multiple = true      
                     :file-list = "flist"      
                     >
                <el-button size="small" type="primary">点击上传</el-button>
              
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import MapGetLngLat from "@/components/publicComponents/mapComponents/mapGetLngLat"
import oss from "@/components/publicComponents/aliOss/aliOss"
import Global from "@/baseconfig/global_variable"
var mapNum ={val:""}
const aa = ""
var fileListJson=""
var flist=[
  {url:'https://kzllhtest.oss-cn-shenzhen.aliyuncs.com/Files/branch/20190911/20190911142852_86ep.jpg'},
  {url:'https://kzllhtest.oss-cn-shenzhen.aliyuncs.com/Files/branch/20190911/20190911143757_n3tu.jpg'}
]
export default {
  name: 'mapGetLngLatapp',
  components: {
　　　MapGetLngLat,oss
　　},
  data(){
    return {
      mapNum,aa,fileListJson,flist
    }
  },
  methods:{
     submitUpload() {
        this.fnUploadRequest
      },
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
         
         //let result = oss.delFile(filename);
         this.bingFileListJson(fileList);
      },
      // 文件上传前做校验
      beforeUploadFile (file) {
        let extensionName = file.name.substr(file.name.indexOf('.'));
        const extension1 = extensionName ===".jpg";
        const extension2 = extensionName ===".png";
        const extension3 = extensionName ===".gif";
        const isLt2M = file.size / 1024 / 1024 < 2
      

        if(!extension1 && !extension2 && !extension3) {
                  this.$message({
                    message: '上传文件只能是jpg、png、gif格式!',
                    type: 'warning'
                  });                 
                
                }
        if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 2MB!',
						type: 'warning'
					});
				}
        return extension1 || extension2 || extension3 && isLt2M
      },
      // 文件上传成功后
      handleFilesSuccess (response, file, fileList) {       
        this.bingFileListJson(fileList);   
      },
      // 文件数量超出时
      beyondFile (files, fileList) {
         this.$message("只允许提交2个文件");
        
      },
      bingFileListJson(fileList){    
        let arr = new Array();
        if(fileList.length>0)
        {
          for(var i=0;i<fileList.length;i++)
          {
            if(fileList[i].url!=null)
            {
               if(fileList[i].response!=null)
                   arr.push(fileList[i].response.name);
               else             
                   arr.push(fileList[i].url.replace(Global.aliOssAdd,''))
            }           
          }
        }
        fileListJson=JSON.stringify(arr);
        console.log(fileListJson);      
        console.log(fileList); 
        //console.log(Global.aliOssAdd);
      }
  }
}
</script>
<style lang="scss" scoped>
</style>
