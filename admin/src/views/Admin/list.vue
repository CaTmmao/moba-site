<template>
  <div class="container">
    <div>
      <div class="flex jc-end">
        <el-col :span="4" class="mr-d2">
          <el-input
            placeholder="管理员姓名"
            @keyup.native.enter="searchAdmin(searchName)"
            clearable
            size="middle"
            v-model.trim="searchName"
          ></el-input>
        </el-col>
        <el-button type="primary" icon="el-icon-search" @click="searchAdmin(searchName)">搜索</el-button>
      </div>
      <el-tag>
        当前终端用户共计
        <strong>{{list.length}}</strong> 人
      </el-tag>

      <el-table stripe border :data="list" style="width: 100%">
        <el-table-column prop="name" label="用户名" width="200"></el-table-column>
        <el-table-column prop="createdAt" label="注册时间" width="200">
          <template slot-scope="scope">
            <p>{{scope.row.createdAt | dealDate}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
      @current-change="getAdmin"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "adminList",
  data() {
    return {
      //管理员列表
      list: [],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 搜索内容
      searchName: ""
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
        let { code, data, totalCount } = res.data;
        if (code === 1) {
          this.list = data;
          this.total = totalCount;
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
        let url = `rest/admin/delet/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getAdmin();
        });
      });
    },
    /**
     * 搜索
     * @param {string} name 管理员姓名
     */
    searchAdmin(name) {
      if (!name) {
        this.getAdmin();
        return;
      }

      let url = `rest/admin/search?name=${name}`;
      this.$.get(url).then(res => {
        let { code, data, total } = res.data;
        if (code === 1) {
          this.total = total;
          this.list = data;
        }
      });
    }
  },
  filters: {
    dealDate(date) {
      return date.split("T")[0];
    }
  }
};
</script>