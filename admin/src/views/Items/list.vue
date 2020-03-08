<template>
  <div class="container">
    <div>
      <div class="flex jc-between">
        <el-button type="danger" icon="el-icon-close" @click="delMultiple">删除</el-button>
        <div class="flex jc-end">
          <el-col :span="12" class="mr-d2">
            <el-input
              @keyup.native.enter="searchItem(searchName)"
              placeholder="物品名称"
              clearable
              v-model.trim="searchName"
            ></el-input>
          </el-col>
          <el-button type="primary" icon="el-icon-search" @click="searchItem(searchName)">搜索</el-button>
        </div>
      </div>
      <el-tag>
        当前物品共计
        <strong>{{total}}</strong> 个
      </el-tag>
      <el-table @selection-change="getCheckedItems" stripe border :data="list" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
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
      currentPage: 1,
      // 搜索内容
      searchName: "",
      // 已勾选文章的 id 集合
      CheckedIds: []
    };
  },
  created() {
    this.getItemsList();
  },
  methods: {
    //批量删除
    delMultiple() {
      this.$confirm("确认批量删除已选项吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = "rest/item/deleteMany";
        this.$.delete(url, { data: { ids: this.CheckedIds } }).then(res => {
          res.data.code === 1 && this.getItemsList();
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
        let url = `rest/item/delet/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getItemsList();
        });
      });
    },
    /**
     * 搜索
     * @param {string} name 物品名称
     */
    searchItem(name) {
      if (!name) {
        this.getItemsList();
        return;
      }

      let url = `rest/item/search?name=${name}`;
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