<template>
  <div class="procluter">
      <div class="procluter_wrapper">
        <h2>商品集群价格管理</h2>
        <el-button class="addbc" type="primary" @click="openProcluterAdd">批量添加商品门店集群价格</el-button>
        <el-table
          :data="procluterData"
          style="width: 100%;">
          <!-- <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="自编号" width="80"></el-table-column> -->
          <el-table-column prop="bcName" label="门店名称" width="100"></el-table-column>
          <el-table-column prop="proName" label="商品名称" width="350"></el-table-column>
          <el-table-column prop="pid" label="商品编号" ></el-table-column>
          <el-table-column prop="bcID" label="门店集群编号"></el-table-column>
          <el-table-column prop="proBPrice" label="集群价格"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column prop="updateTime" label="更新日期"></el-table-column>
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
    <el-dialog title="批量添加商品门店集群价格"
               :visible.sync="isOpenChangeAss">
      <el-form :model="formBranList">
        <!-- <el-autocomplete
            v-model="formBranList.branchname"
            placeholder="请输入内容"
            :trigger-on-focus="true"
            prefix-icon="el-icon-search"
            @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="branchname">{{ item.branchname }}</div>
            <span class="address">{{ item.address }}</span>
          </template>
        </el-autocomplete>
        <div>
          <el-tag :key="tag.braID"
                  v-for="tag in selBraList"
                  closable
                  @close="handleCloseTag(tag)">
            {{tag.branchname}}
          </el-tag>
        </div> -->
      </el-form>
      <template slot="footer">
        <el-button >取消</el-button>
        <el-button type="primary"
                   >确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { GetProBranCluPricePage, DelProBranCluPrice, PutProBranCluPrice, AddProBranCluPrice } from '@/api/api'
const ProCluterModel = {
    pageIndex:'',
    pageSize:'',
    orderby:'',
    whereStr:''
}
export default {
  data () {
    return {
       procluterData:[],
       pagesize:7,
       currentPage:1,
       totalCount:0,
       isOpenChangeAss:false,
       formBranList:{
          branchname:''
       }
    }
  },
  created () {
    this.loadgetProCluterData()  
  },
  methods: {
    getProCluterModel(getorderby,getwhereStr){
       ProCluterModel.pageIndex = this.currentPage
       ProCluterModel.pageSize = this.pagesize
       ProCluterModel.orderby = getorderby
       ProCluterModel.whereStr = getwhereStr
    },
    getProCluterUrl(dataModel){
        GetProBranCluPricePage(dataModel).then((res)=>{
            res = res.data
            if(res.success === true){
                this.procluterData = res.returnData
                this.totalCount = parseInt(res.returnExtendData.substring(14,16)) //获取信息总数
            }
            if(res.success === false){
                this.$message.error(res.msgStr)
            }
        })
    },
    loadgetProCluterData(){
        this.getProCluterModel("updateTime desc",[])
        this.getProCluterUrl(ProCluterModel)
    },
    openProcluterAdd(){
        this.isOpenChangeAss = true
    },
    handleEdit(){},
    handleDelete(){},
    handleSizeChange(val){
      this.pagesize = val
      this.loadgetProCluterData()
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.loadgetProCluterData()
    },
  }
}
</script>
<style lang="scss">
@import './adminProClusterList.scss';
</style>
