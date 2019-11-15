<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="info.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit",
  props: {
    id: {}
  },
  data() {
    return {
      info: {
        name: "",
        icon: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取分类信息
    async getInfo() {
      let res = await this.$.get(`rest/item/${this.id}`);
      this.info = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/item/${this.id}`, this.info);
      } else {
        await this.$.post("rest/item", this.info);
      }
      this.$router.push("/item/list");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>