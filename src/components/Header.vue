<template>
  <div class="header">
    <router-link class="header__link" exact active-class="header__link--active" v-if="!currentUser.username" to="/auth?type=signIn">Войти</router-link>
    <router-link class="header__link" exact active-class="header__link--active" v-if="!currentUser.username" to="/auth?type=signUp">Зарегистрироваться</router-link>
    <button class="header__button" v-if="currentUser.username" @click="logout">Выйти</button>
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
  .header {
    background-color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;

    &__link {
      margin-right: 10px;
      text-decoration: none;

      &--active {
        text-decoration: underline;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
