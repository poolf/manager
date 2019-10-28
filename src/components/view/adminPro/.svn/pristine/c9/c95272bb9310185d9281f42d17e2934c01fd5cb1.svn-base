<template>
  <div class="adminProClassList">
    <div class="top_nav">
      <!-- <div><el-page-header @back="goBack"></el-page-header></div> -->
        <ul>
          <li @click="clickItemData(item)" v-for="(item, index) in navlist" :key="index" :class="{active:index === isActive}">
            <span> > {{item.label}}</span>
          </li>
        </ul>
    </div>
    <div class="adminProContent_wrapper">
        <h2>商品类别管理</h2>
        <h5>当前类别编号：<span style="color:red;">{{preclsParID}}</span></h5>
        <h5>类别名称：<span style="color:red;">{{preclsName}}</span></h5>
        <div class="button_wrapper">
          <div>
            <el-button type="primary" @click="openAddProClass">添加商品类别</el-button>
            <el-button type="primary" plain @click="updateSelectIdlist">批量更新类别状态</el-button>
          </div>
          <div class="search_button_wrapper">
            <div class="seach_casc">
              <a-proCascader @clsparidChange="getclsparidChange($event)" ref="cls"></a-proCascader>
              <el-input v-model="searchid" v-show="false"></el-input>
            </div>
            <div>
              <el-button class="button_search" type="primary" @click="submitSearch">搜索</el-button>
            </div>
          </div>
        </div>
        <el-table
          :data="proClassData"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="自编号"></el-table-column>
          <el-table-column prop="clsID" label="类别编号"></el-table-column>
          <el-table-column prop="clsName" label="类别名称"></el-table-column>
          <el-table-column prop="clsParID" label="父编号"></el-table-column>
          <el-table-column prop="clsSort" label="排序"></el-table-column>
          <el-table-column prop="mnemonic" label="助记码"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="200"></el-table-column>
          <el-table-column prop="updateTime" label="更新日期" width="200"></el-table-column>
          <el-table-column prop="delFlag" label="状态">
            <template slot-scope="{row: {delFlag}}">
              <span style="color:#67C23A;font-weight:700;" v-if="+delFlag ===1">正常</span>
              <span style="color:#E6A23C;font-weight:700;" v-if="+delFlag ===2">冻结</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="atooltip" content="查看当前商品类别的子类别" placement="bottom">
                <el-button size="mini" type="primary" plain icon="el-icon-more" @click="RefeshData(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" popper-class="atooltip" content="快捷变更商品类别状态" placement="bottom">
                <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="fastUpdateDeflag(scope.$index, scope.row)"></el-button>
              </el-tooltip>
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
      <!-- 批量修改类别状态 -->
      <el-dialog
         title="商品类别状态修改"
        :visible.sync="openUpdateDeflag"
         width="30%">
         <el-form :model="updateidForm" ref="updateidForm" :label-position="labelPosition" label-width="120px">
            <el-form-item label="商品自编号id：" prop="ids">
              <div>{{updateidForm.ids}}</div>
            </el-form-item>
            <el-form-item label="已开通医保" prop="delFlag">
             <el-select v-model="updateidForm.delFlag" placeholder="请选择是否已开通医保">
               <el-option label="正常" value="1"></el-option>
               <el-option label="冻结" value="2"></el-option>
             </el-select>
           </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="openUpdateDeflag == false">取 消</el-button>
            <el-button type="primary" @click="submitDelFlag">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getProClassPage, putProClassFlag, getAllParClsID } from '@/api/api'
