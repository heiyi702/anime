<template >
  <div id="animeEditBox">
    <h2 class="title">修改游戏</h2>
    <div class="imgBox" v-if="formItem.img">
      <img :src="formItem.img?formItem.img:defualImg.gameSmall">
    </div>
    <Form class="form" ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="title">
        <Input v-model="formItem.title" placeholder="游戏标题"></Input>
      </FormItem>
      <FormItem label="图片链接" prop="img">
        <Input v-model="formItem.img" placeholder="带有http://的完整链接"></Input>
      </FormItem>
      <FormItem label="发售状态：" prop="saleStatus" style="width:100%;">
        <Select v-model="formItem.saleStatus" style="width:100%">
          <Option value="sold">已发售</Option>
          <Option value="noSale">未发售</Option>
        </Select>
      </FormItem>
      <FormItem label="游戏状态：" prop="playStatus" style="width:100%;">
        <Select v-model="formItem.playStatus" clearable style="width:100%;">
          <Option value="want">想玩</Option>
          <Option value="now">正在玩</Option>
          <Option value="over">玩完</Option>
        </Select>
      </FormItem>

      <FormItem label="相关网址" prop="link">
        <div v-for="item in formItem.link" :key="item.temId">
          <div class="linkItem">
            <Input
              :class="[item.flag?'':'redBorder','urlTitle']"
              v-model="item.urlTitle"
              placeholder="这里是链接名称"
            ></Input>
            <span>:</span>
            <Input
              :class="[item.flag?'':'redBorder','url']"
              v-model="item.url"
              placeholder="这里是带有http://或https://的完整链接"
            ></Input>
            <div class="linkBtnBox">
              <Button size="small" type="info" shape="circle" icon="md-add" @click="addLink"></Button>
              <Button size="small" shape="circle" icon="md-remove" @click="removeLink(item.temId)"></Button>
            </div>
          </div>
          <div class="tipMsg" v-if="!item.flag">名称不能为空，或链接格式有误</div>
        </div>
      </FormItem>

      <FormItem label="备注(最多200字)">
        <Input
          v-model="formItem.memo"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="其他乱七八糟想要备注的东西 最多200字"
          :maxlength="200"
        ></Input>
      </FormItem>

      <FormItem :label-width="0" style="width:100%;text-align: center;margin-bottom: 0;">
        <Button class="btn" size="large" type="primary" @click="save('ruleValidate')">保存</Button>
      </FormItem>
    </Form>

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
      formItem: {
        id: "",
        title: "",
        img: "",
        // 已发售 未发售
        saleStatus: "",
        // 游戏状态：
        playStatus: "",
        link: [
          {
            urlTitle: "",
            url: "",
            temId: new Date().getTime()
          }
        ],
        memo: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
        img: [
          {
            required: false,
            message: "请输入带有http://或https://的完整链接",
            trigger: "blur",
            type: "url"
          }
        ],
        playStatus: [
          {
            required: true,
            message: "游戏状态不能为空",
            trigger: "change"
          }
        ],
        saleStatus: [
          {
            required: true,
            message: "发售状态不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.checkLink();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addLink() {
      this.checkLink();
      this.formItem.link.push({
        urlTitle: "",
        url: "",
        temId: new Date().getTime(),
        flag: true
      });
    },
    removeLink(temId) {
      this.formItem.link.splice(
        this.formItem.link.findIndex(item => item.temId === temId),
        1
      );
      if (this.formItem.link.length === 0) {
        this.addLink();
      }
      this.checkLink();
    },

    checkLink() {
      let flag = true;
      let formItem = this.formItem;
      let list = this.formItem.link;
      let urlReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (list.length == 1) {
        if (!list[0].url && !list[0].urlTitle) {
          list[0].flag = true;
          return true;
        }
      }
      for (let i = 0; i < list.length; i++) {
        list[i].flag = true;
        // 有url
        if (list[i].url) {
          // 格式不正确
          if (!urlReg.test(list[i].url)) {
            list[i].flag = false;
            flag = false;
          }
          // 没标题
          if (!list[i].urlTitle) {
            list[i].flag = false;
            flag = false;
          }
        } else {
          list[i].flag = false;
          flag = false;
        }
      }
      this.formItem.link = list;
      return flag;
    },

    save() {
      let that = this;
      let flag = this.checkLink();
      this.$refs.formItem.validate(valid => {
        if (valid && flag) {
          gameAPI.addGame(that.formItem).then(res => {
            if (res.data.code == 0) {
              that.$Message.success("Success!");
            } else {
              that.$Message.error("Fail!");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
#animeEditBox {
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
    }
  }

  .form {
    width: 60%;
    margin: 0 auto;

    .linkItem {
      display: flex;
      flex-flow: row;
      padding: 5px;
      border-radius: 4px;

      span,
      .urlTitle,
      .url {
        display: block;
      }
      span {
        width: 16px;
        text-align: center;
        font-weight: 600;
      }
      .urlTitle {
        width: 120px;
      }
      .url {
        flex: 1;
      }
      .linkBtnBox {
        width: 90px;
        padding: 0 10px;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        align-items: center;
      }
    }
    .linkItem:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .btn {
    margin: 0 10px;
  }

  .backBtn {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgb(106, 126, 146);
    color: rgba(255, 255, 255, 0.7);
  }
  .tipMsg {
    padding-left: 6px;
    line-height: 1;
    color: #ed4014;
  }
  .redBorder {
    border: 1px solid #ed4014;
    border-radius: 4px;
  }
}
</style>
