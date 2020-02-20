<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :pageSize="10"
      :current-page.sync="currentPage"
      @current-change="getRuneList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "runeList",
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
    this.getRuneList();
  },
  methods: {
    //获取铭文列表
    getRuneList() {
      let url = "rest/rune";
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
      this.$router.push(`/rune/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let url = `rest/rune/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getRuneList();
        });
      });
    }
  }
};
</script>