const ProClassModel = {
    pageIndex:'',
    pageSize:'',
    orderby:'',
    whereStr:[]
}
const getProModel ={
  pageIndex:'',
  pageSize:'',
  orderby:'',
  whereStr:[]
}
const updateDelFlagModel = {
  idList:[],
  delFlag:''
}
export default {
  data () {
    return {
      navlist:[],
      isActive:-1,
      searchid:'',
      proClassData:[], //商品类别数据
      preclsParID:100, //最高级父编号
      preclsName:"无",
      currentPage: 1, //分页默认页数
      totalCount: 0, //分页的总条数
      pagesize: 7, //每页显示记录数
      multipleSelection:[], //多选
      selectIdlist:[], //批量提交的id数组
      saveclsParID:[{id:100,name:"无"}],
      openUpdateDeflag: false,
      labelPosition: "left",
      updateidForm:{
        ids:[],
        delFlag: "1"
      }
    }
  },
  created () {
    this.loadProList(100,"无")
  },
  methods: {
    getclsparidChange(msg){
      this.searchid = msg
    },
    //****************** 获取页面数据 *****************/
    //获取usermodel数据
    getProclassModel(orderby, wherestr){
       ProClassModel.pageIndex = this.currentPage;
       ProClassModel.pageSize = this.pagesize;
       ProClassModel.orderby = orderby;
       ProClassModel.whereStr = wherestr
    },
    //后台接口调用获取商品类别信息
    getProclassUrl(dataModel){
      getProClassPage(dataModel).then((response) => {
            response = response.data
            const SUCCESS_OK = true
            const SUCCESS_NO = false
            if(response.success === SUCCESS_OK){
              this.proClassData = response.returnData //获取当前页数据
              var list = this.proClassData
              this.totalCount = parseInt(response.returnExtendData.substring(14,16)) //获取信息总数
              if(response.returnData === null){
                  this.$message.error(response.msgStr)
              }
            } else if(response.success === SUCCESS_NO){
              this.proClassData = [];
              const msg = response.msgStr
              console.log(msg)
            } 
      });
    },
    //获取数据
    loadProList(clsParID,clasName){
      this.preclsParID = clsParID
      this.preclsName = clasName
      var newList = [];
      newList.push({ Field: "clsParID", SKey: clsParID, SType:'='})
      var orderby = "id desc"
      this.getProclassModel(orderby,newList)
      this.getProclassUrl(ProClassModel)
    },
    
    //********* 导航菜单操作 ********/
    //加载导航数据
    loadNavListData(){
      var paramsList = []
      var prelist = [{id:100, label:"首页"}]
      var id = this.preclsParID
      if(id === 100){
        this.loadProList(100,"无")
      } else {
        getAllParClsID(id).then((res)=>{
          res = res.data
          if(res.success === true){
            var datalist = res.returnData
            for(var i in datalist){
              paramsList.push({
                 id: datalist[i].value,
                 label: datalist[i].key
              })
            }
            paramsList = paramsList.reverse()
            this.navlist = prelist.concat(paramsList)
          }
        })
      }
    },
    //鼠标点击事件
    clickItemData(item){
      this.isActive = item.index;
      //console.log(item.id)
      if(item.id === 100){
        this.navlist = []
        this.loadProList(100,"无")
      } else {
        this.loadProList(item.id, item.label)
      }
    },
    
    //******************** 搜索数据操作 ********** */
    setProModel(orderby, wherestr){
       getProModel.pageIndex = this.currentPage;
       getProModel.pageSize = this.pagesize;
       getProModel.orderby = orderby;
       getProModel.whereStr = wherestr
    },
    //根据当前id获取当前数据信息
    getSearchCls(id){
       var newList = [];
       newList.push({ Field: "clsID", SKey: id, SType:'='})
       this.setProModel('',newList)
       getProClassPage(getProModel).then((res) => {
            res = res.data
            //console.log(res)
            const SUCCESS_OK = true
            const SUCCESS_NO = false
            if(res.success === SUCCESS_OK){
               this.preclsName = res.returnData[0].clsName
               //console.log(this.preclsName)
            } else if(res.success === SUCCESS_NO){
              console.log(res.msgStr)
            } 
      });
    },
    loadProList2(clsParID){
      var newList2 = [];
      newList2.push({ Field: "clsParID", SKey: clsParID, SType:'='})
      var orderby = "id desc"
      this.getProclassModel(orderby,newList2)
      this.getProclassUrl(ProClassModel)
    },
    //搜索按钮触发事件
    submitSearch(){
      var id = this.searchid
      if(id === ''){
        this.$message.error("请选择想要搜索的类别")
      } else{
        this.preclsParID = this.searchid
        this.getSearchCls(id)
        this.loadProList2(id)
        this.loadNavListData()
      }
    },

    //***************** 页面操作 *****************/
    //表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectIdlist =[];
      //console.log(this.multipleSelection)
      for(var i in this.multipleSelection){
        this.selectIdlist.push(this.multipleSelection[i].id)
      }
      //console.log(this.selectIdlist)
    },
    //批量更新按钮
    updateSelectIdlist(){
      if(this.selectIdlist.length === 0){
        this.$message.error('请选择要修改的商品类别')
      } else {
        this.openUpdateDeflag = true;
        this.updateidForm.ids = this.selectIdlist
      }
      //console.log(this.selectIdlist)
    },
    //添加商品类别
    openAddProClass(){
      this.$router.push({
        path:'/adminProClassAdd'
      })
    },
    //获取修改类别状态model
    getDelFlagModel(ids,delFlag){
       updateDelFlagModel.idList = ids;
       updateDelFlagModel.delFlag = delFlag;
    },
    //请求修改类别状态url
    getDelFlagUrl(dataModel){
      putProClassFlag(dataModel).then((response) => {
            response = response.data
            const SUCCESS_OK = true
            const SUCCESS_NO = false
            if(response.success === SUCCESS_OK){
              this.$message.success(response.msgStr)
              this.openUpdateDeflag = false;
              this.loadProList(this.preclsParID,this.preclsName)
            } else if(response.success === SUCCESS_NO){
              this.openUpdateDeflag = true;
              this.$message.error(response.msgStr)
            } 
      });
    },
    //批量修改类别状态url
    submitDelFlag(){
       var idList = this.updateidForm.ids;
       var delFlag = this.updateidForm.delFlag
       this.getDelFlagModel(idList,delFlag)
       this.getDelFlagUrl(updateDelFlagModel)
    },

    //************ 操作栏四个功能按钮 **************/
    //1、查看当前类别的子类别
    RefeshData(index, row){
     // console.log(row.clsID)
      this.loadProList(row.clsID,row.clsName)
      this.loadNavListData()
      // this.saveclsParID.push({
      //   id:row.clsID,
      //   name:row.clsName
      // })
      // console.log(this.saveclsParID)
    },
    //2、快捷修改类别状态
    fastUpdateDeflag(index, row){
      //console.log(row.id)
      var preDeflag;
      if(row.delFlag === 1){
        preDeflag = 2 
      }
      if(row.delFlag === 2) {
        preDeflag = 1
      }
      var itemlist = []
      itemlist.push(row.id)
      this.getDelFlagModel(itemlist,preDeflag)
      this.getDelFlagUrl(updateDelFlagModel)
     this.loadProList(this.preclsParID,this.preclsName)
    },
    //3、修改类别信息
    handleEdit(index, row) {
      //console.log(index, row);
      this.$router.push({
        path:'/adminProClassUpdate',
        query: {
          id: JSON.stringify(row.id)
        }
      })
    },
    //4、删除类别
    handleDelete(index, row) {
      this.$confirm('确定要删除该商品类别吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
          var idList = []
          idList.push(row.id)
          var delFlag = 0
          this.getDelFlagModel(idList,delFlag)
          this.getDelFlagUrl(updateDelFlagModel)
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    //每个显示记录数
    handleSizeChange(val){
     // console.log(`每页${val}条`)
      this.pagesize = val
      this.loadProList(this.preclsParID,this.preclsName)
    },
    //当前页
    handleCurrentChange(val){
     // console.log(`当前页：${val}`)
      this.currentPage = val
      this.loadProList(this.preclsParID,this.preclsName)
    }
  }
}
</script>
<style lang="scss">
@import './adminProClassList.scss';
.atooltip {
  background: #ecf5ff!important;
  color: #409eff!important;
  border:1px solid #409eff!important;
}
.el-tooltip__popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #409eff!important;
  }
  .el-tooltip__popper[x-placement^=bottom] .popper__arrow:after {
    border-bottom-color: #409eff!important;
  }

</style>
