<template>
  <div class="container">
    <div>
      <el-tag>
        当前英雄共计
        <strong>{{total}}</strong> 个
      </el-tag>
      <el-table stripe border :data="list" style="width: 100%">
        <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
        <el-table-column prop="icon" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" />
          </template>
        </el-table-column>
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
      @current-change="getHeroList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "heroList",
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
    this.getHeroList();
  },
  methods: {
    //获取英雄列表
    getHeroList() {
      let url = "rest/hero";

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
      this.$router.push(`/hero/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/hero/${id}`;

        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getHeroList();
        });
      });
    }
  }
};
</script>
