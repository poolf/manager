<template>
  <div class="proForm">
    <div class="proForm_wrapper">
      <h2>{{titleName}}</h2>
      <el-form ref="proForm"
               :model="proForm"
               :rules="rules"
               label-width="130px"
               :label-position="labelPosition">
        <el-form-item label="商品标识："
                      prop="proType">
          <el-radio-group v-model="proForm.proType">
            <el-radio :label="1">药品</el-radio>
            <el-radio :label="2">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统商品编号："
                      prop="erpPid">
          <el-input v-model="proForm.erpPid"
                    placeholder="请输入系统商品编号"></el-input>
        </el-form-item>
        <el-form-item label="类别编号："
                      prop="ClsId">
          <a-proCascader @clsparidChange="getclsparidChange($event)"
                         ref="cls"></a-proCascader>
          <el-input v-model="proForm.ClsId"
                    v-show="false"></el-input>
        </el-form-item>
        <el-form-item label="品牌编号："
                      prop="brandID">
          <el-input v-model="proForm.brandID"
                    placeholder="请输入品牌编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称："
                      prop="proName">
          <el-input v-model="proForm.proName"
                    v-on:input="getPYcode"
                    placeholder="请输入系统商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品标签："
                      prop="proTag">
          <el-input v-model="proForm.proTag"
                    placeholder="请输入商品标签"></el-input>
        </el-form-item>
        <el-form-item label="助记码："
                      prop="mnemonic">
          <el-input v-model="proForm.mnemonic"
                    v-on:input="getPYcode"
                    placeholder="请输入助记码"></el-input>
        </el-form-item>
        <el-form-item label="商品条形码："
                      prop="proBarcode">
          <el-input v-model="proForm.proBarcode"
                    placeholder="请输入商品条形码"></el-input>
        </el-form-item>
        <el-form-item label="产地："
                      prop="proArea">
          <el-input v-model="proForm.proArea"
                    placeholder="请输入产地"></el-input>
        </el-form-item>
        <el-form-item label="规格："
                      prop="proSize">
          <el-input v-model="proForm.proSize"
                    placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="总部价："
                      prop="proPrice">
          <el-input v-model="proForm.proPrice"
                    placeholder="请输入总部价"></el-input>
        </el-form-item>
        <el-form-item label="商业模板：">
          <div class="proTemplateList">
            <div v-for="(item, index) in tmpUrl"
                 :key="index"
                 class="proTemplateItem"
                 :class="resultNum === index?'sel':''"
                 @click="getTemp(item,index)">
              <img :src="item.url">
              <p>{{item.name}}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品描述："
                      prop="proDesc">
          <wangEditor :value="proForm.proDesc.val"
                      :isUpload=true
                      :isFullEditor=true
                      :isViewSource=true></wangEditor>
        </el-form-item>
        <el-form-item label="橱窗图："
                      prop="gallezyImg">
          <el-input v-model="proForm.gallezyImg"
                    placeholder="请输入橱窗图"></el-input>
        </el-form-item>
        <el-form-item label="图片组"
                      prop="pImgJson">
          <el-input v-model="proForm.pImgJson.val"></el-input>
          <upLoadFile :limitNum=4
                      :multipleB=true
                      :showFileList=true
                      :fileExtensionName="fileExName"
                      :isFileSize=2
                      :getFileJson.sync="proForm.pImgJson"
                      ref="fileImg"
                      butText="点击选择上传文件"
                      listType="picture-card"></upLoadFile>
        </el-form-item>
        <el-form-item label="商品状态："
                      prop="proFlag">
          <el-radio-group v-model="proForm.proFlag">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="2">下架</el-radio>
            <el-radio :label="3">冻结</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否处方药："
                      v-show="this.proForm.proType ===1"
                      prop="ethicalsFlag">
          <el-radio-group v-model="proForm.ethicalsFlag">
            <el-radio :label="0">不是处方药</el-radio>
            <el-radio :label="1">是处方药</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否医保品种："
                      v-show="this.proForm.proType ===1"
                      prop="policyFlag">
          <el-radio-group v-model="proForm.policyFlag">
            <el-radio :label="0">不是</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否包邮："
                      prop="mailFlag">
          <el-radio-group v-model="proForm.mailFlag">
            <el-radio :label="0">不包邮</el-radio>
            <el-radio :label="1">包邮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否限购："
                      prop="salesFlag">
          <el-radio-group v-model="proForm.salesFlag">
            <el-radio :label="0">不限购</el-radio>
            <el-radio :label="1">限购（与商品库存挂钩）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单件送积分："
                      prop="proCredit"
                      type="number">
          <el-input v-model.number="proForm.proCredit"
                    placeholder="请输入单件送积分"></el-input>
        </el-form-item>
        <el-form-item label="是否参与促销："
                      prop="promotionsFlag">
          <el-radio-group v-model="proForm.promotionsFlag">
            <el-radio :label="0">不参与</el-radio>
            <el-radio :label="1">参与</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上架日期："
                      prop="saleBeginTime">
          <el-date-picker v-model="proForm.saleBeginTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择上架日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下架日期："
                      prop="saleEndTime">
          <el-date-picker v-model="proForm.saleEndTime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择下架日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="SubmitFrom('proForm')">{{buttonStatus}}</el-button>
          <el-button @click="resetForm('proForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="proForm_preview">
      <div class="hd">
        <a class="btn act"
           @click="applyTemp">点击应用此模板（<font style="#c00">!!使用模板将替换原来数据</font>）</a>
        <a class="btn cls">关闭</a>
      </div>
      <div class="bd">
        <div class="con">
          <component :is="currentView"
                     ref="tempView"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import upLoadFile from "@/components/publicComponents/upLoadFile/upLoadFileByOss"
