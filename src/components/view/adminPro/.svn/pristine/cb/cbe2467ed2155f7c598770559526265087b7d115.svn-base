<template>
  <div class="procalssForm">
      <div class="procalssForm_wrapper">
          <h2>{{titleName}}</h2>
          <el-form ref="proclassform" :model="proclassform" :rules="rules" label-width="120px" :label-position="labelPosition">
            <el-form-item v-show="formStatus === 1" label="自编号：" prop="ID">
              <el-input v-model="proclassform.ID" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类别编号：" prop="clsID">
              <el-input v-model="proclassform.clsID" placeholder="请输入类别编号"></el-input>
            </el-form-item>
            <el-form-item label="类别名称：" prop="clsName">
              <el-input v-on:input="getPYcode" v-model="proclassform.clsName" placeholder="请输入类别名称"></el-input>
            </el-form-item>
            <el-form-item label="所属类别：" prop="clsParID">
                <a-proCascader 
                  @clsparidChange="getclsparidChange($event)" 
                  ref="cls">
                </a-proCascader>
                <el-input v-model="proclassform.clsParID" v-show="false"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="clsSort">
              <el-input v-model="proclassform.clsSort" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="助记码：" prop="mnemonic">
              <el-input v-on:input="getPYcode" v-model="proclassform.mnemonic" placeholder="请输入助记码"></el-input>
            </el-form-item>
            <el-form-item v-show="formStatus === 1" label="类别状态：" prop="delFlag">
              <el-radio-group v-model="proclassform.delFlag">
                <!-- <el-radio label="0">删除</el-radio> -->
                <el-radio label="1">正常</el-radio>
                <el-radio label="2">冻结</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
             <el-button type="primary" @click="SubmitFrom('proclassform')">{{buttonStatus}}</el-button>
             <el-button @click="resetForm('proclassform')">取消</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script>
import { getProClassPage, addProClass, putProClass, getAllParClsID } from '@/api/api'
import { makePy } from '../../../../publicComponents/mnemonicCode/initials'
const formStatus = "";
const getId = "";
var itemOptionsModel = [];
var itemOptionsLength = 0;
const ItemProClassModel = {
  pageIndex: 1,
  pageSize: 10,
  whereStr:[]
}
const addProClassModel = {
   clsID:'',
   clsName:'',
   clsParID:'',
   clsSort:'',
   mnemonic:''
}
const updateProClassModel = {
  ID:'',
	clsID:'',
	clsName:'',
	clsParID:'',
	clsSort:'',
  mnemonic: '',
  delFlag:''
}

const getidsModel= {val:''}

