<template>
  <div class="editor">
    <div ref="toolbar"
         class="toolbar">
    </div>
    <div ref="editor"
         class="text">
    </div>
  </div>
</template>

<script>
/**
 * @description [父组件需定义一个(chang)监听事件来获取内容，例如@chang="getInfo" getInfo(info){console.log(info)}";
 * 该组件使用了plupload组件上传文件到阿里OSS的功能，如需变更阿里OSS配置，直接到baseconfig修改；
 * 该组件扩展了“查看源代码”和“全屏”功能，如需扩展可参考，由于没有使用jQuery框架，所以需要用原生JS语句]
 */
import E from 'wangeditor'
import { UPLOADER } from '@/components/publicComponents/wangEditor/weUploader'

export default {
  name: 'editorDiv',
  data: function () {
    return {
      editor: null,
      info_: null,
      UPLOADER
    }
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /**
     * @description [默认绑定内容]
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * @description [是否允许本地上传，默认不允许]
     */
    isUpload: {
      type: Boolean,
      default: false
    },
    /**
     * @description [是否允许全屏]
     */
    isFullEditor: {
      type: Boolean,
      default: false
    },
    /**
   * @description [是否查看源码]
   */
    isViewSource: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value (val) {
      //console.log("开始检测绑定值-------")
      // 使用 v-model 时,设置初始值
      this.editor.txt.html(val)
    },
  },
  mounted () {
    this.seteditor();
    if (this.isUpload)
      this.editor.config.customUploadInit = this.UPLOADER(this.editor).init();//配置文件上传
  },
  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        //'quote', // 引用
        //'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        'code', // 插入代码
        //'undo', // 撤销
        //'redo', // 重复
      ]

      this.editor.customConfig.onchange = html => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中，父组件定义一个@chang监听事件

      }

      // 创建富文本编辑器
      this.editor.create();
      if (this.isFullEditor)
        this.bingFullEditor(this.editor)
      if (this.isViewSource)
        this.bingViewSource(this.editor);
    },
    bingViewSource (editor) {//扩展源代码按钮          
      toolbar = editor.$toolbarElem[0];
      var vDiv = document.createElement("div");
      vDiv.className = 'w-e-menu btn_viewSource';
      vDiv.title = "切换源代码或视图";
      vDiv.innerHTML = "源";
      vDiv.onclick = function () {
        editor.isHTML = !editor.isHTML;
        let _source = editor.txt.html();
        if (editor.isHTML) {
          _source = _source.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;");
          this.innerHTML = "视";
        }
        else {
          _source = editor.txt.text().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ");
          this.innerHTML = "源";
          editor.change && editor.change();
        }
        editor.txt.html(_source);
      };
      toolbar.appendChild(vDiv);
      //console.log(this.$refs.toolbar)
    },
    bingFullEditor (editor) {//扩展全屏按钮
      toolbar = editor.$toolbarElem[0];
      var fDiv = document.createElement("div");
      fDiv.className = 'w-e-menu btn_fullscreen';
      fDiv.innerHTML = "全屏";
      fDiv.onclick = function () {
        var editDiv = editor.toolbarSelector.parentNode;
        if (fDiv.innerHTML == "全屏") {
          editDiv.className = ("fullscreen-editor");
          fDiv.innerHTML = "退出全屏";
        }
        else {
          editDiv.className = ("editor");
          fDiv.innerHTML = "全屏";
        }
      }
      toolbar.appendChild(fDiv);
    }
  }
}
</script>

<style lang="scss">
@import "./wangEditorEx.scss";
</style>
