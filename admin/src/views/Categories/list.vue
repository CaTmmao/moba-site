<template>
  <div class="container">
    <el-table
      stripe
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :data="list"
      row-key="_id"
      style="width: 100%"
    >
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="350px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :pageSize="10"
      :current-page.sync="currentPage"
      @current-change="getCategoryList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "categoryList",
  data() {
    return {
      list: [],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    /**
     * 获取分类列表
     */
    getCategoryList() {
      let url = `rest/category/category/treeList?page=${this.currentPage}&parentName=新闻资讯`;
      this.$.get(url).then(res => {
        let { code, data, totalCount } = res.data;
        if (code === 1) {
          this.list = data;
          this.total = totalCount;
        }
      });
    },
    //编辑
    edit(id) {
      this.$router.push(`/category/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除该分类吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let url = `rest/category/delet/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getCategoryList();
        });
      });
    }
  }
};
</script>