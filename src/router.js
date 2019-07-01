import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Refresh from './views/Refresh.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/login',
      name: 'Login',
      meta: { showRoutView: true },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },

    // 测试
    {
      path: '/test',
      name: 'TestPage',
      component: () => import(/* webpackChunkName: "test" */ './views/TestPage.vue')
    },

    {
      path: '/refresh',
      name: 'Refresh',
      component: Refresh
    },

    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'anime/:type',
          name: 'Anime',
          meta: { openNames: ['anime'],activeName: 'Anime-ACG',conTitle:'动画' },
          component: () => import(/* webpackChunkName: "anime" */ './views/Anime.vue')
        },
        {
          path: 'game/:type',
          name: 'Game',
          component: () => import(/* webpackChunkName: "geme" */ './views/Game.vue')
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: () => import(/* webpackChunkName: "calendar" */ './views/Calendar.vue')
        },
        {
          path: 'calendar-detail/:day',
          name: 'CalendarDetail',
          component: () => import(/* webpackChunkName: "calendar-detail" */ './views/CalendarDetail.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import(/* webpackChunkName: "user" */ './views/User.vue')
        },
        {
          path: 'user-edit',
          name: 'UserEdit',
          component: () => import(/* webpackChunkName: "user-edit" */ './views/UserEdit.vue')
        },
        {
          path: 'anime-detail/:id',
          name: 'AnimeDetail',
          component: () => import(/* webpackChunkName: "anime-detail" */ './views/AnimeDetail.vue')
        },
        {
          path: 'anime-edit/:id',
          name: 'AnimeEdit',
          component: () => import(/* webpackChunkName: "anime-edit" */ './views/AnimeEdit.vue')
        },
        {
          path: 'anime-add',
          name: 'AnimeAdd',
          component: () => import(/* webpackChunkName: "anime-add" */ './views/AnimeAdd.vue')
        },

        {
          path: 'game-detail/:id',
          name: 'GameDetail',
          component: () => import(/* webpackChunkName: "game-detail" */ './views/GameDetail.vue')
        },
        {
          path: 'game-edit/:id',
          name: 'GameEdit',
          component: () => import(/* webpackChunkName: "game-edit" */ './views/GameEdit.vue')
        },
        {
          path: 'game-add',
          name: 'GameAdd',
          component: () => import(/* webpackChunkName: "game-add" */ './views/GameAdd.vue')
        },

        // {
        //   // 当 /user/:id/posts 匹配成功
        //   // UserPosts 会被渲染在 User 的 <router-view> 中
        //   path: 'posts',
        //   component: UserPosts
        // }
      ]
    }

  ]
})
