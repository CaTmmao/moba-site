<template>
  <div class="container">
    <div>
      <div class="flex jc-between">
        <el-button type="danger" icon="el-icon-close" @click="delMultiple">删除</el-button>
        <div class="flex jc-end">
          <el-col :span="12" class="mr-d2">
            <el-input
              @keyup.native.enter="searchArticle(searchTitle)"
              placeholder="文章标题"
              clearable
              v-model.trim="searchTitle"
            ></el-input>
          </el-col>
          <el-button type="primary" icon="el-icon-search" @click="searchArticle(searchTitle)">搜索</el-button>
        </div>
      </div>
      <el-tag>
        已发布文章共计
        <strong>{{total}}</strong> 篇
      </el-tag>
      <el-table
        stripe
        border
        :data="articleList"
        style="width: 100%"
        @selection-change="getCheckedItems"
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
      currentPage: 1,
      // 搜索内容
      searchTitle: "",
      // 已勾选文章的 id 集合
      CheckedIds: []
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
        let url = `rest/article/delet/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getArticleList();
        });
      });
    },
    //批量删除
    delMultiple() {
      this.$confirm("确认批量删除已选项吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = "rest/article/deleteMany";
        this.$.delete(url, { data: { ids: this.CheckedIds } }).then(res => {
          res.data.code === 1 && this.getArticleList();
        });
      });
    },
    //获取已勾选项
    getCheckedItems(data) {
      this.CheckedIds = [];
      data.forEach(item => {
        this.CheckedIds.push(item._id);
      });
    },
    /**
     * 搜索
     * @param {string} title 文章标题
     */
    searchArticle(title) {
      if (!title) {
        this.getArticleList();
        return;
      }

      let url = `rest/article/search?title=${title}`;
      this.$.get(url).then(res => {
        let { code, data, total } = res.data;
        if (code === 1) {
          this.total = total;
          this.articleList = data;
        }
      });
    }
  }
};
</script>
