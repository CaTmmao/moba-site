<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="icon" label="头像">
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
  name: "heroList",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getHeroList();
  },
  methods: {
    //获取英雄列表
    async getHeroList() {
      let res = await this.$.get("rest/hero");
      this.list = res.data;
    },
    //编辑
    edit(id) {
      this.$router.push(`/hero/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$.delete(`rest/hero/${id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getHeroList();
      });
    }
  }
};
</script>
