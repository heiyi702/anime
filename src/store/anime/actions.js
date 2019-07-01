import {
	RESET,
	CHANGE,
} from './mutation-types'

const actions={
	// JIA_ACT({commit},n){
	// 	commit('JIA',n)
	// },
	RESET({commit}){
		commit(RESET)
	},
	CHANGE({commit},msg){
		commit(CHANGE,msg)
	}
}

export default actions