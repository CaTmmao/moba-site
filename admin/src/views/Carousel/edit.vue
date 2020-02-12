<template>
  <div class="container">
    <div class="carousel-container">
      <h1>{{id ? '编辑' : '新建'}}首页轮播图</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="跳转链接">
          <el-input v-model="carousel.path"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader carousel"
            :action="uploadUrl"
            :headers="getAuthorization()"
            :on-success="uploadSuccess"
            :show-file-list="false"
          >
            <img v-if="carousel.imgUrl" :src="carousel.imgUrl" class="width-100p height-100p" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
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
    getCarousel() {
      let url = `rest/carousel/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.carousel = res.data;
        }
      });
    },
    //保存
    save() {
      let { id, carousel } = this;
      let url = "rest/carousel";
      let method;

      if (id) {
        url = `${url}/${id}`;
        method = "put";
      } else {
        method = "post";
      }

      this.$({
        method,
        url,
        carousel
      }).then(res => {
        res.data.code === 1 && this.$router.push("/carousel/list");
      });
    },
    //图片上传完成
    uploadSuccess(res) {
      this.carousel.imgUrl = res.url;
    }
  }
};
</script>

<style lang="scss">
.carousel-container {
  .avatar-uploader .el-upload {
    width: 350px;
    height: 200px;
    border-radius: 0;
  }
  .avatar-uploader .el-upload:hover {
    width: 350px;
    height: 200px;
  }
  .avatar-uploader-icon {
    line-height: 200px;
  }

  .icon {
    width: 350px;
    height: 200px;
    width: 100%;
  }
}
</style>