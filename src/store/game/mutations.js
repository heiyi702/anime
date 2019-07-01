import {
	RESET,
	CHANGE,
} from './mutation-types'

const mutations = {
	[RESET](state) {
		state.search = {
			title: "",
			playStatus: ""
		}
	},
	[CHANGE](state, msg) {
		state.search = msg;
	}
}

export default mutations
