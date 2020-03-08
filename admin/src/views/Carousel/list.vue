<template>
  <div class="container">
    <div>
      <div class="flex jc-start">
        <el-button type="danger" icon="el-icon-close" @click="delMultiple">删除</el-button>
      </div>
      <el-tag>
        当前轮播图共计
        <strong>{{total}}</strong> 个
      </el-tag>
      <el-table @selection-change="getCheckedItems" stripe border :data="list" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="path" label="跳转链接" width="200">
          <template slot-scope="scope">
            <a :href="scope.row.path" v-if="scope.row.path">跳转演示</a>
          </template>
        </el-table-column>
        <el-table-column prop="imgUrl" label="图片">
          <template slot-scope="scope">
            <img class="carousel-img width-350" :src="scope.row.imgUrl" />
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
  </div>
</template>

<script>
export default {
  name: "carouselList",
  data() {
    return {
      //首页轮播图列表
      list: [],
      total: 0,
      // 已勾选文章的 id 集合
      CheckedIds: []
    };
  },
  created() {
    this.getCarouselList();
  },
  methods: {
    //批量删除
    delMultiple() {
      this.$confirm("确认批量删除已选项吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = "rest/carousel/deleteMany";
        this.$.delete(url, { data: { ids: this.CheckedIds } }).then(res => {
          res.data.code === 1 && this.getCarouselList();
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
    //获取首页轮播图列表
    getCarouselList() {
      let url = "rest/carousel";

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
      this.$router.push(`/carousel/edit/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/carousel/delet/${id}`;
        this.$.delete(url).then(res => {
          res.data.code === 1 && this.getCarouselList();
        });
      });
    }
  }
};
</script>

