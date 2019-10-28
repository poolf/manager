<template>
  <div class="userForm">
    <div class="form_wrapper">
        <h2>{{titleName}}</h2>
        <el-form ref="userform" :model="userform" :rules="rules" label-width="120px">
          <el-form-item label="用户编号" prop="uid">
            <el-input v-model="userform.uid" placeholder="请输入用户编号" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号" prop="userCard">
            <el-input v-model="userform.userCard" placeholder="请输入会员卡号"></el-input>
          </el-form-item>
          <el-form-item label="微信OPID" prop="wxOpid">
            <el-input v-model="userform.wxOpid" placeholder="请输微信OPID"></el-input>
          </el-form-item>
          <el-form-item label="微信UID" prop="wxUid">
            <el-input v-model="userform.wxUid" placeholder="请输入微信OPID"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userrealname">
            <el-input v-model="userform.userrealname" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="userform.phone" placeholder="请输入手机"></el-input>
          </el-form-item>
          <el-form-item label="最后登录时间" prop="latelyTime">
            <el-input v-model="userform.latelyTime" placeholder="请输入最后登录时间" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="会员状态" prop="userflag">
            <el-radio-group v-model="userform.userflag">
                <el-radio v-show="formStatus === 0" label="0">删除</el-radio>
                <el-radio label="1">正常</el-radio>
                <el-radio label="2">冻结</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="版本时间戳" prop="verTimeStamp">
            <el-input v-model="userform.verTimeStamp" placeholder="请输入版本时间戳" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
           <el-button style="background-color:#242f42; color:#fff;" @click="SubmitFrom('userform')">{{buttonStatus}}</el-button>
           <el-button @click="resetForm('userform')">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import { putUser } from '@/api/api'
const userhModel = {
    uid:"",
    userCard:0,
    wxOpid:"",
    wxUid:"",
    userrealname:"",
    phone:"",
    latelyTime:"",
    userflag:"",
    verTimeStamp:""
}
const formStatus = ""; //表单状态
const userID = ""; //用户id
export default {
  data () {
    return {
      buttonStatus: '', //表单按钮名称
      titleName: '', //表单标题
      userform: {
        uid: '',
        userCard: '',
        wxOpid: '',
        wxUid: '',
        userrealname: '',
        phone: '',
        latelyTime: '',
        userflag: 1,
        verTimeStamp:''
      },
      rules: {
        userCard: [
          {required:true, message:'会员卡号不能为空', trigger: 'blur'}
        ],
        wxOpid: [
          {required:true, message:'微信OPID不能为空', trigger: 'blur'}
        ],
        wxUid: [
          {required:true, message:'微信OPID不能为空', trigger: 'blur'}
        ],
        userrealname: [
          {required:true, message:'姓名不能为空', trigger: 'blur'}
        ],
        phone: [
          {required:true, message:'手机不能为空', trigger: 'blur'}
        ],
        latelyTime: [
          {required:true, message:'最后登录时间不能为空', trigger: 'blur'}
        ],
        userflag: [
          {required:true, message:'会员状态不能为空', trigger: 'blur'}
        ],
        verTimeStamp: [
          {required:true, message:'版本时间戳不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    showContent(){
        var formStatus = this.formStatus
        var userID = this.userID
        if(formStatus === 0){
           this.titleName="用户信息添加"
           this.buttonStatus="立即创建"
        }
        if(formStatus === 1){
           this.titleName="用户信息修改"
           this.buttonStatus="提交修改"
           //console.log(braID)
           this.$axios({
               url: '/api/users/GetByUid/'+ userID,
               method: 'get',
               header: {
                'Content-Type': 'application/json;charset=UTF-8'
               }
           }).then((res)=>{
               res = res.data
               const SUCCESS_OK = true
               const SUCCESS_NO = false
               if(res.success === SUCCESS_OK){
                   this.userform.uid = res.returnData.uid
                   this.userform.userCard = res.returnData.userCard
                   this.userform.wxOpid = res.returnData.wxOpid
                   this.userform.wxUid = res.returnData.wxUid
                   this.userform.userrealname = res.returnData.userrealname
                   this.userform.phone = res.returnData.phone
                   this.userform.latelyTime = res.returnData.latelyTime
                   this.userform.userflag = JSON.stringify(res.returnData.userflag)
                   this.userform.verTimeStamp = res.returnData.verTimeStamp
               }else if(response.success = SUCCESS_NO){
                   const msg = res.msgStr
                   this.$message.error(msg)
               }
           })
        }
    },
    SubmitFrom(formname) {
      this.$refs[formname].validate((valid) => {
         //console.log(brachModel);
         var formStatus = this.formStatus
         var userID = this.userID
         if(valid){
             if(formStatus === 0){
               console.log(add)
             }
             if(formStatus === 1){
                userhModel.uid = this.userform.uid;
                userhModel.userCard = this.userform.userCard;
                userhModel.wxOpid = this.userform.wxOpid;
                userhModel.wxUid = this.userform.wxUid;
                userhModel.userrealname = this.userform.userrealname;
                userhModel.phone = this.userform.phone;
                userhModel.latelyTime = this.userform.latelyTime;
                userhModel.userflag = this.userform.userflag;
                userhModel.verTimeStamp = this.userform.verTimeStamp;
                // this.$axios({
                //     url:'/api/users/PutUser',
                //     method: 'put',
                //     data:userhModel,
                //     headers: {
                //       'Content-Type': 'application/json;charset=UTF-8'
                //     }
                // })
                putUser(userhModel).then((res)=>{
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
    resetForm(formName) {
        this.$nextTick(()=>{
            this.$refs[formName].resetFields();
        })
    }
  },
  props: ['formStatus','userID'],
  mounted () {
      this.showContent()
  }
}
</script>
<style lang="scss">
@import './userform.scss';
</style>
