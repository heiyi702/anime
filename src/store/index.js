import Vue from 'vue'
import Vuex from 'vuex'

// modules
import user from './user'
import anime from './anime'
import game from './game'
import calendar from './calendar'
import http from './http'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    anime,
    game,
    calendar,
    http
  }
})
export default store
