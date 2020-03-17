<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}铭文</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model.trim="info.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :show-file-list="false"
          :headers="getAuthorization()"
        >
          <img v-if="info.icon" :src="info.icon" class="icon" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button type="text" @click="addDesc">
        <i class="el-icon-plus"></i> 添加描述
      </el-button>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col style="margin-top: 20px;" :md="12" v-for="(item, index) in info.desc" :key="index">
          <el-form-item label="描述">
            <el-input v-model.trim="item.text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="delDesc(index)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let info = {
  //铭文名称
  name: "",
  //图标
  icon: "",
  //描述
  desc: []
};

export default {
  name: "runeCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.id) {
        this.getInfo();
      } else {
        this.info = JSON.parse(JSON.stringify(info));
      }
    },
    //获取铭文信息
    getInfo() {
      let url = `rest/rune/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.info = data;
        }
      });
    },
    //保存信息
    save() {
      let { id, info } = this;
      let url = "rest/rune";
      let method;
      let data = info;

      if (id) {
        url = `${url}/${id}`;
        method = "put";
      } else {
        method = "post";
      }

      this.$({
        url,
        method,
        data
      }).then(res => {
        res.data.code === 1 && this.$router.push("/rune/list");
      });
    },
    //图片上传完成
    uploadSuccess(res) {
      let { code, data } = res;
      if (code === 1) {
        this.info.icon = data;
      }
    },
    //添加描述
    addDesc() {
      this.info.desc.push({});
    },
    /**
     * 删除描述
     * @param {number} index 删除对象所在索引
     */
    delDesc(index) {
      this.$confirm("请确认是否删除？", "提示", {
        type: "error"
      }).then(() => {
        this.info.desc.splice(index, 1);
      });
    }
  },
  watch: {
    $route: "init"
  }
};
</script>