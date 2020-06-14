<template>
  <div class="chat">
    <h1 class="chat__title">Чат</h1>
    <div class="chat__list">
      <Message v-for="(message, index) in messages" :message="message" :key="index"  />
    </div>
    <form class="chat__input-form" @submit.prevent="createMessage">
      <textarea class="chat__text-area" type="text" v-model="text" required />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import Message from '@/components/Message'

export default {
  name: 'Chat',
  data () {
    return {
      text: ''
    }
  },
  components: {
    Message
  },
  computed: {
    messages () {
      return this.$store.getters.messages
    },
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    createMessage () {
      const message = {
        text: this.text,
        username: this.currentUser.username
      }
      this.$store.dispatch('createMessage', message)
      this.text = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .chat {
    padding-bottom: 70px;
    padding-left: 10px;
    padding-right: 10px;

    &__title {
      color: white;
      text-align: center;
    }

    &__input-form {
      position: fixed;
      bottom: 10px;
      height: 80px;
      display: flex;
      align-items: stretch;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      max-width: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 5px;
      box-sizing: border-box;
    }

    &__text-area {
      resize: none;
      height: 100%;
      flex-grow: 1;
      margin-right: 10px;
      box-sizing: border-box;
    }
  }
</style>
