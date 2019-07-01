<template >
  <div id="animeDetailBox">
    <h2 class="title">{{infoMsg.title}}</h2>
    <div class="imgBox">
      <img :src="infoMsg.img?infoMsg.img:defualImg.gameBig">
    </div>

    <div class="txtBox">
      <dl class="status">
        <dt>发售状态：</dt>
        <dd>{{infoMsg.saleStatus}}</dd>
      </dl>
      <dl class="over">
        <dt>游戏状态：</dt>
        <dd>{{infoMsg.playStatus}}</dd>
      </dl>
      <dl class="link">
        <dt>相关网址：</dt>
        <dd>
          <a
            v-for="item in infoMsg.link"
            :key="item.linkId"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
          >{{item.urlTitle}}</a>
        </dd>
      </dl>
      <dl class="memo">
        <dt>备注：</dt>
        <dd>{{infoMsg.memo}}</dd>
      </dl>
    </div>

    <div class="btnBox">
      <Button @click="toEdit" type="primary">修改</Button>
      <!-- <Button type="error" style="margin-left:20px;">删除</Button> -->
    </div>

    <Button class="backBtn" @click="goBack" size="large">
      <Icon type="ios-arrow-back"/>
      <span>返回</span>
    </Button>
  </div>
</template>

<script>
import init from "@/libs/init";
import gameAPI from "@/api/game";
import { async } from "q";

export default {
  data() {
    return {
      defualImg: init.defaultImg,
      info: {
        id: "",
        title: "",
        img: "",
        // 已发售 未发售
        saleStatus: "",
        // 游戏状态：
        playStatus: "",
        link: [],
        memo: ""
      }
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      this.gameId = this.$route.params.id;
      gameAPI.getGameDetail(this.gameId).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.info = res.data.data;
        } else {
          this.$Modal.error({
            title: "错误",
            content: `${res.data.data},即将返回上一页`,
            onOk() {
              that.$router.go(-1);
            }
          });
        }
      });
    },
    toEdit() {
      this.$router.replace({ name: "GameEdit", id: this.infoMsg._id });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    infoMsg() {
      let infoMsg = { ...this.info };
      switch (infoMsg.saleStatus) {
        case "sold":
          infoMsg.saleStatus = "已发售";
          break;
        case "noSale":
          infoMsg.saleStatus = "未发售";
          break;
        default:
          infoMsg.saleStatus = "";
          break;
      }

      switch (infoMsg.playStatus) {
        case "want":
          infoMsg.playStatus = "想玩";
          break;
        case "now":
          infoMsg.playStatus = "正在玩";
          break;
        case "over":
          infoMsg.playStatus = "玩完";
          break;
          over;
        default:
          infoMsg.playStatus = "";
          break;
      }
      return infoMsg
    }
  }
};
</script>

<style lang="less" scoped>
#animeDetailBox {
  position: relative;
  display: flex;
  flex-flow: column;

  .title {
    margin: 10px auto;
    text-align: center;
  }

  .imgBox {
    margin: 10px auto;
    text-align: center;
    img {
      display: inline-block;
      height: 405px;
      width: auto;
      max-width: 800px;
      border-radius: 8px;
      box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 42px -5px;
    }
  }

  .txtBox {
    // width: 50%;
    min-width: 100px;
    max-width: 600px;
    margin: 0 auto;
    dl {
      margin: 10px 30px;
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      font-size: 16px;
      dt,
      dd {
        max-height: 100px;
        word-wrap: break-word;
        overflow: auto;
        line-height: 22px;
      }
      dt {
        min-width: 150px;
      }
      dd {
        // flex: 1;
        a {
          display: block;
        }
      }
    }
  }
  // dl {
  //   margin: 10px 30px;
  //   width: 100%;
  //   display: flex;
  //   flex-flow: row;
  //   justify-content: flex-start;
  //   font-size: 16px;
  //   dt,
  //   dd {
  //     line-height: 22px;
  //   }
  //   dt {
  //     min-width: 150px;
  //   }
  //   dd {
  //     // flex: 1;
  //     a {
  //       display: block;
  //     }
  //   }
  // }

  .btnBox {
    margin-top: 20px;
    text-align: center;
  }
  .backBtn {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgb(106, 126, 146);
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
