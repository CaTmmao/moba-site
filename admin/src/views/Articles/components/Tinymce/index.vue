<template>
  <div class="tinymce-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <el-upload
        :action="$route.path"
        :auto-upload="false"
        :on-change="insertImg"
        :show-file-list="false"
      >
        <el-button icon="el-icon-upload" size="mini" type="primary">上传图片</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
// 引入富文本编辑器的插件
import plugins from "./plugins";
// tinymce 的工具栏配置
import toolbar from "./toolbar";
// tinymce 动态引入 script 元素
import load from "./dynamicLoadScript";

// 富文本编辑器库的 cdn 地址
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

export default {
  name: "Tinymce",
  props: {
    // 编辑器默认内容
    defaultContent: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      // 编辑器元素的 id
      tinymceId: `vue-tinymce-${new Date().getTime()}`
    };
  },
  watch: {
    defaultContent(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => this.setContent(val || ""));
      }
    }
  },
  mounted() {
    this.init();
  },
  // keep-alive 组件激活时调用。
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  // keep-alive 组件停用时调用。
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    /**
     * 插入图片
     * @params {obj} file 图片文件
     */
    insertImg(file) {
      // 获取图片地址
      let data = new FormData();
      data.append("file", file.raw);
      this.$.post("upload", data).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          // 图片插入到富文本编辑器中
          window.tinymce
            .get(this.tinymceId)
            .insertContent(`<img class="wscnph" src="${data}" >`);
        }
      });
    },
    init() {
      // 通过 cdn 地址动态引入 tinymce 库
      load(tinymceCDN, err => {
        if (err) {
          this.$message.error(err);
          return;
        }

        this.initTinymce();
      });
    },
    /**
     * 编辑器配置
     * 更多配置见https://www.tiny.cloud/docs/
     */
    initTinymce() {
      window.tinymce.init({
        // 代表编辑器的选择器
        selector: `#${this.tinymceId}`,
        // 调整编辑器大小
        resize: "both",
        // 语言
        language: "zh_CN",
        // 高度
        height: "400",
        // 工具栏
        toolbar: toolbar,
        // 需要加载的插件
        plugins: plugins,
        // 自定义菜单
        menubar: "file edit insert view format table",
        // 隐藏编辑器左下角的元素路径
        elementpath: false,
        // 隐藏右下角技术支持
        branding: false,
        // 字体
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
        // 从微软 word 软件中复制过来的内容采用哪种格式
        powerpaste_word_import: "clean",
        // 无序列表样式
        advlist_bullet_styles: "square",
        // 有序列表样式
        advlist_number_styles: "default",
        // 和 a 元素中的 target 属性作用一样
        default_link_target: "_blank",
        nonbreaking_force_tab: true,
        /**
         * 初始化结束后执行
         * @param {object} editor 编辑器实例对象
         */
        init_instance_callback: editor => {
          
          let { defaultContent } = this;
          // 有默认值
          if (defaultContent) {
            console.log(defaultContent);

            // 内容插入到编辑器中
            editor.setContent(defaultContent);
          }

          this.hasInit = true;
          //
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        }
      });
    },
    // 销毁 tinymce
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (tinymce) {
        tinymce.destroy();
      }
    },
    // 设置编辑器的内容
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    }
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
</style>
