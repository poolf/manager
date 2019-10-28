<template>
  <div class="adminBraManagerList">
      <div class="adminBraManagerList_wrapper">
      <el-page-header @back="goBack"></el-page-header>
      <div class="search_nav">
        <h2>{{braName}}管理员信息</h2>
        <el-divider><span>{{braAdress}}</span></el-divider>
      </div>
      <!-- 显示该门店所有管理员信息 -->
      <div v-if="datastatus === 1" class="search_content">
        <div class="add_braManager">
            <el-button type="primary" @click="opendialogAdd">添加门店管理员</el-button>
        </div>
        <ul>
          <li v-for="item in userList" :key="item.index">
            <div class="show_search_item">
              <div class="show_search_item_wrpper">
                <div><span>用户编号：</span>{{item.uid}}</div>
                <div><span>姓名：</span>1</div>
                <div><span>手机：</span>1</div>
                <div><span>会员卡号：</span>1</div>
                <div><span>微信OPID：</span>1</div>
                <div><span>微信UID：</span>1</div>
                <!-- <div v-if="item.userflag === 0"><span>会员状态：<span style="color:#F56C6C">删除</span></span></div>
                <div v-if="item.userflag === 1"><span>会员状态：<span style="color:#67C23A">正常</span></span></div>
                <div v-if="item.userflag === 2"><span>会员状态：<span style="color:#E6A23C">冻结</span></span></div> -->
              </div>
              <div class="button_wrapper">
                  <el-button class="right_button" @click="openDelete(item)"><span>删除</span></el-button>
                </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 当管理员数据为空 -->
      <div v-if="datastatus === 0" class="search_content">
        <div class="add_braManager">
            <el-button type="primary" @click="opendialogAdd">添加门店管理员</el-button>
        </div>
        <div class="tiptext">**暂无数据**</div>
      </div>
      <!-- 添加管理员弹框 -->
      <el-dialog
         title="添加门店管理员"
        :visible.sync="openAddManger"
         width="30%">
         <el-form :model="braManagerForm" ref="braManagerForm" :label-position="labelPosition" label-width="100px">
            <el-form-item label="门店编号：" prop="braID">
              <div>{{braManagerForm.braID}}</div>
            </el-form-item>
            <el-form-item label="门店管理员：">
              <!-- <el-input v-model="braManagerForm.val" autocomplete="off" placeholder="手机/会员卡/微信opid"></el-input> -->
              <el-autocomplete
                  class="inline-input"
                  v-model="userMsg"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect">
                  <el-select v-model="selectSearchType" slot="prepend" placeholder="请选择" label-width="100px">
                    <el-option label="会员卡号" value="GetByUserCard"></el-option>
                    <el-option label="微信OPID" value="GetByWxOpid"></el-option>
                    <el-option label="手机号" value="GetByPhone"></el-option>
                  </el-select>
               </el-autocomplete>
               <el-tag
                  v-for="tag in selected"
                  :disable-transitions="false"
                  closable
                  :key="tag"
                  type="info"
                  @close="handleClose(tag)">
                <span class="el-select__tags-text">{{ tag }}</span>
               </el-tag>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="openAddManger = false">取 消</el-button>
            <el-button type="primary" @click="submitAdd()">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getpreBraManagerList, addBraManager, delBraManager, getUserPage } from '@/api/api'
