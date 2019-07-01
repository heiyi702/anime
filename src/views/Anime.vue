<template>
  <div id="animeBox">
    <anime-top :conTitle="conTitle"></anime-top>
    <anime-search @tapSearch="tapSearch"></anime-search>
    <anime-list :list="list"></anime-list>
    <Page class-name="page" :page-size="20" :total="total" show-total @on-change="tapPage"/>
  </div>
</template>

<script>
import AnimeTop from "../components/AnimeTop.vue";
import AnimeList from "../components/AnimeList.vue";
import AnimeSearch from "../components/AnimeSearch.vue";

import animeAPI from "@/api/anime";
import { async } from "q";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("anime");

export default {
  // props: ["conTitle"],
  data() {
    return {
      // conTitle: "",
      total: 0,
      list: [],
      type: "ACG",
      page: 1
      // search:{}
    };
  },
  created() {
    /**
     * 设置页面
     * 默认请求动画的数据
     */
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
      animeAPI.getAllAcgList(type, page, search).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.anime;
          this.total = res.data.data.length;
        }
      });
    },
    tapSearch() {
      this.page = 1;
      let type = this.type;
      let search = this.search;
      let page = this.page;
      animeAPI.getAllAcgList(type, page, search).then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.anime;
          this.total = res.data.data.length;
        }
      });
    }
  },
  computed: {
    ...mapState({
      search(state) {
        return state.search;
      }
    }),
    conTitle() {
      let type = this.$route.params.type;
      switch (type) {
        case "ACG":
          return "动画";
          break;
        case "JP":
          return "日剧";
          break;
        case "USA":
          return "欧美";
          break;
        case "other":
          return "其他";
          break;
        default:
          break;
      }
    }
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (to.name === "Anime") {
        this.type = to.params.type;
        this.page = 1;
        this.getAllList();
      }
    }
  },
  components: {
    AnimeTop,
    AnimeList,
    AnimeSearch
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
