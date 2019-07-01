import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const game = {
	state,
	mutations,
	getters,
	actions,
	namespaced: true
}


export default game
