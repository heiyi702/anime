<template>
  <div class="layout" id="homeBox">
    <Layout :style="{height:'100%', background: 'rgb(0, 0, 0,0.1)'}">
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="animeTop" @click.native="tapMenuItem('ACG','Anime')">
              <Icon type="md-desktop"></Icon>
              <span>视频</span>
            </MenuItem>
            <MenuItem name="gameTop" @click.native="tapMenuItem('sold','Game')">
              <Icon type="ios-game-controller-b"></Icon>游戏
            </MenuItem>
            <MenuItem
              name="calendarTop"
              @click.native="tapMenuItem(null,'Calendar')"
            >
              <Icon type="md-time"></Icon>日程
            </MenuItem>
            <MenuItem name="userTop" @click.native="tapMenuItem(null,'User')">
              <Icon type="logo-octocat"></Icon>个人
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0px 30px 20px', background: 'transparent'}">
        <Content :style="{marginTop:'10px', height: '100%'}">
          <Layout :style="{height: '100%', background: 'rgb(255, 255, 255,0.7)'}">
            <Sider
              collapsible
              :collapsed-width="78"
              :style="{height: '100%',overflow:'auto'}"
              v-model="isCollapsed"
            >
              <Menu
                accordion
                :class="menuitemClasses"
                theme="dark"
                width="auto"
                :active-name="activeName"
                :open-names="openNames"
                :style="{height:'100%',overflow:'auto'}"
              >
                <Submenu name="anime">
                  <template slot="title">
                    <Icon type="md-desktop"></Icon>
                    <span>视频</span>
                  </template>
                  <MenuItem
                    name="Anime-ACG"
                    @click.native="tapMenuItem('ACG','Anime')"
                  >
                    <span>动画</span>
                  </MenuItem>
                  <MenuItem
                    name="Anime-JP"
                    @click.native="tapMenuItem('JP','Anime')"
                  >
                    <span>日剧</span>
                  </MenuItem>
                  <MenuItem
                    name="Anime-USA"
                    @click.native="tapMenuItem('USA','Anime')"
                  >
                    <span>欧美</span>
                  </MenuItem>
                  <MenuItem
                    name="Anime-other"
                    @click.native="tapMenuItem('other','Anime')"
                  >
                    <span>其他</span>
                  </MenuItem>
                </Submenu>
                <Submenu name="game">
                  <template slot="title">
                    <Icon type="ios-game-controller-b"></Icon>
                    <span>游戏</span>
                  </template>
                  <MenuItem
                    name="Game-sold"
                    @click.native="tapMenuItem('sold','Game')"
                  >
                    <span>已发售</span>
                  </MenuItem>
                  <MenuItem
                    name="Game-noSale"
                    @click.native="tapMenuItem('noSale','Game')"
                  >
                    <span>未发售</span>
                  </MenuItem>
                </Submenu>
                <Submenu name="calendar">
                  <template slot="title">
                    <Icon type="md-time"></Icon>
                    <span>日程</span>
                  </template>
                  <MenuItem
                    name="Calendar-look"
                    @click.native="tapMenuItem(null,'Calendar')"
                  >
                    <span>查看日程</span>
                  </MenuItem>
                </Submenu>
                <Submenu name="user">
                  <template slot="title">
                    <Icon type="logo-octocat"></Icon>
                    <span>个人中心</span>
                  </template>
                  <MenuItem
                    name="User-user"
                    @click.native="tapMenuItem(null,'User')"
                  >
                    <span>查看资料</span>
                  </MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px'}" class="auto">
              <!-- Content -->
              <!-- <router-view :conTitle="conTitle"/> -->
              <router-view />
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">
        &nbsp;
        <!-- 2011-2016 &copy; TalkingData -->
      </Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
      openNames: [],
      // activeName: "",
      // conTitle: ""
    };
  },
  created() {
    // console.log(this.$route.meta.openNames);
    this.openNames = this.$route.meta.openNames;
    // this.activeName = this.$route.meta.activeName;
    // this.conTitle = this.$route.meta.conTitle;
  },

  methods: {
    tapMenuItem(type, name) {
      // this.activeName = activeName;
      // this.conTitle = conTitle;
      if (name == "Calendar") {
        this.$router.push({ name: name });
      } else {
        this.$router.push({ name: name, params: { type: type } });
      }
    }
  },

  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    activeName() {
      let type = this.$route.params.type;
      let name = this.$route.name;
      let activeName = name + "-" + type;
      return activeName
    }
    // routeName(){
    //   return this.$route.meta
    // }
  },
  watch: {
    // $route(to, from) {
    //   console.log(to);
    // }
  }
};
</script>

<style scoped lang="less">
#homeBox {
  width: 100%;
  height: 100%;
  //   background: #000 url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560648932555&di=447b0bf7178a15be4506d5d37aa47990&imgtype=0&src=http%3A%2F%2Fnewsimg.5054399.com%2Fuploads%2Fuserup%2F1807%2F16152325L49.jpg) no-repeat center;
  background: #000
    url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560649522349&di=e0895b9c1e1b49d7ec7084e9d1a55d54&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F45d10c5c4d4d614dd09996f6596d78612376d9f4.jpg)
    no-repeat center;
  background-size: 100% auto;
  overflow: hidden;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
  background: #515a6e;
  color: #fff;
}

.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>