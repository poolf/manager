<template>
  <div class="brachForm">
    <div class="form_wrapper">
        <h2>{{titleName}}</h2>
        <el-form ref="braform" :model="braform" :rules="rules" label-width="120px" :label-position="labelPosition">
          <el-form-item label="区域信息" prop="areaInfo">
            <el-input v-model="braform.areaInfo" placeholder="请输入区域信息; 例如：广东省汕头市金平区"></el-input>
          </el-form-item>
          <el-form-item label="系统分店编号" prop="erpBraid">
            <el-input v-model.number="braform.erpBraid" placeholder="请输入系统分店编号"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="branchname">
            <el-input v-model="braform.branchname" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address">
            <el-input v-model="braform.address" placeholder="请输入门店地址"></el-input>
          </el-form-item>
          <el-form-item label="门店经纬度" prop="branchLngLatObejct.val">
            <el-input class="lnginput" v-model="braform.branchLngLatObejct.val" placeholder="请输入门店经纬度"></el-input>
            <MapGetLngLat class="lngbutton" :bingObject.sync="braform.branchLngLatObejct"></MapGetLngLat>
          </el-form-item>
          <el-form-item label="门店电话" prop="tel">
            <el-input v-model="braform.tel" placeholder="请输入门店电话"></el-input>
          </el-form-item>
          <el-form-item v-show="formStatus === 1" label="集群编号" prop="bcID">
            <el-input v-model.number="braform.bcID" placeholder="请输入集群编号"></el-input>
          </el-form-item>
          <el-form-item label="已开通医保卡" prop="medicareflag">
            <el-radio-group v-model="braform.medicareflag">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="formStatus === 1" label="门店状态" prop="typeFlag">
            <el-radio-group v-model="braform.typeFlag">
                <!-- <el-radio label="0">删除</el-radio> -->
                <el-radio label="1">正常</el-radio>
                <el-radio label="2">冻结</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="形象图" prop="gallezyImgObejct.val">
            <el-input size="small" v-model="braform.gallezyImgObejct.val" v-show="false"></el-input> 
            <upLoadFile 
              :limitNum=4 
              :multipleB=true 
              :showFileList=true 
              :fileExtensionName="fileExName"  
              :isFileSize=2  
              :getFileJson.sync="braform.gallezyImgObejct" 
              ref="setload"
              butText="点击选择上传文件" 
              listType="picture-card">
            </upLoadFile>
          </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="SubmitFrom('braform')">{{buttonStatus}}</el-button>
           <el-button @click="resetForm('braform')">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { getItemBra, putBra, addBra } from '@/api/api'
import MapGetLngLat from "@/components/publicComponents/mapComponents/mapGetLngLat"
import upLoadFile from "@/components/publicComponents/upLoadFile/upLoadFileByOss"

const branchLngLatObejct ={val:""}

const fileExName = ['jpg','gif','png']
//const gallezyImgObejct = {val:''}


const brachModel = {
    areaInfo:"",
    erpBraid:1,
    branchname:"",
    address:"",
    branchLngLat:"",
    tel:"",
    medicareflag:1,
    TypeFlag:1,
    gallezyImg:"",
    bcID:1,
    expressPoint:0,
    servicePoint:0,
    netSalesTime:"1"
}
const brachUpdateModel = {
    braID: "",
    areaInfo:"",
    erpBraid:0,
    branchname:"",
    address:"",
    branchLngLat:"",
    tel:"",
    medicareflag:1,
    TypeFlag:1,
    gallezyImg:"",
    bcID:1,
    expressPoint:0,
    servicePoint:0,
    netSalesTime:"1"
}

