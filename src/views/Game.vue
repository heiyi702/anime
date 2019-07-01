<template>
  <div id="animeBox">
    <game-top :conTitle="conTitle"></game-top>
    <game-search @tapSearch="tapSearch"></game-search>
    <game-list :list="list"></game-list>
    <Page class-name="page" :page-size="20" :total="total" show-total @on-change="tapPage"/>
  </div>
</template>

<script>
import GameTop from "../components/GameTop.vue";
import GameList from "../components/GameList.vue";
import GameSearch from "../components/GameSearch.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("game");

import gameAPI from "@/api/game";
import { async } from "q";

export default {
  // props: ["conTitle"],
  data() {
    return {
      total: 0,
      list: [],
      type: "sold",
      page: 1,
      // conTitle: ""
    };
  },
  created() {
    // console.log(this.$route.params.type);
    this.type = this.$route.params.type;
    this.getAllList();
  },
  methods: {
    tapPage(page) {
      this.page = page;
      this.getAllList();
    },
    getAllList() {
      let type = this.type;
      let search = this.search;
      let page = this.page;
      gameAPI.getAllGameList(type, page, search).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list;
          this.total = res.data.data.length;
        }
      });
    },
    tapSearch() {
      this.page = 1;
      let type = this.type;
      let search = this.search;
      let page = this.page;
      gameAPI.getAllGameList(type, page, search).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list;
          this.total = res.data.data.length;
        }
      });
    }
  },
  components: {
    GameTop,
    GameList,
    GameSearch
  },
  computed: {
    ...mapState({
      search(state) {
        return state.search;
      }
    }),
    conTitle() {
      let type = this.$route.params.type;
      if(type=='sold'){
        return '已发售'
      }else{
        return '未发售'
      }
    }
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.name === "Game") {
        this.type = to.params.type;
        this.page = 1;
        this.getAllList();
      }
    }
  }
};
</script>

<style lang="less" scoped>
#animeBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  // align-items: flex-start;
  // justify-content: flex-start;
  .page {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
