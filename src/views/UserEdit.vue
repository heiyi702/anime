<template>
  <div id="userBox">
    <div class="con">
      <div class="imgBox">
        <img :src="header">
      </div>

      <Form
        class="form"
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="头像链接" prop="header">
          <Input
            @on-blur="changeHeader"
            v-model="formValidate.header"
            placeholder="请填写带有http://或https://的完整链接"
          ></Input>
        </FormItem>

        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请填写用户名"></Input>
        </FormItem>

        <FormItem label="邮箱" prop="email">
          <Input v-model="formValidate.email" placeholder="请填写邮箱"></Input>
        </FormItem>

        <FormItem :label-width="0">
          <Button class="btn" type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button class="btn" @click="back">返回</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import userAPI from "@/api/user";
import init from "@/libs/init";

export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      userAPI.checkUser(value).then(res => {
        if (res.data.code !== 0) {
          callback(new Error("用户名不可用"));
        } else {
          callback();
        }
      });
    };
    return {
      defualImg: init.defaultImg,
      header: "",
      formValidate: {
        username: "",
        email: "",
        header: ""
      },
      ruleValidate: {
        header: [
          {
            type: "url",
            required: false,
            message: "带有http://或https://的完整链接",
            trigger: "blur"
          }
        ],
        username: [{ validator: validateUser, trigger: "blur" }],
        email: [{ type: "email", message: "邮箱格式有误", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    changeHeader(val) {
      console.log(val.target.value);
      this.header = val.target.value;
    },
    getUser() {
      userAPI.getUser().then(res => {
        if (res.data.code == 0) {
          this.formValidate = res.data.data;
          if (!this.formValidate.header) {
            this.header = this.defualImg.header;
            this.formValidate.header = this.defualImg.header;
          } else {
            this.header = this.formValidate.header;
          }
        } else {
          this.$Message.error(res.data.data);
        }
      });
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          userAPI.editUser(this.formValidate).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$Message.success("Success!");
            } else {
              this.$Message.error("修改失败!");
            }
          });
        } else {
          this.$Message.error("数据填写不正确!");
        }
      });
    },

    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
#userBox {
  .con {
    .imgBox {
      width: 100%;
      margin: 100px auto 50px;
      text-align: center;
      img {
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 999px;
        border: 1px solid #eee;
        box-shadow: 0px 0px 17px #7b849c;
      }
    }
    .form {
      width: 800px;
      margin: 0 auto;
      text-align: center;
      .btn {
        margin: 20px 10px 0;
      }
    }
    .btnBox {
      margin-top: 100px;
      text-align: center;
    }
  }
}
</style>
