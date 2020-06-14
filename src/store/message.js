
class Message {
  constructor (text, username, id) {
    this.text = text
    this.username = username
    this.id = id
    this.date = new Date()
  }
}

export default {
  state: {
    messageId: 0,
    messages: []
  },
  mutations: {
    createMessage (state, payload) {
      state.messages.push(payload)
    },
    increaseMessgeId (state, payload) {
      state.messageId = payload
    },
    deleteMessage (state, payload) {
      const index = state.messages.findIndex((element) => element.id === payload)
      state.messages.splice(index, 1)
    },
    editMessage (state, payload) {
      const message = state.messages.find((element) => element.id === payload.id)
      message.text = payload.text
      message.date = new Date()
    }
  },
  actions: {
    createMessage ({ commit, state }, payload) {
      const message = new Message(
        payload.text,
        payload.username,
        state.messageId
      )
      commit('createMessage', message)
      commit('increaseMessgeId', ++state.messageId)
    },
    editMessage ({ commit }, payload) {
      commit('editMessage', payload)
    },
    deleteMessage ({ commit }, payload) {
      commit('deleteMessage', payload)
    }
  },
  getters: {
    messages (state) {
      return state.messages
    },
    messageId (state) {
      return state.messageId
    }
  }
}
