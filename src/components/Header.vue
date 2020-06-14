<template>
  <div class="header">
    <router-link v-if="!currentUser.username" to="/auth?type=signIn">Войти</router-link>
    <router-link v-if="!currentUser.username" to="/auth?type=signUp">Зарегистрироваться</router-link>
    <button v-if="currentUser.username" @click="logout">Выйти</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      username: ''
    }
  },
  props: {
    msg: String
  },
  computed: {
    userList () {
      return this.$store.getters.users
    },
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setCurrentUser', null)
      this.$router.push('/auth?type=signIn')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
