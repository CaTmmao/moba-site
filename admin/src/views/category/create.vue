<template>
  <div>
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      model: {
        name: ""
      }
    };
  },
  methods: {
    async save() {
      let res = await this.$.post('category', this.model)
      console.log(res)
      this.$router.push('/category/list')
    }
  }
};
</script>

<style scoped lang="scss">
</style>