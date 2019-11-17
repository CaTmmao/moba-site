<template>
  <div class="item-container">
    <h1>{{id ? '编辑' : '新建'}}首页轮播图</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="跳转链接">
        <el-input v-model="carousel.path"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="`${$.defaults.baseURL}upload`"
          :on-success="uploadSuccess"
          :show-file-list="false"
        >
          <img v-if="carousel.imgUrl" :src="carousel.imgUrl" class="icon" />
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
  name: "carouselCreate",
  props: {
    id: {}
  },
  data() {
    return {
      carousel: {
        //跳转链接
        path: "",
        //图片地址
        imgUrl: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getCarousel();
  },
  methods: {
    //获取首页轮播图信息
    async getCarousel() {
      let res = await this.$.get(`rest/carousel/${this.id}`);
      this.carousel = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/carousel/${this.id}`, this.carousel);
      } else {
        await this.$.post("rest/carousel", this.carousel);
      }
      this.$router.push("/carousel/list");
    },
    //图片上传完成
    uploadSuccess(res) {
      this.carousel.imgUrl = res.url;
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