<template >
  <div id="animeEditBox">
    <h2 class="title">编辑视频</h2>
    <div class="imgBox" v-if="formItem.img">
      <img :src="formItem.img?formItem.img:defualImg.animeSmall">
    </div>
    <Form class="form" ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="150">
      <FormItem label="标题" prop="title">
        <Input v-model="formItem.title" placeholder="视频标题"></Input>
      </FormItem>
      <FormItem label="图片链接" prop="img">
        <Input v-model="formItem.img" placeholder="带有http://的完整链接"></Input>
      </FormItem>
      <FormItem label="视频种类" prop="videotype" style="width:100%;">
        <Select v-model="formItem.videotype" style="width:100%">
          <Option value="ACG">动画</Option>
          <Option value="JP">日剧</Option>
          <Option value="USA">欧美</Option>
          <Option value="other">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="连载状态" prop="playStatus" style="width:100%;">
        <Select v-model="formItem.playStatus" style="width:100%">
          <Option value="on">连载</Option>
          <Option value="off">完结</Option>
          <Option value="other">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="更新时间" prop="changeDay" clearable style="width:100%;">
        <Select v-model="formItem.changeDay" clearable style="width:100%">
          <Option value="1">周一</Option>
          <Option value="2">周二</Option>
          <Option value="3">周三</Option>
          <Option value="4">周四</Option>
          <Option value="5">周五</Option>
          <Option value="6">周六</Option>
          <Option value="7">周日</Option>
          <Option value="8">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="是否看完" prop="lookOver" style="width:100%;">
        <RadioGroup v-model="formItem.lookOver">
          <Radio label="over">看完</Radio>
          <Radio label="now">正在看</Radio>
          <Radio label="want">想看</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="在线/下载地址">
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
        <Button class="btn" @click="tapDel" size="large" type="warning">删除</Button>
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
import animeAPI from "@/api/anime";
import { async } from "q";

export default {
  data() {
    return {
      defualImg: init.defaultImg,
      animeId: "",
      formItem: {
        title: "",
        img: "",
        // 动画 日剧 欧美 其他
        videotype: "",
        // 连载，完结，其他
        playStatus: "",
        // 周一~周日 其他
        changeDay: "8",
        // 看完/想看
        lookOver: "看完",
        link: [],
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
            required: true,
            message: "请输入带有http://或https://的完整链接",
            trigger: "blur",
            type: "url"
          }
        ],
        videotype: [
          {
            required: true,
            message: "视频种类不能为空",
            trigger: "change"
          }
        ],
        playStatus: [
          {
            required: true,
            message: "连载状态不能为空",
            trigger: "change"
          }
        ],
        lookOver: [
          {
            required: true,
            message: "是否看完不能为空",
            trigger: "change"
          }
        ],
        changeDay: [
          {
            required: true,
            message: "更新时间不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMsg();
  },
  methods: {
    getMsg() {
      let that = this;
      this.animeId = this.$route.params.id;
      animeAPI.getAnimeDetail(this.animeId).then(res => {
        if (res.data.code == 0) {
          that.formItem = res.data.data;
          if (!this.formItem.link) {
            that.addLink();
          }
          that.checkLink();
        } else {
          that.$Modal.error({
            title: "错误",
            content: `${res.data.data},即将返回上一页`,
            onOk() {
              that.$router.go(-1);
            }
          });
        }
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
      let urlReg = /(?:(https?|ftp|file):)?\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
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
    addLink() {
      this.checkLink();
      this.formItem.link.push({
        urlTitle: "",
        url: "",
        temId: new Date().getTime(),
        flag: true
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    save() {
      console.log(99999);
      let that = this;
      let flag = this.checkLink();
      this.$refs.formItem.validate(valid => {
        if (valid && flag) {
          animeAPI.changeAnime(this.animeId, this.formItem).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              that.$Message.success("Success!");
            } else {
              that.$Message.error("Fail!");
            }
          });
          // this.$router.go(-1);
        } else {
          that.$Message.error("Fail!");
        }
      });
    },
    tapDel() {
      // this.$router.go(-1);
      let that = this;

      animeAPI.delAnime(this.animeId).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          that.$Message.success("Success!");
          this.$router.go(-1);
        } else {
          that.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#animeEditBox {
  position: relative;
  display: flex;
  flex-flow: column;

  .form {
    width: 60%;
    margin: 0 auto;

    .linkItem {
      display: flex;
      flex-flow: row;
      padding: 5px;
      border-radius: 8px;

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
}
</style>
