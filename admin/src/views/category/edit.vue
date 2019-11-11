<template>
  <div>
    <h1>编辑分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
  name: "edit",
  props: {
    id: {}
  },
  data() {
    return {
      info: {}
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    async getInfo() {
      let res = await this.$.get(`/category/${this.id}`);
      this.info = res.data;
    },
    //保存更新
    save() {
      this.$.put(`/category/${this.id}`, this.info).then(res => {
        this.$router.push("/category/list");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>