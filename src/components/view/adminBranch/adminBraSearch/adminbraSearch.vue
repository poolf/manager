<template>
  <div class="adminBraSearch">
    <div class="adminBraSearch_wrapper">
        <div class="search_nav">
         <h2>门店信息查询</h2>
         <el-form ref="searchform" :inline="true" :model="searchform" class="demo-form-inline">
           <el-form-item label="门店编号" prop="braID">
             <el-input v-model="searchform.braID" placeholder="系统分店编号"></el-input>
           </el-form-item>
           <el-form-item label="系统分店编号" prop="erpid">
             <el-input v-model="searchform.erpid" placeholder="系统分店编号"></el-input>
           </el-form-item>
           <el-form-item label="区域信息" prop="area">
             <el-input v-model="searchform.area" placeholder="区域信息"></el-input>
           </el-form-item>
           <el-form-item label="门店名称" prop="braname">
             <el-input v-model="searchform.braName" placeholder="门店名称"></el-input>
           </el-form-item>
           <el-form-item label="集群编号" prop="bcID">
             <el-input v-model="searchform.bcID" placeholder="集群编号"></el-input>
           </el-form-item>
           <el-form-item label="已开通医保" prop="medicare">
             <el-select v-model="searchform.medicare" placeholder="请选择是否已开通医保">
               <el-option label="是" value="1"></el-option>
               <el-option label="否" value="0"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click.native="onSearch">查询</el-button>
             <el-button @click.native="onRefesh('searchform')">刷新</el-button>
           </el-form-item>
         </el-form>
       </div>
      <!-- 显示所有门店信息 -->
      <div v-show="branstatus === 0" class="search_content">
        <ul>
          <li v-for="item in branchList" :key="item.index">
            <div class="show_search_item">
              <div class="show_search_item_wrpper">
                <div><span>门店编号：</span>{{item.braID}}</div>
                <div><span>区域信息：</span>{{item.areaInfo}}</div>
                <div><span>系统分店编号：</span>{{item.erpBraid}}</div>
                <div><span>门店名称：</span>{{item.branchname}}</div>
                <el-tooltip :content="item.address" placement="top">
                  <div><span>门店地址：</span>{{item.address}}</div>
                </el-tooltip>
                <div><span>门店经纬度：</span>{{item.branchLngLat}}</div>
                <div><span>门店电话：</span>{{item.tel}}</div>
                <div><span>集群编号：</span>{{item.bcID}}</div>
                <div v-if="item.medicareflag === 1"><span>已开通医保：<span style="color:#67C23A">已开通</span></span></div>
                <div v-if="item.medicareflag === 0"><span>已开通医保：<span style="color:#F56C6C">未开通</span></span></div>
                <div style="height:50px;">
                  <span>形象图：</span>{{item.gallezyImg}}
                  <div>123</div>
                </div>
                <div v-if="item.typeFlag === 0"><span>门店状态：<span style="color:#F56C6C">删除</span></span></div>
                <div v-if="item.typeFlag === 1"><span>门店状态：<span style="color:#67C23A">正常</span></span></div>
                <div v-if="item.typeFlag === 2"><span>门店状态：<span style="color:#E6A23C">冻结</span></span></div>
                <el-divider></el-divider>
              </div>
              <div class="other_wrapper">
                <div><span>快递评分：</span>{{item.expressPoint}}</div>
                <div><span>服务评分：</span>{{item.servicePoint}}</div>
                <div><span>接单时间：</span>{{item.netSalesTime}}</div>
              </div>
              <div class="button_wrapper">
                  <el-button class="left_button" @click="openEdit(item)"><span>编辑</span></el-button>
                  <el-button class="center_button1" @click="updateBraflag(item)"><span>门店状态</span></el-button>
                  <el-button class="center_button" @click="openBraManager(item)"><span>管理员</span></el-button>
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
import { getBraListPage, delBra, putBraFlag, getBranchByKey } from '@/api/api'
const braSearchModel = {
  whereStr:[]
}
const updateBraflagModel= {
  braID:'',
  typeFlag:''
}
export default {
  data () {
    return {
      checkedBrans: [], //选中后的数据
      checkedAllBrans:[], //获取数据后的所有id集合
      branchList: [], //处理过的的数据
      currentPage: 1, //分页默认页数
      totalCount: 0, //分页的总条数
      pagesize: 8,
      branstatus: '',
      flag: false,
      searchform: {
        area: '',
        erpid: '',
        braID: '',
        braName: '',
        medicare: '',
        bcID: ''
      }
    }
  },
  created () {
    this.pageBranList()
  },
  methods: {
    //加载门店所有数据
    pageBranList(){
        this.branstatus = 0;
        getBraListPage(this.currentPage,this.pagesize).then((response) => {
          response = response.data
          const SUCCESS_OK = true
          const SUCCESS_NO = false
          if(response.success = SUCCESS_OK){
            this.branchList = response.returnData //获取当前页数据
            this.totalCount = parseInt(response.returnExtendData.substring(14,16)) //获取门店信息总数
          } else if(response.success = SUCCESS_NO){
            const msg = response.msgStr
             console.log(msg)
          } 
        });
    },
    //分页每页记录数
    handleSizeChange(val){
     // console.log(`每页${val}条`)
      this.pagesize = val
      this.pageBranList()
    },
    //分页当前页数
    handleCurrentChange(val){
     // console.log(`当前页：${val}`)
      this.currentPage = val
      this.pageBranList()
    },
    //打开修改门店信息
    openEdit(item){
      console.log(item.braID)
      this.$router.push({
        path:'/adminBraUpdate',
        query: {
          id: JSON.stringify(item.braID)
        }
      })
    },
    //删除门店信息
    openDelete(item){
      this.$confirm('确定要删除该门店吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
          //  this.$axios({
          //   url:'/api/Branch/Delete/' + item.braID,
          //   method:'delete',
          //   data:{
          //     id: item.braID
          //   }
          //   })
          delBra(item.braID).then((res) => {
             //console.log(res)
             var msg = res.data.msgStr
             this.$message.success(msg)
             this.pageBranList()
         })
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    //打开门店管理员信息
    openBraManager(item){
      this.$router.push({
        path:'/adminBraManagerList',
        query: {
          id: JSON.stringify(item.braID),
          name: item.branchname,
          adress: item.address
        }
      })
    },
    //修改门店状态
    updateBraflag(item){
      var typeFlag = item.typeFlag
      if(typeFlag ===1){
        updateBraflagModel.typeFlag = 2
      }
      if(typeFlag ===2){
        updateBraflagModel.typeFlag = 1
      }
      updateBraflagModel.braID = item.braID
      // this.$axios({
      //       url:'/api/Branch/PutTypeFlag',
      //       method:'put',
      //       data:updateBraflagModel
      //     })
      putBraFlag(updateBraflagModel).then((res) => {
          //console.log(res)
          var msg = res.data.msgStr
          this.$message.success(msg)
          this.pageBranList()
      })
    },
    //查询门店信息
    onSearch () {
      this.branstatus = 0;
      var area = this.searchform.area
      var braID = this.searchform.braID
      var erpid = this.searchform.erpid
      var bcID = this.searchform.bcID
      var braName = this.searchform.braName
      var medicare = this.searchform.medicare

      var branSearchList = [
        {name: 'areaInfo', val: area},
        {name: 'erpBraid', val: erpid},
        {name: 'braID', val: braID},
        {name: 'bcID', val: bcID},
        {name: 'branchname', val: braName},
        {name: 'medicareflag', val: medicare}
      ]
      var newbranSearchList =[]
      for(var i in branSearchList){
        if(branSearchList[i].val !== ''){
          newbranSearchList.push({ Field: branSearchList[i].name, SKey: branSearchList[i].val, SType:'%'})
        }
      }
      braSearchModel.whereStr = newbranSearchList
      // this.$axios({
      //   url: '/api/Branch/GetBranchByKey/0',
      //   method: 'post',
      //   data: braSearchModel,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      getBranchByKey(braSearchModel, 0).then((res) => {
          res = res.data
          const SUCCESS_OK = true
          const SUCCESS_NO = false
          if(res.success = SUCCESS_OK){
            if(res.returnData === null){
              this.$message.error(res.msgStr)
              this.branchList = res.returnData
            } else {
              this.branchList = res.returnData //获取当前页数据
              //console.log(res.returnData)
              this.totalCount = res.returnData.length
            }
          } else if(res.success = SUCCESS_NO){
            const msg = res.msgStr
            // console.log(msg)
          } 
      })
    },
    //刷新门店数据
    onRefesh(formName){
      this.$refs[formName].resetFields();
      this.pageBranList();
    },
  }
}
</script>
<style lang="scss">
@import './adminbraSearch.scss';
</style>
