<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="info.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categoryCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info: {
        parent: "",
        name: ""
      },
      //上级分类
      parents: []
    };
  },
  created() {
    this.getParents();

    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //初始化上级分类
    getParents() {
      let url = "rest/category";
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.parents = data;
        }
      });
    },
    //获取分类信息
    getInfo() {
      let url = `rest/category/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.info = data;
        }
      });
    },
    //保存
    save() {
      let { id, info } = this;
      let url = "rest/category";
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
        res.data.code === 1 && this.$router.push("/category/list");
      });
    }
  }
};
</script>