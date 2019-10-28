<template>
  <div class="BrandDisConForm">
      <div class="BrandDisConForm_wrapper">
          <h2>{{titleName}}</h2>
          <el-form ref="bradisconform" :model="bradisconform" :rules="rules" label-width="120px" :label-position="labelPosition">
            <el-form-item v-show="formStatus === 1" label="自编号：">
              <el-input v-model="bradisconform.ID" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="门店编号：" prop="braid">
              <el-input v-model="bradisconform.braid" placeholder="请输入门店编号"></el-input>
            </el-form-item>
            <el-form-item v-show="formStatus === 1" label="门店名称：">
              <el-input v-model="bradisconform.branchname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="起送费用：" prop="salesDisCount">
              <el-input v-model="bradisconform.salesDisCount" placeholder="请输入起送费用"></el-input>
            </el-form-item>
            <el-form-item label="配送费" prop="deliveryFees">
              <el-input v-model="bradisconform.deliveryFees" placeholder="请输入配送费"></el-input>
            </el-form-item>
            <el-form-item label="包邮价" prop="freeDelivery">
              <el-input v-model="bradisconform.freeDelivery" placeholder="请输入包邮价"></el-input>
            </el-form-item>
            <el-form-item>
             <el-button type="primary" @click="SubmitFrom('bradisconform')">{{buttonStatus}}</el-button>
             <el-button @click="resetForm('bradisconform')">取消</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script>
import { getBrandDCPage, addBrandDC , updateBrandDC } from '@/api/api'
const getMsgModel = {
    pageIndex:'',
    pageSize:'',
    orderby:'',
    whereStr:[]
}
const addbisModel = {
    braid:'',
    salesDisCount:'',
    deliveryFees:'',
    freeDelivery:''
}
const updatebisModel = {
    ID:'',
    braid:'',
    salesDisCount:'',
    deliveryFees:'',
    freeDelivery:''
}
export default {
  data () {
    return {
      labelPosition:"right",
      bradisconform:{
        ID:'',
        branchname:'',
        braid:'',
        salesDisCount:'',
        deliveryFees:'',
        freeDelivery:''
      },
      rules: {
        braid:[
          {required:true, message:'门店编号不能为空', trigger: 'blur'}
        ],
        salesDisCount: [
          {required:true, message:'起送费用不能为空', trigger: 'blur'}
        ],
        deliveryFees: [
          {required:true, message:'配送费不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.showContent()
  },
  methods: {
    getItemMsgModel(getwhereStr){
      getMsgModel.pageIndex = 1
      getMsgModel.pageSize = 10
      getMsgModel.orderby = "braid desc"
      getMsgModel.whereStr = getwhereStr
    },
    getItemMsgUrl(dataModel){
       getBrandDCPage(dataModel).then((res)=>{
        res = res.data
        if(res.success === true){
          var getList = res.returnData
          this.bradisconform.braid = getList[0].braid
          this.bradisconform.branchname = getList[0].branchname
          this.bradisconform.salesDisCount = getList[0].salesDisCount
          this.bradisconform.deliveryFees = getList[0].deliveryFees
          this.bradisconform.freeDelivery = getList[0].freeDelivery
        }
        if(res.success === false){
            this.$message.error(res.msgStr)
          }
       })
    },
    showContent(){
      var formStatus = this.formStatus
      var getId = this.getId
      if(formStatus === 0){
        this.titleName="门店配送规则添加"
        this.buttonStatus="立即创建"
      }
      if(formStatus === 1){
        this.titleName="门店配送规则修改"
        this.buttonStatus="提交修改"
        this.bradisconform.ID = this.getId
        var newlist = [];
        newlist.push({
          Field:"id",
          SKey:this.getId,
          SType:"="
        })
        this.getItemMsgModel(newlist)
        this.getItemMsgUrl(getMsgModel)
      }
    },
    SubmitFrom(formname){
        this.$refs[formname].validate((valid) => {
         //console.log(brachModel);
         var formStatus = this.formStatus
         var getId = this.getId
         if(valid){
            if(formStatus === 0){
                addbisModel.braid = this.bradisconform.braid
                addbisModel.salesDisCount = this.bradisconform.salesDisCount
                addbisModel.deliveryFees = this.bradisconform.deliveryFees
                addbisModel.freeDelivery = this.bradisconform.freeDelivery
                addBrandDC(addbisModel).then((res)=>{
                  res = res.data
                  const SUCCESS_OK = true
                  const SUCCESS_NO = false
                  if(res.success === SUCCESS_OK){
                    this.$message.success(res.msgStr)
                  }
                  if(res.success === SUCCESS_NO){
                     this.$message.error(res.msgStr)
                  }
              })
            }
            if(formStatus === 1){
                updatebisModel.ID = this.bradisconform.ID
                updatebisModel.braid = this.bradisconform.braid
                updatebisModel.salesDisCount = this.bradisconform.salesDisCount
                updatebisModel.deliveryFees = this.bradisconform.deliveryFees
                updatebisModel.freeDelivery = this.bradisconform.freeDelivery
                updateBrandDC(updatebisModel).then((res)=>{
                  res = res.data
                  console.log(res)
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
    resetForm(formName){
       var formStatus = this.formStatus
      if(formStatus === 0){
        this.$refs[formName].resetFields();
      }
      if(formStatus === 1){
        this.showContent()
      }
    }
  },
  props: ['formStatus','getId']
}
</script>
<style lang="scss">
@import './BrandDisConForm.scss';
</style>
