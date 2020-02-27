<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="article.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <tinymce v-model="article.body" :defaultContent="article.body" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本编辑器
import Tinymce from "./components/Tinymce";

export default {
  name: "articleCreate",
  props: {
    id: {}
  },
  components: {
    Tinymce
  },
  data() {
    return {
      //文章信息
      article: {
        title: "",
        body: "",
        categories: []
      },
      //文章分类
      categories: []
    };
  },
  created() {
    this.getCategories();

    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取文章信息
    getInfo() {
      let url = `rest/article/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.article = data;
        }
      });
    },
    //获取文章分类
    getCategories() {
      let url = "rest/category/category/subList?parentName=新闻资讯";
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.categories = data;
        }
      });
    },
    //保存文章
    save() {
      let { id, article } = this;
      let url = 'rest/article';
      let method;
      let data = info

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
        if (res.data.code === 1) {
          this.$router.push("/article/list");
        }
      });
    }
  }
};
</script>