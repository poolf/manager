<template>
  <div class="updateBcids">
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
       <!-- 查询后修改集群号页面内容 -->
      <div class="search_content_1">
          <div class="checkAllbutton">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <el-button class="update_bcID" @click="updateBcid">批量修改集群号</el-button>
          <ul>
            <li v-for="item in branchList" :key="item.index">
                <div class="show_bran_item">
                  <el-checkbox-group v-model="checkedBrans" @change="handleCheckedBransChange">
                    <el-checkbox :label="item.braID" >
                      <div class="show_bran_item_wrpper">
                        <div><span>门店编号：</span>{{item.braID}}</div>
                        <div><span>系统分店编号：</span>{{item.erpBraid}}</div>
                        <div><span>门店名称：</span>{{item.branchname}}</div>
                        <div><span>门店经纬度：</span>{{item.branchLngLat}}</div>
                        <div v-if="item.typeFlag === 0"><span>门店状态：</span><span style="color:#F56C6C">删除</span></div>
                        <div v-if="item.typeFlag === 1"><span>门店状态：</span><span style="color:#67C23A">正常</span></div>
                        <div v-if="item.typeFlag === 2"><span>门店状态：</span><span style="color:#E6A23C">冻结</span></div>
                        <div style="color:#242f42;"><span>集群编号：</span>{{item.bcID}}</div>
                      </div>
                    </el-checkbox>
                    <div class="button_wrapper">
                        <el-button type="info" @click="openInfo(item)"><span>详情</span></el-button>
                        <el-button class="top_button" @click="openEdit(item)"><span>修改</span></el-button>
                        <el-button class="bottom_button" @click="openDelete(item)"><span>删除</span></el-button>
                    </div>
                  </el-checkbox-group>
                </div>
            </li>
          </ul>
      </div>
      <!-- 门店详情弹框 -->
      <el-dialog
         title="门店部分信息详情"
        :visible.sync="dialogVisible"
         width="30%"
         class="dialog">
        <div class="info_item"><span>门店编号：</span>{{branInfo.braID}}</div>
        <div class="info_item"><span>区域信息：</span>{{branInfo.areaInfo}}</div>
        <div class="info_item"><span>系统分店编号：</span>{{branInfo.erpBraid}}</div>
        <div class="info_item"><span>门店名称：</span>{{branInfo.branchname}}</div>
        <div class="info_item"><span>门店地址：</span>{{branInfo.address}}</div>
        <div class="info_item"><span>门店经纬度：</span>{{branInfo.branchLngLat}}</div>
        <div class="info_item"><span>门店电话：</span>{{branInfo.tel}}</div>
        <div v-if="branInfo.medicareflag === 1" class="info_item"><span>是否已开通医保：<span style="color:#67C23A">已开通</span></span></div>
        <div v-if="branInfo.medicareflag === 0" class="info_item"><span>是否已开通医保：<span style="color:#F56C6C">未开通</span></span></div>
        <div v-if="branInfo.typeFlag === 0" class="info_item"><span>门店状态：<span style="color:#F56C6C">删除</span></span></div>
        <div v-if="branInfo.typeFlag === 1" class="info_item"><span>门店状态：<span style="color:#67C23A">正常</span></span></div>
        <div v-if="branInfo.typeFlag === 2" class="info_item"><span>门店状态：<span style="color:#E6A23C">冻结</span></span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改集群号弹框 -->
      <el-dialog
         title="批量修改集群号"
        :visible.sync="openUpdate"
         width="30%">
          <el-form :model="bcidForm" :rules="rules" ref="bcidForm">
            <el-form-item label="已选门店编号：" label-width="120px">
              <div>{{bcidForm.checkedBrans}}</div>
            </el-form-item>
            <el-form-item label="集群编号" label-width="120px" prop="bcid">
              <el-input v-model.number="bcidForm.bcid" autocomplete="off" placeholder="请输入集群编号"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="openUpdate = false">取 消</el-button>
            <el-button type="primary" @click="submitUpdate('bcidForm')">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
