<template >
  <div id="animeDetailBox">
    <h2 class="title">{{infoMsg.title}}</h2>
    <div class="imgBox">
      <img :src="infoMsg.img?infoMsg.img:defualImg.animeBig">
    </div>

    <div class="txtBox">
      <dl class="videotype">
        <dt>类型：</dt>
        <dd>{{infoMsg.videotype}}</dd>
      </dl>
      <dl class="playStatus">
        <dt>放映状态：</dt>
        <dd>{{infoMsg.playStatus}}</dd>
      </dl>
      <dl class="changeDay">
        <dt>更新时间：</dt>
        <dd>{{infoMsg.changeDay}}</dd>
      </dl>
      <dl class="lookOver">
        <dt>观看状态：</dt>
        <dd>{{infoMsg.lookOver}}</dd>
      </dl>
      <dl class="link">
        <dt>在线/下载地址：</dt>
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
      <Button type="primary" @click="toEdit">修改</Button>
      <!-- <Button type="error" @click="goBack" style="margin-left:20px;">返回</Button> -->
    </div>

    <Button class="backBtn" @click="goBack" size="large">
      <Icon type="ios-arrow-back"/>
      <span>返回</span>
    </Button>
  </div>
</template>

<script>
import init from "@/libs/init";
import animeAPI from "@/api/anime";
import { async } from "q";

export default {
  data() {
    return {
      defualImg: init.defaultImg,
      // infoMsg: {
      //   id: "",
      //   title: "",
      //   img: "",
      //   // 动画 日剧 欧美 其他
      //   videotype: "",
      //   // 周一~周日 其他
      //   changeDay: "",
      //   // 连载，完结，其他
      //   playStatus: "",
      //   // 看完/想看
      //   lookOver: "",
      //   link: [],
      //   memo: ""
      // },
      info: {
        id: "",
        title: "",
        img: "",
        // 动画 日剧 欧美 其他
        videotype: "",
        // 周一~周日 其他
        changeDay: "",
        // 连载，完结，其他
        playStatus: "",
        // 看完/想看
        lookOver: "",
        link: [],
        memo: ""
      },
      animeId: "",
      formMsg: {}
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      this.animeId = this.$route.params.id;
      animeAPI.getAnimeDetail(this.animeId).then(res => {
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
      this.$router.replace({ name: "AnimeEdit", id: this.infoMsg.id });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    infoMsg() {
      let infoMsg = { ...this.info };
      switch (infoMsg.playStatus) {
        case "on":
          infoMsg.playStatus = "连载中";
          break;
        case "off":
          infoMsg.playStatus = "完结";
          break;
        case "other":
          infoMsg.playStatus = "其他";
          break;
        default:
          break;
      }
      switch (infoMsg.lookOver) {
        case "want":
          infoMsg.lookOver = "想看";
          break;
        case "now":
          infoMsg.lookOver = "正在看";
          break;
        case "over":
          infoMsg.lookOver = "看完";
          break;
        default:
          break;
      }
      switch (infoMsg.videotype) {
        case "ACG":
          infoMsg.videotype = "动画";
          break;
        case "JP":
          infoMsg.videotype = "日剧";
          break;
        case "USA":
          infoMsg.videotype = "欧美";
          break;
        case "other":
          infoMsg.videotype = "其他";
          break;
        default:
          break;
      }

      switch (+infoMsg.changeDay) {
        case 1:
          infoMsg.changeDay = "周一";
          break;
        case 2:
          infoMsg.changeDay = "周二";
          break;
        case 3:
          infoMsg.changeDay = "周三";
          break;
        case 4:
          infoMsg.changeDay = "周四";
          break;
        case 5:
          infoMsg.changeDay = "周五";
          break;
        case 6:
          infoMsg.changeDay = "周六";
          break;
        case 7:
          infoMsg.changeDay = "周日";
          break;
        case 8:
          infoMsg.changeDay = "其他";
          break;
        default:
          break;
      }
      return infoMsg;
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
#animeDetailBox {
  position: relative;
  display: flex;
  flex-flow: column;

  .title {
    margin: 10px auto 20px;
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

  .btnBox {
    margin-top: 30px;
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
