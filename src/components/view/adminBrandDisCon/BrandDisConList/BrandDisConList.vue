<template>
  <div class="BrandDisConList">
    <div class="BrandDisConList_wrapper">
        <h2>门店配送规则管理</h2>
        <el-button class="addbc" type="primary" @click="openBCadd">创建门店配送规则</el-button>
        <el-table
          :data="proClassData"
          style="width: 100%;">
          <el-table-column prop="id" label="自编号"></el-table-column>
          <el-table-column prop="braid" label="门店编号"></el-table-column>
          <el-table-column prop="branchname" label="门店名称"></el-table-column>
          <el-table-column prop="salesDisCount" label="起送费用"></el-table-column>
          <el-table-column prop="deliveryFees" label="配送费"></el-table-column>
          <!-- <el-table-column prop="freeDelivery" label="包邮价"></el-table-column> -->
          <el-table-column prop="freeDelivery" label="包邮价">
            <template slot-scope="{row: {freeDelivery}}">
              <span style="color:#F56C6C;font-weight:700;" v-if="freeDelivery === null">--</span>
              <span v-else>{{freeDelivery}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
</template>
<script>
import { getBrandDCPage, delBrandDC  } from '@/api/api'
const branbcListModel = {
    pageIndex:'',
    pageSize:'',
    orderby:'',
    whereStr:[]
}
export default {
  data () {
    return {
      currentPage: 1, //分页默认页数
      totalCount: 0, //分页的总条数
      pagesize: 7, //每页显示记录数
      proClassData:[],
    }
  },
  created () {
    this.loadBCList()  
  },
  methods: {
    getBCmodel(getorderby,getwhereStr){
       branbcListModel.pageIndex = this.currentPage
       branbcListModel.pageSize = this.pagesize
       branbcListModel.orderby = getorderby
       branbcListModel.whereStr = getwhereStr
    },
    getBCurl(dataModel){
       getBrandDCPage(dataModel).then((res)=>{
           res = res.data
           if(res.success === true){
               this.proClassData = res.returnData
               this.totalCount = parseInt(res.returnExtendData.substring(14,16)) //获取信息总数
           }
           if(res.success === false){
               this.$message.error(res.msgStr)
           }
       })
    },
    loadBCList(){
       this.getBCmodel("braid desc",[])
       this.getBCurl(branbcListModel)
    },
    openBCadd(){
      this.$router.push({
        path:'/adminBrandDisConAdd'
      })
    },
    handleEdit(index, row){
      this.$router.push({
        path:'/adminBrandDisConUpdate',
        query: {
          id: JSON.stringify(row.id)
        }
      })
    },
    handleDelete(index, row){
      this.$confirm('确定要删除该门店规则吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
          delBrandDC(row.id).then((res)=>{
          res = res.data
          if(res.success === true){
              this.$message.success(res.msgStr)
            }
          if(res.success === false){
              this.$message.error(res.msgStr)
            }
          })
          this.loadBCList()
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    handleSizeChange(val){
      this.pagesize = val
    },
    handleCurrentChange(val){
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss" scoped>
@import './BrandDisConList.scss';
</style>
