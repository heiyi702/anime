import { NEXT_MONTH,PREV_MONTH,INIT_NOW } from './mutation-types'

const actions = {
	initNow: ({ commit },now) => {
		commit(INIT_NOW,now)
	},
	nextMonth: ({ commit },show) => {
		commit(NEXT_MONTH,show)
	},
	prevMonth: ({ commit },show) => {
		commit(PREV_MONTH,show)
	},
}
export default actions
