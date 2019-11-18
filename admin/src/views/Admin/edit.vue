<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="info.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "adminCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info: {
        //用户名
        username: "",
        //密码
        password: ""
      }
    };
  },
  created() {
    //&&代表满足前面的条件之后才执行后面的函数
    this.id && this.getInfo();
  },
  methods: {
    //获取管理员信息
    async getInfo() {
      let res = await this.$.get(`rest/admin/${this.id}`);
      this.info = res.data;
    },
    async save() {
      if (this.id) {
        await this.$.put(`rest/admin/${this.id}`, this.info);
      } else {
        await this.$.post("rest/admin", this.info);
      }
      this.$router.push("/admin/list");
    }
  }
};
</script>