import wangEditor from "@/components/publicComponents/wangEditor/wangEditor"
import { addProduct } from "@/api/api.js"
import { makePy } from "../../../../publicComponents/mnemonicCode/initials"
import { constants } from 'fs';
import Vue from 'vue'
import { format } from 'util'

export default {
  components: {
    upLoadFile,
    wangEditor
  },
  data () {
    return {
      titleName: "商品添加",
      buttonStatus: '',
      labelPosition: "right",
      fileExName: ['jpg', 'gif', 'png'],
      proForm: {
        erpPid: '',
        ClsId: '',
        brandID: '',
        proName: '',
        mnemonic: '',
        proBarcode: '',
        proArea: '',
        proSize: '',
        proPrice: '',
        proDesc: { val: '' },
        gallezyImg: '',
        pImgJson: { val: '' },
        proFlag: '',
        proType: '',
        proTag: '',
        ethicalsFlag: 0,
        policyFlag: 0,
        mailFlag: '',
        salesFlag: '',
        proCredit: '',
        promotionsFlag: '',
        saleBeginTime: '',
        saleEndTime: ''
      },
      tmpUrl: [
        { name: '通用', url: require('../images/T-icon/1.jpg'), templateName: 'Template0' }
      ],
      rules: {
        erpPid: [{ required: true, message: '系统商品编号不能为空', trigger: 'blur' }],
        //ClsId: [{ required: true, message: '类别编号不能为空', trigger: 'blur' }],
        //brandID: [{ required: true, message: '品牌编号不能为空', trigger: 'blur' }],
        proName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        // mnemonic: [{ required: true, message: '助记码不能为空', trigger: 'blur' }],
        // proBarcode: [{ required: true, message: '商品条形码不能为空', trigger: 'blur' }],
        // proArea: [{ required: true, message: '产地不能为空', trigger: 'blur' }],
        // proSize: [{ required: true, message: '规格不能为空', trigger: 'blur' }],
        proPrice: [
          { required: true, message: '请填写价格，最大8位数，保留两位小数点' },
          { pattern: /^\d{1,8}(\.\d{1,2})?$/, message: '必须为数字，最大8位数，精确两位小数点' }
        ],
        //proDesc: [{ required: true, message: '商品描述不能为空', trigger: 'blur' }],
        gallezyImg: [{ required: true, message: '橱窗图不能为空', trigger: 'blur' }],
        //pImgJson: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        proFlag: [{ required: true, message: '请选择商品状态', trigger: 'blur' }],
        proType: [{ required: true, message: '请选择', trigger: 'blur' }],
        //proTag: [{ required: true, message: '请输入', trigger: 'blur' }],
        ethicalsFlag: [{ required: true, message: '请选择是否为处方药', trigger: 'blur' }],
        policyFlag: [{ required: true, message: '请选择是否医保品种', trigger: 'blur' }],
        mailFlag: [{ required: true, message: '请选择是否包邮', trigger: 'blur' }],
        salesFlag: [{ required: true, message: '请选择是否限购', trigger: 'blur' }],
        proCredit: [{ required: true, message: '单选送积分不能为空', trigger: 'change' }, { type: 'number', message: '只能输入数字', trigger: 'blur' }],
        promotionsFlag: [{ required: true, message: '请选择是否参与促销', trigger: 'blur' }],
        saleBeginTime: [{ required: true, message: '请选择上架日期', trigger: 'blur' }],
        saleEndTime: [{ required: true, message: '请选择下架日期', trigger: 'blur' }]
      },
      tmpNum: '',
      currentView: ''
    }
  },
  mounted () {
    this.showContent()
    this.createTmpUrl()
  },
  computed: {
    resultNum () { return this.tmpNum }
  },
  methods: {
    createTmpUrl () {//生成模板数据
      for (var i = 1; i <= 68; i++) {
        this.tmpUrl.push({
          name: "模板" + i, url: require("../images/T-icon/" + i + ".jpg")
        })
      }
    },
    getPYcode () {//助记码转换
      const cname = this.proForm.proName
      const getname = makePy(cname)[0]
      this.proForm.mnemonic = getname
    },
    getTemp (item, index) {
      this.tmpNum = index;
      import(`../templates/template${index}.vue`).then(res => {
        Vue.component(`template${index}`, res.default)
        this.currentView = `template${index}`
      })
    },
    applyTemp () {
      const temp = this.$refs.tempView.$el
      const newTemp = temp.cloneNode(true)

      let tmpNode = document.createElement("div")
      tmpNode.appendChild(newTemp)
      const strHtml = tmpNode.innerHTML
      tmpNode = null

      this.proForm.proDesc.val = strHtml
    },
    getclsparidChange (msg) {
      this.proForm.ClsId = msg
    },
    showContent () {
      var formStatus = this.formStatus
      if (formStatus === 0) {
        this.titleName = "商品信息添加"
        this.buttonStatus = "立即创建"
      }
      if (formStatus === 1) {
        this.titleName = "商品信息修改"
        this.buttonStatus = "提交修改"
      }
    },
    SubmitFrom (formname) {
      this.$refs[formname].validate((valid) => {
        //console.log(valid);
        var formStatus = this.formStatus
        if (valid) {
          if (formStatus === 0) {
            let postList = {
              "erpPid": this.proForm.erpPid,
              "ClsId": this.proForm.ClsId,
              "brandID": this.proForm.brandID,
              "proName": this.proForm.proName,
              "mnemonic": this.proForm.mnemonic,
              "proBarcode": this.proForm.mnemonic,
              "proArea": this.proForm.proArea,
              "proSize": this.proForm.proSize,
              "proPrice": this.proForm.proPrice,
              "proDesc": this.proForm.proDesc.val,
              "gallezyImg": this.proForm.gallezyImg,
              "pImgJson": this.proForm.pImgJson.val,
              "proFlag": this.proForm.proFlag,
              "proType": this.proForm.proType,
              "proTag": this.proForm.proTag,
              "ethicalsFlag": this.proForm.ethicalsFlag,
              "policyFlag": this.proForm.policyFlag,
              "mailFlag": this.proForm.mailFlag,
              "salesFlag": this.proForm.salesFlag,
              "proCredit": this.proForm.proCredit,
              "promotionsFlag": this.proForm.promotionsFlag,
              "saleBeginTime": this.proForm.saleBeginTime,
              "saleEndTime": this.proForm.saleEndTime
            }
            addProduct(postList).then(res => {
              res = res.data
              if (res.success === true) {
                console.info(res.returnData)
                this.$message.success(res.msgStr)
                this.$router.push({
                  path: '/adminProList'
                })
              } else if (res.success === false) {
                this.$message.error(res.msgStr)
                console.table(res.returnData)
              } else { return; }
            })
            //console.info(postList)
            //console.table(postList)
          }
          if (formStatus === 1) {
            console.log('submit')
          }
        } else {
          //console.log('error')
          this.$message.error('数据校验不通过')
          return false
        }
      })
    },
    resetForm () { }
  },
  props: ['formStatus']
}
</script>
<style lang="scss">
@import "./adminProForm";
</style>