const braSearchModel = {
  whereStr:[]
}
const checkedAllBrans = []
const updateBcidsModel= {
  brIDS:[],
  bcID:''
}
export default {
  data () {
    return {
      branchList:[],
      checkAll:false,
      isIndeterminate: true,
      dialogVisible:false,
      openUpdate:false,
      checkedBrans: [], //选中后的数据
      checkedAllBrans:[], //获取数据后的所有id集合
      flag: false,
      checked: false,
      searchform: {
        area: '',
        erpid: '',
        braID: '',
        braName: '',
        medicare: '',
        bcID: ''
      },
      branInfo:{
        braID:'',
        areaInfo:'',
        erpBraid:'',
        branchname:'',
        address:'',
        branchLngLat:'',
        tel:'',
        medicareflag:'',
        typeFlag:''
      },
      bcidForm:{
        bcid:'',
        checkedBrans:[]
      },
      rules: {
        bcid: [
          {required:true, message:'集群编号编号不能为空', trigger: 'blur'},
          {type: 'number',message: '请输入正确的集群编号'}
        ]
      }
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
     // 全选按钮方法
    handleCheckAllChange(val) {
        for(var item in this.branchList){
            this.checkedAllBrans.push(this.branchList[item].braID)
          }
        this.checkedBrans = val ? this.checkedAllBrans : [];
        this.isIndeterminate = false;
        //console.log(this.checkedBrans)
    },
    //选取当个按钮的方法
    handleCheckedBransChange(value) {
       //console.log(item)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkedAllBrans.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedAllBrans.length;
       //console.log(this.checkedBrans)
    },
    //查询门店信息
    onSearch () {
      this.branstatus = 1;
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
      this.$axios({
        url: '/api/Branch/GetBranchByKey/0',
        method: 'post',
        data: braSearchModel,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
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
      this.onSearch();
    },
    //查询后点击单个门店信息详情
    openInfo(item){
       this.dialogVisible = true;
       //console.log(item.braID)
       this.$axios({
          url:'/api/Branch/Get/'+ item.braID,
          method:'get',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          // let tk = returnData.data.token;
          res = res.data
          const SUCCESS_OK = true
          const SUCCESS_NO = false
          if(res.success = SUCCESS_OK){
            this.branInfo.braID  = res.returnData.braID
            this.branInfo.areaInfo  = res.returnData.areaInfo
            this.branInfo.erpBraid  = res.returnData.erpBraid
            this.branInfo.branchname  = res.returnData.branchname
            this.branInfo.address  = res.returnData.address
            this.branInfo.tel  = res.returnData.tel
            this.branInfo.branchLngLat  = res.returnData.branchLngLat
            this.branInfo.medicareflag  = res.returnData.medicareflag
            this.branInfo.typeFlag  = res.returnData.typeFlag
          } else if(res.success = SUCCESS_NO){
            const msg = res.msgStr
            console.log(msg)
          } 
      });
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
           this.$axios({
            url:'/api/Branch/Delete/' + item.braID,
            method:'delete',
            data:{
              id: item.braID
            }
          }).then((res) => {
           //console.log(res)
           var msg = res.data.msgStr
           this.$message.success(msg)
           this.onSearch()
         })
      }).catch(()=>{
         console.log('已取消删除')
      })
    },
    //点击弹出修改集群号对话框
    updateBcid(){
      console.log(this.checkedBrans)
      var checkBransList = this.checkedBrans
      if(checkBransList.length === 0){
        this.$message.error('请选择要修改的门店')
      } else {
        this.openUpdate = true
        this.bcidForm.checkedBrans = this.checkedBrans
      }
    },
    //提交修改集群号信息
    submitUpdate(formname){
      this.$refs[formname].validate((valid) => {
         if(valid){
           updateBcidsModel.brIDS = this.bcidForm.checkedBrans
           updateBcidsModel.bcID = this.bcidForm.bcid
           this.$axios({
             url:'/api/Branch/PutAllBrandCl',
             method:'put',
             data:updateBcidsModel,
             headers: {
               'Content-Type': 'application/json'
             }
           }).then((res) => {
             res = res.data
             const SUCCESS_OK = true
             const SUCCESS_NO = false
             if(res.success = SUCCESS_OK){
               this.$message.success(res.msgStr)
               this.openUpdate = false
               this.onSearch()
             } else if(res.success = SUCCESS_NO){
               const msg = res.msgStr
               this.$message.error(res.msgStr)
             } 
           });
         }else{
           console.log('error')
           this.$message.error('数据校验不通过')
           return false
         }
      })
    }
  }
}
</script>
<style lang="scss">
@import './adminbraSearch.scss';
</style>
