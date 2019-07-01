<template>
  <div id="userBox">
    <div class="con">
      <div class="imgBox">
        <img :src="user.header?user.header:defualImg.header">
      </div>
      <div class="txtBox">
        <dl class="name txt">
          <dt>用户名：</dt>
          <dd>{{user.username}}</dd>
        </dl>
        <dl class="name txt">
          <dt>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</dt>
          <dd>{{user.email?user.email:'未填写'}}</dd>
        </dl>
      </div>
      <div class="btnBox">
        <Button type="info" @click="toEdit">修改</Button>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "@/api/user";
import init from "@/libs/init";

export default {
  data() {
    return {
      defualImg: init.defaultImg,
      user: {}
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    toEdit() {
      this.$router.push({ name: "UserEdit" });
    },
    getUser() {
      userAPI.getUser().then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.user = res.data.data;
        } else {
          this.$Message.error(res.data.data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#userBox {
  .con {
    .imgBox {
      width: 100%;
      margin: 100px auto;
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
    .txtBox {
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      dl {
        min-width: 400px;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        padding: 10px;
        line-height: 20px;
        font-size: 16px;
        color: #333;

        dt {
          width: 100px;
          text-align: right;
        }
        dd {
          flex: 1;
          padding-left: 20px;
          text-align: center;
        }
      }
    }
    .btnBox {
      margin-top: 100px;
      text-align: center;
    }
  }
}
</style>
