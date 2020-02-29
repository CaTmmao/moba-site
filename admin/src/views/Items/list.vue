<template>
  <div class="container">
    <div>
      <el-tag>
        当前物品共计
        <strong>{{total}}</strong> 个
      </el-tag>
      <el-table stripe border :data="list" style="width: 100%">
        <el-table-column prop="name" label="物品名称" width="200"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" class="width-55" />
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
      @current-change="getItemsList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "itemList",
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
    this.getItemsList();
  },
  methods: {
    //获取物品列表
    getItemsList() {
      let url = `rest/item?page=${this.currentPage}`;
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
      this.$router.push(`/item/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/item/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getItemsList();
        });
      });
    }
  }
};
</script>