<template>
  <div id="animeListBox">
    <div class="con">

      <div class="item" v-for="item in showList" :key="item._id" @click="toDetail(item._id)">
        <div class="left">
          <img :src="item.img?item.img:defualImg.animeSmall" alt>
        </div>
        <div class="right">
          <p class="title">{{item.title}}</p>
          <p class="type">{{item.playStatus}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import init from "@/libs/init";

export default {
  props: ["list"],
  data() {
    return {
      defualImg: init.defaultImg,
    };
  },
  methods:{
    toDetail(id) {
      this.$router.push({ name: "GameDetail", params: { id: id } });
    },
  },
  computed: {
    showList() {
      let list = this.list;
      list.forEach(item => {
        switch (item.playStatus) {
          case "want":
            item.playStatus = "想玩";
            break;
          case "now":
            item.playStatus = "正在玩";
            break;
          case "over":
            item.playStatus = "玩完";
            break;  
          default:
            item.playStatus = "";
            break;
        }
      });
      return list;
    }
  }
};
</script>

<style lang="less" scoped>
#animeListBox {
  flex: 1;
  .con {
    // min-height: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    // overflow-y: auto;
  }
  padding: 20px;
  overflow-y: auto;

  .item {
    margin: 0 20px 20px;
    display: flex;
    flex-flow: row;
    width: 14%;
    min-width: 320px;
    height: 142px;
    background: #fff;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    .left {
      width: 115px;
      height: 100%;
      padding: 5px;
      overflow: hidden;
      img {
        border-radius: 4px;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      padding: 10px;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 20px;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .type {
        font-size: 14px;
        color: #888;
      }
    }
  }
}
</style>