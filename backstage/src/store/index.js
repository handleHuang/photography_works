import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  actions,
  mutations,
  strict: debug
})
