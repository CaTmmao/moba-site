<template>
  <div class="login-container">
    <div class="login text-white">
      <h3 class="title flex jc-center">王者荣耀后台</h3>
      <el-input v-model.trim="info.name" placeholder="账号" />
      <el-input show-password v-model.trim="info.password" placeholder="密码" @keyup.enter.native="login" />

      <div class="login-btn">
        <el-button v-if="!ifCanLogin" title="填写完整再提交" type="primary" disabled class="width-100p">登录</el-button>
        <el-button
          v-else
          :loading="loading"
          type="primary"
          class="width-100p"
          @click.native.prevent="login"
        >登录</el-button>
      </div>

      <div class="tips">账号未注册时会自动注册</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      info: {
        name: "",
        password: ""
      },
      loading: false
    };
  },
  computed: {
    // 是否可以登录
    ifCanLogin() {
      let { name, password } = this.info;
      return name && password;
    }
  },
  methods: {
    //登录
    login() {
      this.loading = true;
      this.$.post("login", this.info).then(res => {
        this.loading = false;
        const { code, token } = res.data;
        if (code === 1) {
          localStorage.token = token;
          this.$router.push("/");
        } else if (code === 101) {
          //账号不存在
          this.register();
        }
      });
    },
    //注册
    register() {
      let { info } = this;

      this.$.post("register", info).then(res => {
        if (res.data.code === 1) {
          this.login();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-container {
  background-color: #2d3a4b;
  min-height: 100vh;
  .login {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;

    .title {
      font-size: 26px;
      color: #eee;
    }

    .login-btn {
      margin-top: 30px;
    }

    .tips {
      font-size: 12px;
      margin-top: 20px;
      text-align: right;
      color: #ffffff;
    }
  }
}
</style>

<style lang="scss">
$bg: #283443;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .login {
    .el-input {
      display: inline-block;
      height: 47px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 22px;
      width: 100%;

      input {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: #fff;
        height: 47px;
        //鼠标光标颜色
        caret-color: $cursor;

        //input框自动填充时的背景颜色
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-button {
      border-radius: 0;
    }
  }
}
</style>