<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="username" label="管理员"></el-table-column>
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
  name: "adminList",
  data() {
    return {
      //管理员列表
      list: []
    };
  },
  created() {
    this.getAdmin();
  },
  methods: {
    //获取管理员列表
    getAdmin() {
      let url = "rest/admin";
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.list = data;
        }
      });
    },
    //编辑
    edit(id) {
      this.$router.push(`/admin/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/admin/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getAdmin();
        });
      });
    }
  }
};
</script>