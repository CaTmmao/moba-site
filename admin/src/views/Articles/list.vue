<template>
  <div class="container">
    <div>
      <el-tag>
        已发布文章共计
        <strong>{{total}}</strong> 篇
      </el-tag>
      <el-table stripe border :data="articleList" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column fixed="right" label="操作" width="350px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.row._id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :pageSize="10"
      :current-page.sync="currentPage"
      @current-change="getArticleList"
    ></el-pagination>
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
          title: "",
          body: "",
          categories: []
        }
      ],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    //获取文章列表
    getArticleList() {
      let url = "rest/article";
      this.$.get(url).then(res => {
        let { code, data, totalCount } = res.data;
        if (code === 1) {
          this.articleList = data;
          this.total = totalCount;
        }
      });
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
      }).then(() => {
        let url = `rest/article/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getArticleList();
        });
      });
    }
  }
};
</script>
