<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "itemList",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getItemsList();
  },
  methods: {
    //获取物品列表
    async getItemsList() {
      let res = await this.$.get("rest/item");
      this.list = res.data;
    },
    //编辑
    edit(id) {
      this.$router.push(`/item/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除该分类吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$.delete(`rest/item/${id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getItemsList();
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>