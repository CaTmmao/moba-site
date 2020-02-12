<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="info.name"></el-input>
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
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "itemCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info: {
        name: "",
        icon: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取物品信息
    async getInfo() {
      let url = `rest/item/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.info = data;
        }
      });
    },
    //保存信息
    async save() {
      let { id, info } = this;
      let url = "rest/item";
      let method;

      if (id) {
        url = `${url}/${id}`;
        method = "put";
      } else {
        method = "post";
      }

      this.$({
        url,
        method,
        info
      }).then(res => {
        res.code === 1 && this.$router.push("/item/list");
      });
    },
    //图片上传完成
    uploadSuccess(res) {
      this.info.icon = res.url;
    }
  }
};
</script>