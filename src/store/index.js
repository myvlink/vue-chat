import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import message from './message'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    message,
    shared
  },
  plugins: [createPersistedState()]
})
