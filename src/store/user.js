
class User {
  constructor (username) {
    this.username = username
  }
}

export default {
  state: {
    users: [],
    currentUser: {}
  },
  mutations: {
    createUser (state, payload) {
      state.users.push(payload)
    },
    setCurrentUser (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    createUser ({ commit }, username) {
      const newUser = new User(username)
      commit('createUser', newUser)
    },
    setCurrentUser ({ commit }, username) {
      const user = new User(username)
      commit('setCurrentUser', user)
    }
  },
  getters: {
    users (state) {
      return state.users
    },
    currentUser (state) {
      return state.currentUser
    }
  }
}
