<template>
  <div class="auth">
    <form @submit.prevent="validateBeforeSubmit">
      <label for="username">Введите имя</label>
      <input type="text" v-model="username" name="username" required>
      <button type="submit">{{ submitText[type] }}</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  props: {
    type: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      username: '',
      submitText: {
        signIn: 'Войти',
        signUp: 'Зарегистрироваться'
      }
    }
  },
  computed: {
    userList () {
      return this.$store.getters.users
    },
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    validateBeforeSubmit () {
      if (this.type === 'signIn') {
        this.login()
          .then(
            result => {
              this.$store.dispatch('clearError')
              this.$router.push('/chat')
            },
            error => {
              this.$store.dispatch('createError', error)
            }
          )
      }
      if (this.type === 'signUp') {
        this.register()
          .then(
            result => {
              this.$store.dispatch('clearError')
              this.$router.push('/chat')
            },
            error => {
              this.$store.dispatch('createError', error)
            }
          )
      }
    },
    register () {
      return new Promise((resolve, reject) => {
        if (this.userList.findIndex((element) => element.username === this.username) === -1) {
          this.$store.dispatch('createUser', this.username)
          this.$store.dispatch('setCurrentUser', this.username)
          resolve('registered')
        } else {
          reject(new Error('Пользователь с таким именем уже существует'))
        }
      })
    },
    login () {
      return new Promise((resolve, reject) => {
        if (this.userList.findIndex((element) => element.username === this.username) !== -1) {
          this.$store.dispatch('setCurrentUser', this.username)
          resolve('logined')
        } else {
          reject(new Error('Пользователь с таким именем не найден'))
        }
      })
    }
  }
}
</script>
