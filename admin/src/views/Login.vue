<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="info.username" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password v-model="info.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      info: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录
    login() {
      let { username, password } = this.info;

      if (!username || !password) {
        this.$message.warning("请填写完整");
        return;
      }

      this.$.post("login", this.info).then(res => {
        const { code, token } = res.data;
        if (code === 1) {
          localStorage.token = token;
          this.$router.push("/");
        }
      });
    },
    //注册
    register() {
      let { info } = this;

      if (!info.username || !info.password) {
        this.$message.warning("请填写完整");
        return;
      }

      this.$.post("register", info).then(res => {
        res.data.code === 1 && this.$message.success("注册成功");
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  .login-card {
    margin: 6rem auto;
    width: 35rem;
  }
}
</style>