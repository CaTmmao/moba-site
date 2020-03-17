<template>
  <div class="container">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model.trim="info.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input show-password v-model.trim="info.password" placeholder="密码不会以明文显示，如需修改，直接输入内容保存"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model.trim="info.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let info = {
  //用户名
  name: "",
  //密码
  password: "",
  //备注
  remark: ""
};

export default {
  name: "adminCreate",
  props: {
    id: {}
  },
  data() {
    return {
      info
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.id) {
        this.getInfo();
      } else {
        this.info = JSON.parse(JSON.stringify(info));
      }
    },
    //获取管理员信息
    getInfo() {
      let url = `rest/admin/${this.id}`;
      this.$.get(url).then(res => {
        let { code, data } = res.data;
        if (code === 1) {
          this.info = data;
        }
      });
    },
    //保存信息
    save() {
      let { id, info } = this;
      let method;
      let url = "rest/admin";
      let data = info;

      if (id) {
        method = "put";
        url = `${url}/${id}`;
      } else {
        method = "post";
        url = "/register";
      }

      this.$({
        method,
        url,
        data
      }).then(res => {
        if (res.data.code === 1) {
          this.$router.push("/admin/list");
        }
      });
    }
  },
  watch: {
    $route: "init"
  }
};
</script>