import { NEXT_MONTH, PREV_MONTH, INIT_NOW } from './mutation-types'

const mutations = {
	[INIT_NOW](state, now) {
		state.nowshow = now;
	},
	[NEXT_MONTH](state, show) {
		state.nowshow = show

	},
	[PREV_MONTH](state, show) {
		state.nowshow = show

	},
}

export default mutations
