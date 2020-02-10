<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
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
  name: "articleList",
  data() {
    return {
      //文章列表
      articleList: [
        {
          title: '',
          body: '',
          categories: []
        }
      ]
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    //获取文章列表
    async getArticleList() {
      let res = await this.$.get("rest/article");
      this.articleList = res.data;
      console.log(this.articleList)
    },
    //编辑
    edit(id) {
      this.$router.push(`/article/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$.delete(`rest/article/${id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getArticleList();
      });
    }
  }
};
</script>
