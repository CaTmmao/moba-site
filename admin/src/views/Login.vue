<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="info.username" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="info.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
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
        const { code } = res.data;
        if (code === 1) {
          const { token } = res.data;
          localStorage.token = token;
          this.$message.success("登录成功");
          this.$router.push("/");
        }
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