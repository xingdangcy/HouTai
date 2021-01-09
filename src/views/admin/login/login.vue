<template>
  <div class="login">
    <header class="header">UNI-ADMIN</header>
    <el-form :model="user" ref="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="user.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入用户名"
          v-model="user.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width: 100%" :loading="loading" @click="doLogin">
          {{loading ? "登陆中....." : "立即登陆"}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loading: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    //执行登陆操作的方法值
    doLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {//成功
          this.loading = true;//校验成功转圈圈
          //调用登陆的接口信息
          this.$axios.post("/admin/login",this.user).then
          (res=>{
              this.loading = false;
              //登陆成功后要干嘛？
              console.log(res.data);
              this.$message.success("登陆成功");

              let obj = {
                  token: res.data.token,
                  username: res.data.username,
              };
              //存储用户登录成功后信息
              this.$store.commit("doLogin",obj);
              
               this.$router.push("/admin/home");
          }).catch(error=>{
              this.loading = false;
              //登陆失败后要做事情
              console.log(error.response.data);
              //弹出错误提示
              this.$message.error(error.response.data.msg)
              return false;
          })

        } else {//失败时候
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.login {
  width: 40%;
  border: #dddddd 1px solid;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  .header {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    border-bottom: #dddddd 1px solid;
  }

  .el-form {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>