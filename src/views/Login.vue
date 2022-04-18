<template>
  <div id="loginBox">
    <div class="formBox">
      <div class="title">登录</div>
      <Form ref="loginForm" :model="loginForm" class="form">
        <FormItem>
          <!-- <Input v-model="loginForm.user" clearable placeholder="请输入用户名"></Input> -->
          <Input type="text" v-model="loginForm.user" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <!-- <Input type="password" v-model="loginForm.password" clearable placeholder="请输入密码"></Input> -->
          <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem style="text-align: center;">
          <Button class="btn" type="primary" @click="handleSubmit('loginForm')">登录</Button>
          <Button class="btn" @click="toRegister">注册</Button>
        </FormItem>
      </Form>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>


<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import userAPI from "@/api/user";

export default {
  name: "login",
  components: {},
  data() {
    return {
      spinShow: false,
      loginForm: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["LOGIN"]),
    handleSubmit(name) {
      this.spinShow = true;
      // this.$router.replace({ name: 'Home'})
      if (!this.loginForm.user || !this.loginForm.password) {
        this.$Message.error("用户名密码不能为空!");
        return;
      }

      userAPI.login(this.loginForm.user, this.loginForm.password).then(res => {
        if (res.data.code == 0) {
          this.LOGIN({
            username: res.data.data.username,
            userID: res.data.data._id
          });
          this.$router.replace({ name: "Anime",params: { type: 'ACG' } });
        } else {
          this.$Message.error(res.data.msg);
        }
        this.spinShow = false;
      });

      // this.$router.replace({ name: "Anime" });
    },
    toRegister() {
      this.$router.replace({ name: "Register" });
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
#loginBox {
  width: 100%;
  height: 100%;
  background: #000
    url(../assets/4.jpeg)
    no-repeat center;
  background-size: auto 100%;

  .formBox {
    position: fixed;
    top: 35%;
    right: 40%;
    width: 300px;
    height: 255px;
    padding: 0 30px 20px;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    opacity: 0.95;

    .title {
      padding: 15px 0;
      height: 16x;
      line-height: 16px;
      font-size: 16px;
      text-align: center;
    }

    .form {
      margin-top: 10px;

      .btn {
        margin: 10px;
      }
    }
  }
}
</style>

