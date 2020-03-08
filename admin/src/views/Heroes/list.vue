<template>
  <div class="container">
    <div>
      <div class="flex jc-between">
        <el-button type="danger" icon="el-icon-close" @click="delMultiple">删除</el-button>
        <div class="flex jc-end">
          <el-col :span="12" class="mr-d2">
            <el-input
              @keyup.native.enter="searchHero(searchName)"
              placeholder="英雄名称"
              clearable
              v-model.trim="searchName"
            ></el-input>
          </el-col>
          <el-button type="primary" icon="el-icon-search" @click="searchHero(searchName)">搜索</el-button>
        </div>
      </div>
      <el-tag>
        当前英雄共计
        <strong>{{total}}</strong> 个
      </el-tag>
      <el-table @selection-change="getCheckedItems" stripe border :data="list" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
        <el-table-column prop="icon" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:50px" />
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
      currentPage: 1,
      // 搜索内容
      searchName: "",
      // 已勾选文章的 id 集合
      CheckedIds: []
    };
  },
  created() {
    this.getHeroList();
  },
  methods: {
    //批量删除
    delMultiple() {
      this.$confirm("确认批量删除已选项吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = "rest/hero/deleteMany";
        this.$.delete(url, { data: { ids: this.CheckedIds } }).then(res => {
          res.data.code === 1 && this.getHeroList();
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
        let url = `rest/hero/delet/${id}`;

        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getHeroList();
        });
      });
    },
    /**
     * 搜索
     * @param {string} name 铭文名称
     */
    searchHero(name) {
      if (!name) {
        this.getHeroList();
        return;
      }

      let url = `rest/hero/search?name=${name}`;
      this.$.get(url).then(res => {
        let { code, data, total } = res.data;
        if (code === 1) {
          this.total = total;
          this.list = data;
        }
      });
    }
  }
};
</script>
