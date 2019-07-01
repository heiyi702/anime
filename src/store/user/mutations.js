
import {
	LOGIN,
	// LOGOUT,
	REMOVE_LOGIN
} from './mutation-types'

const mutations = {

	[LOGIN](state, user) {
		state.username = user.username || null
		state.userID = user.userID || null
		state.hasLogin = true;
		localStorage.setItem('username',user.username)
		localStorage.setItem('userID',user.userID)
		localStorage.setItem('hasLogin',true)
	},
	[REMOVE_LOGIN](state) {
		state.userName = "";
		state.token = "";
		state.hasLogin = false;
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
		localStorage.removeItem('hasLogin');
	}
}

export default mutations
