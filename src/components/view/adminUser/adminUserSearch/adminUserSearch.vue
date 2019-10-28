<template>
  <div class="adminUserSearch">
    <div class="adminUserSearch_wrapper">
      <div class="search_nav">
        <h2>用户信息搜索</h2>
        <el-form ref="UserSearchform" :inline="true" :model="UserSearchform" class="demo-form-inline">
          <el-form-item label="用户编号" prop="uid">
            <el-input v-model="UserSearchform.uid" placeholder="用户编号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userrealname">
            <el-input v-model="UserSearchform.userrealname" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="UserSearchform.phone" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号" prop="userCard">
            <el-input v-model="UserSearchform.userCard" placeholder="会员卡号"></el-input>
          </el-form-item>
          <el-form-item label="微信OPID" prop="wxOpid">
            <el-input v-model="UserSearchform.wxOpid" placeholder="微信OPID"></el-input>
          </el-form-item>
          <el-form-item label="微信UID" prop="wxUid">
            <el-input v-model="UserSearchform.wxUid" placeholder="微信UID"></el-input>
          </el-form-item>
          <el-form-item label="会员状态" prop="userflag">
            <el-select v-model="UserSearchform.userflag" placeholder="会员状态">
              <el-option label="删除" value="0"></el-option>
              <el-option label="正常" value="1"></el-option>
              <el-option label="冻结" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="onSearch">查询</el-button>
            <el-button @click.native="onRefesh('UserSearchform')">重置刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_content">
        <ul>
          <li v-for="item in userList" :key="item.index">
            <div class="show_search_item">
              <div class="show_search_item_wrpper">
                <div><span>用户编号：</span>{{item.uid}}</div>
                <div><span>会员卡号：</span>{{item.userCard}}</div>
                <div><span>微信OPID：</span>{{item.wxOpid}}</div>
                <div><span>微信UID：</span>{{item.wxUid}}</div>
                <div><span>姓名：</span>{{item.userrealname}}</div>
                <div><span>手机：</span>{{item.phone}}</div>
                <div v-if="item.userflag === 0"><span>会员状态：<span style="color:#F56C6C">删除</span></span></div>
                <div v-if="item.userflag === 1"><span>会员状态：<span style="color:#67C23A">正常</span></span></div>
                <div v-if="item.userflag === 2"><span>会员状态：<span style="color:#E6A23C">冻结</span></span></div>
                <div><span>最后登录时间：</span>{{item.latelyTime}}</div>
                <div><span>版本时间戳：</span>{{item.verTimeStamp}}</div>
              </div>
              <div class="button_wrapper">
                  <el-button class="left_button" @click="openEdit(item)"><span>编辑</span></el-button>
                  <el-button class="right_button" @click="openDelete(item)"><span>删除</span></el-button>
                </div>
            </div>
          </li>
        </ul>
        <div class="page_block">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount">
         </el-pagination>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserPage, delUser } from '@/api/api'
const userModel = {
    pageIndex:'',
    pageSize:'',
    orderby:'',
    whereStr:[]
}
export default {
  data () {
    return {
      userList: [], //处理过的的数据
      currentPage: 1, //分页默认页数
      totalCount: 0, //分页的总条数
      pagesize: 8,
      flag: false,
      showUserFlag:'',
      UserSearchform: {
        uid: '',
        userCard: '',
        wxOpid: '',
        wxUid: '',
        userrealname:'',
        phone:'',
        userflag:''
      }
    }
  },
  created () {
    this.pageUserList()
  },
  methods: {
    //后台接口调用
    getUrl(dataModel){
      // this.$axios({
      //           url:'/api/users/GetPage',
      //           method:'post',
      //           data: dataModel,
      //           //data:JSON.stringify(userModel),
      //           // transformRequest:function(returnData){
      //           //     console.log(returnData.token);
      //           // },
      //           headers: {
      //               'Content-Type': 'application/json'
      //           }
      //       })
          getUserPage(dataModel).then((response) => {
               // let tk = returnData.data.token;
                response = response.data
                //console.log(response)
                //console.log(totalCount)
                const SUCCESS_OK = true
                const SUCCESS_NO = false
                if(response.success = SUCCESS_OK){
                  this.userList = response.returnData //获取当前页数据
                  this.totalCount = parseInt(response.returnExtendData.substring(14,16)) //获取门店信息总数
                  if(response.returnData === null){
                      this.$message.error(response.msgStr)
                  }
                } else if(response.success = SUCCESS_NO){
                   const msg = response.msgStr
                   console.log(msg)
                } 
            });
    },
    //获取usermodel数据
    getModel(orderby, wherestr){
       userModel.pageIndex = this.currentPage;
       userModel.pageSize = this.pagesize;
       userModel.orderby = orderby;
       userModel.whereStr = wherestr
    },
    //分页加载所有数据
    pageUserList(){
        this.getModel('',[])
        this.getUrl(userModel)
    },
    //查询功能
    onSearch () {
      //获取当前表单所有字段 用户输入的值
      var uid = this.UserSearchform.uid
      var userrealname = this.UserSearchform.userrealname
      var phone = this.UserSearchform.phone
      var userCard = this.UserSearchform.userCard
      var wxOpid = this.UserSearchform.wxOpid
      var wxUid = this.UserSearchform.wxUid
      var userflag = this.UserSearchform.userflag
      
      //将该表单的所有数据添加到searchObject数组中
      var searchObject = [
        {name: 'UID', val: uid},
        {name: 'userrealname',val: userrealname},
        {name: 'phone',val: phone},
        {name: 'userCard',val: userCard},
        {name: 'wxOpid',val: wxOpid},
        {name: 'wxUid',val: wxUid},
        {name: 'userflag',val: userflag}
      ]
      //创建新数组，将searchObject[].val不为空的值循环添加到newList数组
      var newList = [];
      for(var x in searchObject){
        if(searchObject[x].val !== ''){
          newList.push({ Field: searchObject[x].name, SKey: searchObject[x].val, SType:'='})
        }
      }
      
      if(uid === '' && userrealname === '' && phone ==='' && userCard ==='' && wxOpid ==='' && wxUid ==='' && userflag === ''){
        this.pageUserList();
      } else{
        this.getModel('uid asc', newList)
        this.getUrl(userModel)
      }
    },
    onRefesh(formName){
      this.$refs[formName].resetFields();
      this.pageUserList()
    },
    handleSizeChange(val){
     // console.log(`每页${val}条`)
      this.pagesize = val
      this.pageUserList()
    },
    handleCurrentChange(val){
     // console.log(`当前页：${val}`)
      this.currentPage = val
      this.pageUserList()
    },
    openEdit(item){
      console.log(item.uid)
      this.$router.push({
        path:'/adminUserUpdate',
        query: {
          id: JSON.stringify(item.uid)
        }
      })
    },
    openDelete(item){
      this.$confirm('确定要删除该用户吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
          //  this.$axios({
          //   url:'/api/users/delete/' + item.uid,
          //   method:'delete',
          //   data:{
          //     id: item.uid
          //   }
          // })
          delUser(item.uid).then((res) => {
             //console.log(res)
             var msg = res.data.msgStr
             this.$message.success(msg)
             this.pageUserList()
         })
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    openBraManager(item){
      console.log(item.uid)
      this.$router.push({
        path:'/adminUserUpdate',
        query: {
          id: JSON.stringify(item.uid)
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import './adminUserSearch.scss';
</style>