const formStatus = "";
const braID = "";
export default {
  components: {
　　 MapGetLngLat,upLoadFile
　　},
  data () {
    var checkImg = (rule, value, callback) => {
       if(value === '' || value === null || value === undefined || value === '[]'){
         callback(new Error('形象图不能为空'));
       } else {
         callback();
       }
     }
    return {
      fileExName,
      //gallezyImgObejct,
      dataList: [],
      fileList:[],
      labelPosition: 'left',
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      limitCount: 1,
      buttonStatus: '', //表单按钮名称
      titleName: '', //表单标题
      braform: {
        areaInfo: '',
        erpBraid: '',
        branchname: '',
        address: '',
        branchLngLatObejct:{
          val:''
        },
        tel: '',
        bcID: 1,
        medicareflag: '',
        typeFlag: 1,
        gallezyImgObejct:{
          val:''
        }
      },
      rules: {
        areaInfo: [
          {required:true, message:'区域信息不能为空', trigger: 'blur'}
        ],
        erpBraid: [
          {required:true, message:'系统门店编号不能为空', trigger: 'blur'},
          {type: 'number',message: '请输入正确的系统门店编号'}
        ],
        branchname: [
          {required:true, message:'门店名称不能为空', trigger: 'blur'}
        ],
        "branchLngLatObejct.val": [
          {required:true, message:'门店经纬度不能为空', trigger: 'blur'}
        ],
        "gallezyImgObejct.val": [
          {required:true, validator:checkImg, trigger: 'blur'}
        ],
        address: [
          {required:true, message:'门店地址不能为空', trigger: 'blur'}
        ],
        tel: [
          {required:true, message:'门店电话不能为空', trigger: 'blur'}
        ],
        medicareflag: [
          {required:true, message:'请选择是否开通医保卡', trigger: 'blur'}
        ],
        typeFlag: [
          {required:true, message:'请选择是否门店状态', trigger: 'blur'}
        ],
        bcID:[
          {required:true, message:'集群编号不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
      this.showContent()
  },
  methods: {
    //显示表单内容（0: 添加 1：修改）
    showContent(){
        var formStatus = this.formStatus
        var braID = this.braID
        if(formStatus === 0){
           this.titleName="门店信息添加"
           this.buttonStatus="立即创建"
        }
        if(formStatus === 1){
           this.titleName="门店信息修改"
           this.buttonStatus="提交修改"
           //await _that.getpreParclassList(braID)
           getItemBra(braID).then((res)=>{
              res = res.data
              console.log(res)
              const SUCCESS_OK = true
              const SUCCESS_NO = false
              if(res.success === SUCCESS_OK){
                this.braform.areaInfo = res.returnData.areaInfo
                this.braform.erpBraid = res.returnData.erpBraid
                this.braform.branchname = res.returnData.branchname
                this.braform.address = res.returnData.address
                this.braform.branchLngLatObejct.val = res.returnData.branchLngLat
                this.braform.gallezyImgObejct.val = res.returnData.gallezyImg
                this.$refs.setload.setFileList()
                this.braform.tel = res.returnData.tel
                this.braform.bcID = res.returnData.bcID
                this.braform.medicareflag = JSON.stringify(res.returnData.medicareflag)
                this.braform.typeFlag = JSON.stringify(res.returnData.typeFlag)

              } else if (res.success === SUCCESS_NO){
                  var msg = res.data.msgStr
                  console.log(msg)
                  this.$message.warning(msg)
              }
          })
        }
    },
    //提交按钮
    SubmitFrom(formname) {
      this.$refs[formname].validate((valid) => {
         //console.log(brachModel);
         var formStatus = this.formStatus
         var braID = this.braID
         if(valid){
             if(formStatus === 0){
                brachModel.areaInfo = this.braform.areaInfo;
                brachModel.erpBraid = this.braform.erpBraid;
                brachModel.branchname = this.braform.branchname;
                brachModel.address = this.braform.address;
                brachModel.branchLngLat = this.braform.branchLngLatObejct.val;
                brachModel.tel = this.braform.tel;
                brachModel.medicareflag = this.braform.medicareflag;
                brachModel.gallezyImg = this.braform.gallezyImgObejct.val;    
                brachModel.netSalesTime = 12;
                brachModel.TypeFlag = 1;
                brachModel.bcID = 1;
                console.log(brachModel)
                // addBra(brachModel).then((res)=>{
                //    const ADD_SUCCESS = true
                //    const ADD_FALSE = false
                //    if(res.data.success === ADD_SUCCESS){
                //       var msg = res.data.msgStr
                //       console.log(res.data)
                //       this.$message.success(msg)
                //     }
                //    if(res.data.success === ADD_FALSE){
                //       var msg = res.data.msgStr
                //       console.log(msg)
                //       this.$message.warning(msg)
                //     }
                // })
             }
             if(formStatus === 1){
                var braID = this.braID
                brachUpdateModel.areaInfo = this.braform.areaInfo;
                brachUpdateModel.erpBraid = this.braform.erpBraid;
                brachUpdateModel.branchname = this.braform.branchname;
                brachUpdateModel.address = this.braform.address;
                brachUpdateModel.branchLngLat = this.braform.branchLngLatObejct.val;
                brachUpdateModel.tel = this.braform.tel;
                brachUpdateModel.bcID = this.braform.bcID;
                brachUpdateModel.medicareflag = this.braform.medicareflag;
                brachUpdateModel.gallezyImg = this.braform.gallezyImgObejct.val;        
                brachUpdateModel.netSalesTime = 12;
                brachUpdateModel.TypeFlag = this.braform.typeFlag;
                brachUpdateModel.braID = braID
                //console.log(brachUpdateModel)
                putBra(brachUpdateModel).then((res)=>{
                   console.log(res)
                   const ADD_SUCCESS = true
                   const ADD_FALSE = false
                   if(res.data.success === ADD_SUCCESS){
                      var msg = res.data.msgStr
                      console.log(res.data)
                      this.$message.success(msg)
                    }
                   if(res.data.success === ADD_FALSE){
                      var msg = res.data.msgStr
                      console.log(msg)
                      this.$message.warning(msg)
                    }
                })
             }
            }else{
           console.log('error')
           this.$message.error('数据校验不通过')
           return false
         }
      })
    },
    //重置表单
    resetForm(formName) {
        this.$nextTick(()=>{
            this.$refs[formName].resetFields();
            //this.$refs.upload.clearFiles()
        })
    }
  },
  props: ['formStatus','braID']
}
</script>
<style lang="scss">
@import './branchForm.scss';
.hide .el-upload--picture-card {
	display: none;
}
</style>
