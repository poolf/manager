<template>
  <section class="form_wrapper">
    <!--工具条-->
    <h2>门店集群管理</h2>
    <el-col :span="24"
            class="f_toolbar">
      <el-form :inline="true"
               :model="filters">
        <el-form-item label="集群名称">
          <el-input v-model="filters.bcName"
                    placeholder="集群名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onRefresh">重置刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     plain
                     @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="bclList"
              highlight-current-row
              v-loading="listLoading">
      <el-table-column prop="bcID"
                       label="ID"
                       min-width="10%"
                       sortable></el-table-column>
      <el-table-column prop="bcName"
                       label="集群名称"
                       min-width="40%"></el-table-column>
      <el-table-column label="操作"
                       min-width="50%">
        <template v-slot="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small"
                     type="danger"
                     @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="small"
                     type="primary"
                     plain
                     @click="handlePut(scope.$index,scope.row)">关联</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--对话框-集群名称-->
    <el-dialog :title="isAdd ? '新增集群信息' : '编辑集群信息' "
               :visible.sync="isOpenBcl"
               :close-on-click-modal="false">
      <el-form :model="formBclList"
               label-width="80px"
               :rules="bcNameRules"
               ref="formBclList">
        <el-form-item label="集群名称"
                      prop="bcName">
          <el-input v-model="formBclList.bcName"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click.native="isOpenBcl = false">取消</el-button>

        <el-button type="primary"
                   @click.native="addBcNameSubmit"
                   v-if="isAdd">确定</el-button>
        <el-button type="primary"
                   @click.native="editbcNameSubmit"
                   v-else>确定</el-button>
      </template>
    </el-dialog>

    <!--对话框-关联门店信息-->
    <el-dialog title="已关联门店"
               :visible.sync="isOpenAssociated"
               :close-on-click-modal="false">
      <div>
        <el-tag :key="returnTag.braID"
                v-for="returnTag in returnBraList">
          {{returnTag.branchname}}
        </el-tag>
      </div>
      <template slot="footer">
        <el-button @click.native="cancelAss">取消</el-button>
        <el-button type="primary"
                   @click.native="editAssociated">修改</el-button>
      </template>
    </el-dialog>

    <!--对话框-增删改关联-->
    <el-dialog title="关联门店"
               :visible.sync="isOpenChangeAss"
               :close-on-click-modal="false"
               :before-close="beforeCLoseChangeASS"
               :destroy-on-close="true">
      <el-form :model="formAssList">
        <el-autocomplete popper-class="my-autocomplete"
                         v-model="formAssList.branchname"
                         :fetch-suggestions="querySearch"
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
        </div>
      </el-form>
      <template slot="footer">
        <el-button @click.native="cancelChangeAss">取消</el-button>
        <el-button type="primary"
                   @click.native="submitAssociated">确定</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import { getBclList, addBcl, delBcl, putBcl, getBranchByKey, putAllBcl } from '@/api/api'