var dataItemID = ''
const getUserlistModel = {
  pageIndex:'',
  pageSize:''
}
const BranchRoleModel ={
  uidList:[],
  barID:''
} 
export default {
  data () {
      return {
          datastatus: 1, //div数据状态
          labelPosition: 'left', //表单左对齐
          braID: '', //门店编号
          braName: '', //门店名称
          braAdress:'', //门店地址
          userList:[], //门店管理员列表
          openAddManger: false, //打开对话框
          userMsg:'', //输入框输入内容
          searchList:[], //查找获取用户list
          selected:[], // 获得value值
          selectedValue:[],  //获得code值
          selectSearchType:'GetByUserCard', //搜索框选择类型
          braManagerForm:{
            braID:'',
            val:''
          }
        }
   },
  created () {
    dataItemID = JSON.parse(this.$route.query.id)
    var dataItemName = this.$route.query.name
    var dataItemAdress= this.$route.query.adress

    this.braID = dataItemID
    this.braName = dataItemName
    this.braAdress= dataItemAdress

    this.getBraManagerList(dataItemID)
  },
  methods: {
    //获取该门店所有管理员
    getBraManagerList(id){
      //  this.$axios({
      //           url:'/api/BranchRole/GetByBraID/'+id,
      //           method:'get',
      //           headers: {
      //               'Content-Type': 'application/json'
      //           }
      //       })
          getpreBraManagerList(id).then((res) => {
                res = res.data
                const SUCCESS_OK = true
                const SUCCESS_NO = false
                if(res.success === SUCCESS_OK){
                  this.userList = res.returnData //获取当前页数据
                } else if(res.success === SUCCESS_NO){
                  if(res.returnData === null){
                      this.datastatus = 0
                      //this.$message.error(res.msgStr)
                  }
                   const msg = res.msgStr
                   console.log(msg)
                } 
            });
    },
    //获取用户数据对象
    getUserModel(pageIndex,pageSize){
      getUserlistModel.pageIndex = pageIndex
      getUserlistModel.pageSize = pageSize
    },
    //获取查询数据接口(_url:请求接口路径  userMsg:输入框的值  callback:数据回滚)
    getSearchUrl(_url, userMsg, callback){
       this.$axios({
        url: _url + userMsg,
        method:'get',
        headers: {
          'Content-Type': 'application/json'
          }
        }).then((res) => {
          res = res.data
          const SUCCESS_OK = true
          const SUCCESS_NO = false
          if(res.success === SUCCESS_OK){
            if(res.returnData !== '' && res.returnData !== null){
              var list = [];
              list.push(res.returnData)
              this.searchList = [];
              for(var i in list){
                this.searchList.push({
                  value: list[i].userrealname + list[i].phone,
                  uid: list[i].uid
                })
              }
              callback(this.searchList)
            }
          }
          if(res.success === SUCCESS_NO){
             const msg = res.msgStr
             this.$message.error(msg)
             console.log(msg)
            } 
        });
    },
    //查询获取用户对象
    querySearch(queryString,cb){
      var userMsg = this.userMsg
      //输入框为空
      if(userMsg === ''){
        this.getUserModel(1,5)
        // this.$axios({
        // url:'/api/users/GetPage',
        // method:'post',
        // data:getUserlistModel,
        // headers: {
        //   'Content-Type': 'application/json'
        //   }
        // })
        getUserPage(getUserlistModel).then((res) => {
          res = res.data
          const SUCCESS_OK = true
          const SUCCESS_NO = false
          if(res.success === SUCCESS_OK){
            var list = [];
            list = res.returnData
            this.searchList = [];
            for(var i in list){
              this.searchList.push({
                value: list[i].userrealname + list[i].phone,
                uid: list[i].uid
              })
            }
            cb(this.searchList)
           if(res.returnData === null){
              cb('暂无数据')
              this.$message.error(res.msgStr)
              }
          } else if(res.success === SUCCESS_NO){
             const msg = res.msgStr
             console.log(msg)
            } 
        });
      } 
      //输入框不为空
      if(userMsg !== ''){
        //通过判断用户选择哪种搜索字段
        var selectSearchType = this.selectSearchType
        //会员卡号
        if(selectSearchType === 'GetByUserCard'){
          var _url1 = '/api/users/GetByUserCard/'
          this.getSearchUrl(_url1,userMsg,cb)
        }
        //手机号
        if(selectSearchType === 'GetByPhone'){
          var _url2 = '/api/users/GetByPhone/'
          this.getSearchUrl(_url2,userMsg,cb)
        }
        //微信opid
        if(selectSearchType === 'GetByWxOpid'){
          var _url3 = '/api/users/GetByWxOpid/'
          this.getSearchUrl(_url3,userMsg,cb)
        }
      }
    },
    //对话框提交数据
    submitAdd(){
      //console.log(this.selectedValue)
      var selectedValue = []
      var newUserIDs = []
      selectedValue = this.selectedValue
      for(var i in selectedValue){
         newUserIDs.push(selectedValue[i].uid)
      }
      console.log(newUserIDs)
      BranchRoleModel.uidList = newUserIDs,
      BranchRoleModel.barID = this.braManagerForm.braID
      if(newUserIDs.length === 0){
        this.$message.error('添加该门店的管理员不能为空')
      } else {
        // this.$axios({
        //   url:'/api/BranchRole/AddList',
        //   method:'post',
        //   data:BranchRoleModel,
        //   headers: {
        //     'Content-Type': 'application/json'
        //     }
        //   })
        addBraManager(BranchRoleModel).then((res) => {
            res = res.data
            const SUCCESS_OK = true
            const SUCCESS_NO = false
            console.log(res.success)
            if(res.success === SUCCESS_OK){
              this.$message.success(res.msgStr)
              this.openAddManger = false;
              this.datastatus = 1;
              this.getBraManagerList(this.braManagerForm.braID)
            }
            if(res.success === SUCCESS_NO){
              this.$message.error(res.msgStr)
            } 
        });
      }
    },
    //关闭删除tag
    handleClose(tag) {
      let item = this.selected.indexOf(tag);
      this.selected.splice(item, 1);
      this.selectedValue.splice(item, 1);
    },
    //选择的tag
    handleSelect(item) {
      //console.log(this.selected)
      var selectlist = this.selected
      if(selectlist.length == 0){
        selectlist.push(item.value)
          this.selectedValue.push({
            udata:item.value,
            uid:item.uid
        })
      } else {
          for(var i = 0; i<selectlist.length; i++){
          if(selectlist.indexOf(item.value) == -1){
            selectlist.push(item.value)
            this.selectedValue.push({
              udata:item.value,
              uid:item.uid
             })
           }
         }
      }
      //console.log(this.selectedValue)
      //console.log(this.selected)
      this.userMsg = "";
    },
    //打开对话框
    opendialogAdd(){
      this.openAddManger = true;
      this.braManagerForm.braID = dataItemID
      this.selected = [];
      this.selectedValue = [];
    },
    //删除管理员
    openDelete(item){
      this.$confirm('确定要删除该门店管理员吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
          delBraManager(item.id).then((res) => {
            res = res.data
            const SUCCESS_OK = true
            const SUCCESS_NO = false
            if(res.success === SUCCESS_OK){
              this.$message.success(res.msgStr)
              this.getBraManagerList(item.braID)
            }
            if(res.success === SUCCESS_NO){
              this.$message.error(res.msgStr)
            } 
        });
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    //返回上一个页面
    goBack(){
      //this.$router.push('/adminBraSearch')
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
@import './adminBraManagerList.scss';
</style>
