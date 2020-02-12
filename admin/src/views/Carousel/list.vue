<template>
  <div class="main">
    <h1>首页轮播图列表</h1>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="path" label="跳转链接"></el-table-column>
      <el-table-column prop="imgUrl" label="图片">
        <template slot-scope="scope">
          <img class="carousel-img width-350" :src="scope.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "carouselList",
  data() {
    return {
      //首页轮播图列表
      list: []
    };
  },
  created() {
    this.getCarouselList();
  },
  methods: {
    //获取首页轮播图列表
    getCarouselList() {
      let url = "rest/carousel";

      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.list = data;
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
        let url = `rest/carousel/${id}`;
        this.$.delete(url).then(res => {
          res.code === 1 && this.getCarouselList();
        });
      });
    }
  }
};
</script>