const newModel = {
  whereStr: []
}
export default {
  data () {
    return {
      filters: {
        bcName: '',
        delFlag: 1//默认1，正常
      },
      bclList: [],//处理过数据
      total: 0,
      bclLength: 0,
      listLoading: false,
      isUseRules: false,
      isAdd: true,//true：新增页面，false：编辑页面

      isOpenBcl: false,
      bcNameRules: {
        bcName: [
          { required: true, message: '请输入集群名称', trigger: 'blur' }
        ]
      },
      formBclList: {
        bcName: '',
        delFlag: 1
      },

      isOpenAssociated: false,
      isLoadData: false,//判断门店数据加载成功否
      assList: [],//门店数据

      isOpenChangeAss: false,
      formAssList: {
        branchname: '',
        bcID: ''
      },

      returnBraList: [],
      isHaveData: false,

      selBraList: [],//处理数据

      saveArr: []
    }
  },
  methods: {
    getBranchCluster (dataModel) {//获取列表
      dataModel = (dataModel === undefined ? {} : dataModel)
      this.listLoading = true
      getBclList(dataModel, this.bclLength).then((res) => {
        res = res.data
        //console.log(res)
        if (res.success === true) {
          this.bclList = res.returnData
          this.listLoading = false
          //console.log(res.msgStr)
          if (res.returnData === null) {
            this.$message.error(res.msgStr)
          }
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
          this.listLoading = false
        }
      })
    },
    getBranch () {// 获取门店列表
      getBranchByKey({}, this.bclLength).then(res => {
        this.isLoadData = true
        this.assList = res.data
      })
    },
    //查询
    onSearch () {
      newModel.whereStr = [
        {
          'Field': 'bcName',
          'Skey': this.filters.bcName,
          'SType': '%'
        },
        {
          'Field': 'delFlag',
          'Skey': this.filters.delFlag,
          'SType': '='
        }
      ]
      //console.log(newModel)
      this.getBranchCluster(newModel)
    },
    //重置刷新
    onRefresh () {
      this.filters.bcName = ''
      newModel.whereStr = []
      this.getBranchCluster()
    },
    //重置验证规则，判断是否已经使用了验证规则
    useRules () {
      if (this.isUseRules) {
        this.$refs.formBclList.resetFields()
      }
    },
    //打开集群信息对话框，初始化
    handleAdd () {
      this.isAdd = true
      this.isOpenBcl = true
      this.formBclList = {
        bcName: '',
        delFlag: 1
      }
      this.useRules()
    },
    //删除列
    handleDel (index, row) {
      this.$confirm('确认删除该记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        delBcl(row.bcID).then((res) => {
          res = res.data
          if (res.success === true) {
            this.$message.success(res.msgStr)
            this.getBranchCluster()
          } else if (res.success === false) {
            this.$message.error(res.msgStr)
          }
        })
      }).catch(() => { })
    },
    handleEdit (index, row) {
      this.isAdd = false
      this.isOpenBcl = true
      this.useRules()
      this.formBclList = row
    },
    addBcNameSubmit () {//新增
      this.$refs.formBclList.validate((valid) => {
        if (valid) {
          addBcl(this.formBclList).then((res) => {
            res = res.data
            if (res.success === true) {
              this.$message.success(res.msgStr)
              this.getBranchCluster()
              this.isOpenBcl = false
              this.isUseRules = true
            } else if (res.success === false) {
              this.$message.error(res.msgStr)
            } else { return; }
          })
        } else {
          this.isUseRules = true
          return false
        }
      })
    },
    editbcNameSubmit () {//编辑
      this.$refs.formBclList.validate((valid) => {
        if (valid) {
          putBcl(this.formBclList).then((res) => {
            res = res.data
            if (res.success === true) {
              this.$message.success(res.msgStr)
              this.getBranchCluster(newModel)
              this.isOpenBcl = false
            } else if (res.success === false) {
              this.$message.error(res.msgStr)
            } else { return; }
          })
        } else {
          this.isUseRules = true
          return false
        }
      })
    },
    handlePut (index, row) {
      this.formAssList.branchname = ''
      this.formAssList.bcID = row.bcID

      if (this.isLoadData) {
        const res = this.assList.returnData

        const bcIDData = this.formAssList.bcID ? res.filter(item => item.bcID === this.formAssList.bcID) : res
        if (bcIDData.length !== 0) {
          //打开已关联门店

          this.isOpenAssociated = true
          this.isHaveData = true
          this.returnBraList = bcIDData
        } else {
          //打开关联门店
          this.isOpenChangeAss = true
        }
      }
    },
    querySearch (queryString, cb) {
      if (this.isLoadData) {
        const res = this.assList.returnData

        const partData = queryString ? res.filter(item => item.branchname.indexOf(queryString) > -1) : res

        if (partData.length !== 0) {
          cb(partData)
        } else {
          const without = [{
            "branchname": '暂无数据'
          }]
          cb(without)
        }
      }
    },
    handleSelect (item) {
      if (this.saveArr.indexOf(item.braID) === -1) {
        this.saveArr.push(item.braID)// 存储队列中，用队列判断是否重复添加
        this.selBraList.push(item)
      } else {
        this.$message.error("重复添加")
      }
    },
    handleCloseTag (tag) {
      this.selBraList.splice(this.selBraList.indexOf(tag), 1);
      this.saveArr.splice(this.saveArr.indexOf(tag.braID), 1);
    },
    editAssociated () {
      this.isOpenAssociated = false
      this.isOpenChangeAss = true
      this.selBraList = this.returnBraList
      this.selBraList.forEach((item) => {
        this.saveArr.push(item.braID)
      })
    },
    cancelAss () {
      this.isHaveData = false
      this.isOpenAssociated = false
      this.selBraList = []
      this.saveArr = []
    },
    beforeCLoseChangeASS () {
      this.cancelChangeAss()
    },
    cancelChangeAss () {
      if (this.isHaveData) {
        this.isOpenAssociated = true
      }
      this.isHaveData = false
      this.isOpenChangeAss = false
      this.selBraList = []
      this.saveArr = []
    },
    submitAssociated () {

      const results = {
        brIDS: this.saveArr,
        bcID: this.formAssList.bcID
      }

      putAllBcl(results).then((res) => {
        res = res.data
        if (res.success === true) {
          this.isOpenAssociated = true
          this.isOpenChangeAss = false
          this.returnBraList = this.selBraList
          this.saveArr = []
          this.$message.success(res.msgStr)
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
        } else { return; }
      })
    }
  },
  mounted () {
    this.getBranchCluster()
    this.getBranch()
  }
}
</script>

<style lang="scss">
.form_wrapper {
  padding: 10px 40px;
  background: #fff;
  border-radius: 15px;
  box-sizing: border-box;
}
.el-autocomplete {
  display: block;
  margin-bottom: 10px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .branchname {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .address {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>