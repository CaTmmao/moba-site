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
        parent: '',
        name: ''
      },
      //上级分类
      parents: []
    };
  },
  created() {
    this.getParents()
    
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //初始化上级分类
    async getParents() {
      let res = await this.$.get(`rest/category`);
      this.parents = res.data;
    },
    //获取分类信息
    async getInfo() {
      let res = await this.$.get(`rest/category/${this.id}`);
      this.info = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/category/${this.id}`, this.info);
      } else {
        await this.$.post("rest/category", this.info);
      }
      this.$router.push("/category/list");
    }
  }
};
</script>