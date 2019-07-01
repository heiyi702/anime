<template>
  <div id="regBox">
    <div class="formBox">
      <div class="title">注册</div>
      <Form ref="regForm" :model="regForm" class="form" label-position="right" :label-width="80">
        <FormItem label="用户名">
          <Input type="text" v-model="regForm.user" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input type="password" v-model="regForm.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码">
          <Input type="password" v-model="regForm.password2" placeholder="请再次输入密码"></Input>
        </FormItem>
        <FormItem style="text-align: center;" :label-width="0">
          <Button class="btn" @click="toLogin">返回登录</Button>
          <Button class="btn" type="primary" @click="tapSubmit('regForm')">提交注册</Button>
        </FormItem>
      </Form>
      <!-- <div class="tip">
        <h3>注意：没钱发邮件 发短信！</h3>
        <h3>不能重置密码！！</h3>
        <h3>本网站非常不安全，切勿存放敏感信息！</h3>
      </div> -->
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>


<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import userAPI from "@/api/user";
import { async } from "q";
import { setTimeout } from 'timers';

export default {
  name: "register",
  components: {},
  data() {
    return {
      spinShow: false,
      regForm: {
        user: "",
        password: "",
        password2: ""
      }
    };
  },
  created() {},
  methods: {
    ...mapActions(["LOGIN","LOGOUT"]),
    toLogin() {
      // API.reg()
      this.$router.replace({ name: "Login" });
    },
    tapSubmit() {
      this.LOGOUT();
      let that=this;
      let pwd = this.regForm.password;
      let pwd2 = this.regForm.password2;
      let user = this.regForm.user;
      if (!user || user.length < 1 || user.length > 20) {
        this.$Message.error("用户名1~20位!");
        return;
      }
      if (pwd.length < 6) {
        this.$Message.error("密码最少6位!");
        return;
      }
      if (pwd != pwd2 || !pwd || !pwd2) {
        this.$Message.error("或两次密码不一致!");
        return;
      } else {
        this.spinShow = true;
        userAPI.reg(user, pwd).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            that.$Message.success("注册成功,即将返回登录页!");
            setTimeout(()=>{
              this.$router.replace({name:'Login'})
            },1500)
          } else {
            that.$Message.error(res.data.msg);
          }
        });
        this.spinShow = false;
      }
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
#regBox {
  width: 100%;
  height: 100%;
  background: #000
    url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560644841987&di=20a8226e217155b69d7c73b358eaa460&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F0328b9ccee325ab896d5fe8a477cbc7e2402d60b.jpg)
    no-repeat center;
  background-size: 100% auto;
  overflow: hidden;

  .formBox {
    margin: 10% auto 0;
    width: 400px;
    height: 400px;
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

  // .tip {
  //   margin-top: 50px;
  //   height: 22px;
  //   line-height: 22px;
  //   text-align: center;
  //   color: #ed4014;
  //   font-size: 16px;
  // }
}

// #loginBox {
// width: 100%;
// height: 100%;
// background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560642627827&di=b680ee05ef1a18c7e189a01df0023e47&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F5928029fc55664ef201dc551a0d631540a31002e.jpg) no-repeat top left;
// background-size: 100%;
//   .inputBox {
//     margin-top: 200px;
//     padding: 15px;
//     border: 1px solid #eee;
//     border-radius: 8px;
//     background: #fff;

// .title {
//   padding: 10px 0;
//   font-size: 16px;
//   text-align: center;
// }
//     .restBtn {
//       margin-left: 10px;
//     }
//   }
// }
</style>

