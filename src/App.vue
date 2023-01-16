<template>
	<div id="app">
		<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
		<router-view />
		<!-- <div style="position:fixed;top:200px;left:200px">
			<button @click="test(11)">11111111</button>
			<button @click="test(22)">2222222</button>
			<button @click="test(33)">3333333333</button>
		</div> -->
	</div>
</template>
<script>
export default {
  methods:{
    test(id){
      this.$router.push({
        name:'Test',
        params:{
          id
        }
      })
    }
  }
}
</script>

<style lang="less">
#app {
	width: 100%;
	height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.ivu-layout-sider-trigger {
	position: absolute !important;
}
.collapsed-menu .ivu-menu {
	display: none !important;
}

.collapsed-menu .ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
	display: none !important;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
