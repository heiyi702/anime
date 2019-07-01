import {
	LOGIN,
	LOGOUT,
	REMOVE_LOGIN
} from './mutation-types'

const actions={
	// 登录
	LOGIN({commit},user){
		console.log(user)
		commit(LOGIN,user)
	},
	// 向后台发出登出请求
	LOGOUT({commit}){
		setTimeout(() => {
      commit(REMOVE_LOGIN)
    }, 1000)
	},
	// token过期等 清除本地登录信息
	REMOVE_LOGIN(commit,user){
		commit(REMOVE_LOGIN,user)
	}
}

export default actions