export default {
  data () {
    return {
      titleName:'',
      buttonStatus:'',
      titleName:'商品类别修改',
      labelPosition:"right",
      proclassform:{
        ID:'',
	      clsID:'',
	      clsName:'',
	      clsParID:'',
	      clsSort:'',
        mnemonic: '',
        delFlag:1
      },
      rules: {
        clsName:[
          {required:true, message:'类别名称不能为空', trigger: 'blur'}
        ],
        clsID: [
          {required:true, message:'类别编号不能为空', trigger: 'blur'}
        ],
        clsParID: [
          {required:true, message:'所属类别不能为空', trigger: 'blur'}
        ],
        clsSort: [
          {required:true, message:'排序不能为空', trigger: 'blur'}
        ],
        mnemonic: [
          {required:true, message:'助记码不能为空', trigger: 'blur'}
        ],
        delFlag: [
          {required:true, message:'请选择是否类别状态', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.showContent()
  },
  methods: {
    //接收子组件传递过来的id并修改
    getclsparidChange(msg){
      this.proclassform.clsParID = msg
    },
    //获取单个商品类别model
    getItemProClassModel(datalist){
      ItemProClassModel.pageSize = 10;
      ItemProClassModel.pageIndex = 1;
      ItemProClassModel.whereStr = datalist
    },
    //获取单个商品类别信息
    loadItemProClassMessage(dataModel){
      getProClassPage(dataModel).then((res)=>{
        res = res.data
        const SUCCESS_OK = true
        const SUCCESS_NO = false
        if(res.success === SUCCESS_OK){
          var datalist = res.returnData
          for(var i in datalist){
            this.proclassform.clsID = datalist[i].clsID
            this.proclassform.clsName = datalist[i].clsName
            this.proclassform.clsParID = datalist[i].clsParID
            this.proclassform.clsSort = datalist[i].clsSort
            this.proclassform.mnemonic = datalist[i].mnemonic
            this.proclassform.delFlag = JSON.stringify(datalist[i].delFlag)
            this.$refs.cls.showInput(this.proclassform.clsParID)
            //this.proclassform.clsParID = this.changeclsParIDListToForm(paramsid,this.options)
            //console.log(this.proclassform.clsParID)
          }
        }else if(response.success === SUCCESS_NO){
          const msg = res.msgStr
          this.$message.error(msg)
        }
      })
    },
    //通过判断表单状态决定表单显示（0：添加； 1：修改）
    showContent(){
      var formStatus = this.formStatus
      var getId = this.getId
      if(formStatus === 0){
        this.titleName="商品类别信息添加"
        this.buttonStatus="立即创建"
      }
      if(formStatus === 1){
        this.titleName="商品类别修改"
        this.buttonStatus="提交修改"
        this.proclassform.ID = this.getId
        var newlist = [];
        newlist.push({
          Field:"id",
          SKey:this.getId,
          SType:"="
        })
        this.getItemProClassModel(newlist)
        this.loadItemProClassMessage(ItemProClassModel)
      }
    },
    //提交表单数据
    SubmitFrom(formname){
      this.$refs[formname].validate((valid) => {
         //console.log(brachModel);
         var formStatus = this.formStatus
         var getId = this.getId
         if(valid){
            if(formStatus === 0){
              addProClassModel.clsParID = this.proclassform.clsParID
              addProClassModel.clsID = this.proclassform.clsID
              addProClassModel.clsName = this.proclassform.clsName
              addProClassModel.mnemonic = this.proclassform.mnemonic
              addProClassModel.clsSort= this.proclassform.clsSort
              //console.log(addProClassModel)
              addProClass(addProClassModel).then((res)=>{
                  res = res.data
                  const SUCCESS_OK = true
                  const SUCCESS_NO = false
                  if(res.success === SUCCESS_OK){
                    var datalist = res.returnData
                    this.$message.success(res.msgStr)
                  }
                  if(res.success === SUCCESS_NO){
                     this.$message.error(res.msgStr)
                  }
              })
            }
            if(formStatus === 1){
              updateProClassModel.ID = this.proclassform.ID
              updateProClassModel.clsID = this.proclassform.clsID
              updateProClassModel.clsName = this.proclassform.clsName
              updateProClassModel.clsSort = this.proclassform.clsSort
              updateProClassModel.clsParID = this.proclassform.clsParID
              updateProClassModel.mnemonic = this.proclassform.mnemonic
              updateProClassModel.delFlag = this.proclassform.delFlag
              //console.log(updateProClassModel)
              putProClass(updateProClassModel).then((res)=>{
                  res = res.data
                  const SUCCESS_OK = true
                  const SUCCESS_NO = false
                  if(res.success === SUCCESS_OK){
                    this.$message.success(res.msgStr)
                  }else if(res.success === SUCCESS_NO){
                     this.$message.error(res.msgStr)
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
    //取消重置
    resetForm(formName) {
      var formStatus = this.formStatus
      if(formStatus === 0){
        this.$refs[formName].resetFields();
      }
      if(formStatus === 1){
        this.showContent()
      }
    },
    getPYcode(){
      var str = this.proclassform.clsName
      var getStrs = makePy(str)[0]
      this.proclassform.mnemonic = getStrs
    }
  },
  props: ['formStatus','getId']
}
</script>
<style lang="scss">
@import './ProClassForm.scss';
</style>
