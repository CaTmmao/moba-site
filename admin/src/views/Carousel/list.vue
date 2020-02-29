<template>
  <div class="container">
    <el-table stripe border :data="list" style="width: 100%">
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
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row._id)">删除</el-button>
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
          res.data.code === 1 && this.getCarouselList();
        });
      });
    }
  }
};
</script>

