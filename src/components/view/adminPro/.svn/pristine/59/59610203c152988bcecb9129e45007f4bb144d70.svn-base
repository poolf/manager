<template>
  <section class="form_wrapper">
    <h2>商品列表</h2>
    <el-col :span="24">
      <el-form :inline="true"
               :model="filter">
        <el-form-item>
          <el-select v-model="filter.conditionsValue"
                     placeholder="请选择">
            <el-option v-for="items in conditions"
                       :key="items.value"
                       :value="items.value"
                       :label="items.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.searchValue"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filter.proFlag"
                     placeholder="请选择">
            <el-option v-for="item in type"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">查询</el-button>
          <el-button @click="onRefresh">重置刷新</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="proList"
              highlight-current-row
              border
              stripe
              v-loading="proLoading">
      <el-table-column prop="pid"
                       label="编号"
                       min-width="10%"></el-table-column>
      <el-table-column prop="proName"
                       label="名称"></el-table-column>
      <el-table-column prop="proFlag"
                       label="状态"
                       align="center"
                       min-width="15%">
        <template v-slot="scope">
          <div v-show="returnFlag !== scope.$index">
            <span v-if="scope.row.proFlag === 1"
                  style="color: #67c23a;">上架<i class="el-icon-edit"
                 @click="isShowFlag(scope.$index)"></i>
            </span>
            <span v-else-if="scope.row.proFlag===2"
                  style="color: #909399;">下架<i class="el-icon-edit"
                 @click="isShowFlag(scope.$index)"></i>
            </span>
            <span v-else-if="scope.row.proFlag===3"
                  style="color: #409eff;">冻结<i class="el-icon-edit"
                 @click="isShowFlag(scope.$index)"></i>
            </span>
          </div>
          <el-select v-model="scope.row.proFlag"
                     v-show="returnFlag === scope.$index"
                     size="mini"
                     @blur="changeFlag(scope.row)">
            <el-option :value="1"
                       label="上架"></el-option>
            <el-option :value="2"
                       label="下架"></el-option>
            <el-option :value="3"
                       label="冻结"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="proPrice"
                       label="总部价"
                       align="center"
                       min-width="15%">
        <template v-slot="scope">
          <span v-show="returnPrice !== scope.$index">
            {{scope.row.proPrice}}
            <i class="el-icon-edit"
               @click="isShowPrice(scope.$index)"></i>
          </span>
          <div v-show="returnPrice === scope.$index"
               class="priceInput">
            <el-input v-model="scope.row.proPrice"
                      size="mini"></el-input>
            <el-button icon="el-icon-check"
                       size="mini"
                       circle
                       @click="changePrice(scope.row)"></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot="scope">
          <el-tooltip class="item"
                      effect="dark"
                      content="变更上下架时间"
                      placement="top">
            <el-button size="mini"
                       type="primary"
                       plain
                       icon="el-icon-timer"
                       @click="editSaleTime(scope.row)"></el-button>
          </el-tooltip>
          <el-button size="mini"
                     @click="editPro">编辑</el-button>
          <el-button size="mini"
                     @click="delPro(scope.$index, scope.row)"
                     type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_block">
      <el-pagination :page-size="pageSize"
                     :current-page.sync="currentPage"
                     :total="totalCount"
                     layout="total, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog title="变更上下架时间"
               :visible.sync="isShowTime"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <el-form :model="form"
               label-width="100px">
        <el-form-item label="上架时间">
          <el-date-picker v-model="form.saleBeginTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="下架时间">
          <el-date-picker v-model="form.saleEndTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isShowTime=false">取消</el-button>
        <el-button type="primary"
                   @click="editTime">确认</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { addProduct, getProductPage, putProSaleTime, putProPrice, putProFlag, putPro } from '@/api/api'
const proPageList = {
  pageIndex: '',
  pageSize: '',
  orderby: 'clsID desc',
  whereStr: []
}
export default {
  data () {
    return {
      conditions: [{ value: 'proName', label: '商品名称' }, { value: 'erpPid', label: '系统商品编号' }, { value: 'mnemonic', label: '助记码' }, { value: 'proBarcode', label: '条形码' }],
      type: [{ value: '1', label: '上架' }, { value: '2', label: '下架' }, { value: '3', label: '冻结' }],
      filter: {
        conditionsValue: '',
        seachValue: '',
        proFlag: ''
      },
      proLoading: false,
      proList: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 50,
      showFlag: '',
      showPrice: '',
      isShowTime: false,
      form: {
        pid: '',
        saleBeginTime: '',
        saleEndTime: ''
      }
    }
  },
  computed: {
    returnFlag () { return this.showFlag },
    returnPrice () { return this.showPrice }
  },
  methods: {
    getPage () {
      proPageList.pageIndex = this.currentPage
      proPageList.pageSize = this.pageSize
      this.proLoading = true

      getProductPage(proPageList).then(res => {
        res = res.data
        if (res.success === true) {
          //this.$message.success(res.msgStr)
          this.proList = res.returnData
          this.proLoading = false
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
        } else { return; }
      })
    },
    onSearch () { },
    onRefresh () { },
    dateFormat (date) {
      const dateStr = date.split('T')[0]
      const timeStr = date.split('T')[1].split('.')[0]
      return dateStr + ' ' + timeStr
    },
    editSaleTime (row) {
      this.isShowTime = true
      this.form = {
        pid: row.pid,
        saleBeginTime: this.dateFormat(row.saleBeginTime),
        saleEndTime: this.dateFormat(row.saleEndTime)
      }
    },
    editTime () {
      putProSaleTime(this.form).then(res => {
        res = res.data
        if (res.success === true) {
          this.$message.success(res.msgStr)
          this.isShowTime = false
          this.getPage()
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
        } else { return; }
      })
    },
    isShowFlag (index) {
      this.showFlag = index
    },
    changeFlag (row) {
      const n_data = {
        pid: row.pid,
        proFlag: row.proFlag
      }
      putProFlag(n_data).then(res => {
        res = res.data
        if (res.success === true) {
          this.$message.success(res.msgStr)
          this.showFlag = ''
          this.getPage()
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
        } else { return; }
      })
    },
    isShowPrice (index) {
      this.showPrice = index
    },
    changePrice (row) {
      const n_data = {
        pid: row.pid,
        proPrice: row.proPrice
      }
      putProPrice(n_data).then(res => {
        res = res.data
        if (res.success === true) {
          this.$message.success(res.msgStr)
          this.showPrice = ''
          this.getPage()
        } else if (res.success === false) {
          this.$message.error(res.msgStr)
        } else { return; }
      })
    },
    editPro () { },
    delPro (index, row) {
      this.$confirm('确认删除该记录吗？', '提示', { type: 'warning' }).then(() => {
        const n_data = {
          pid: row.pid,
          proFlag: 0
        }
        putProFlag(n_data).then(res => {
          res = res.data
          if (res.success === true) {
            this.$message.success('商品已删除成功')
            this.getPage()
          } else if (res.success === false) {
            this.$message.error(res.msgStr)
          } else { return; }
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getPage()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getPage()
    }
  },
  mounted () {
    this.getPage()
  }
}
</script>
<style lang="scss" scope>
.form_wrapper {
  padding: 10px 40px;
  background: #fff;
  border-radius: 15px;
  box-sizing: border-box;
  .el-icon-edit {
    cursor: pointer;
  }
  .priceInput {
    .el-input {
      width: 64px;
    }
  }
}
</style>
