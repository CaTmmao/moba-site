<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      let res = await this.$.get("category");
      this.list = res.data;
    },
    //编辑
    edit(id) {
      this.$router.push(`/category/edit/${id}`);
    }
  }
};
</script>

<style scoped lang="scss">
</style>