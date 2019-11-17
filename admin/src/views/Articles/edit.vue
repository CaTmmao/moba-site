<template>
  <div class="item-container">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "articleCreate",
  props: {
    id: {}
  },
  data() {
    return {
      //文章信息
      article: {
        title: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取文章信息
    async getInfo() {
      let res = await this.$.get(`rest/article/${this.id}`);
      this.info = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/article/${this.id}`, this.info);
      } else {
        await this.$.post("rest/article", this.info);
      }
      this.$router.push("/article/list");
    }
  }
};
</script>

<style lang="scss">
.item-container {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>