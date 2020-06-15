<template>
  <div class="auth">
    <form class="auth__form" @submit.prevent="validateBeforeSubmit">
      <div class="auth__input">
        <label class="auth__label" for="username">Введите имя</label>
        <input class="auth__text" type="text" v-model="username" name="username" required>
      </div>
      <button class="auth__button" type="submit">{{ submitText[type] }}</button>
      <p class="auth__error" v-if="error">{{ error }}</p>
    </form>
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
              this.$store.dispatch('createError', error.message)
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
              this.$store.dispatch('createError', error.message)
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
<style lang="scss" scoped>
  .auth {
    padding: 10px;

    &__form {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
    }

    &__input {
      margin-bottom: 10px;
      text-align: center;
    }

    &__label {
      margin-right: 10px;
    }

    &__button {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    &__error {
      color: red;
      text-align: center;
    }
  }
</style>
