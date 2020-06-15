<template>
  <div class="message" :class="{ 'message--current': isCurrentUser }">
    <p class="message__author" v-if="isCurrentUser">Вы</p>
    <p class="message__author" v-else>{{ message.username }}</p>
    <textarea rows="4" class="message__text-input" type="text" v-model="message.text" v-if="isEdit" required>
    </textarea>
    <p class="message__text" v-else>{{ message.text }}</p>
    <p class="message__date">{{ moment(message.date).format('DD.MM.YY hh:mm:ss') }}</p>
    <div class="message__buttons">
      <button class="message__button" v-if="isCurrentUser && !isEdit" @click="deleteMessage">Удалить</button>
      <button class="message__button" v-if="isCurrentUser && !isEdit" @click="isEdit = !isEdit">Изменить</button>
      <button class="message__button" v-if="isCurrentUser && isEdit" @click="editMessage">Сохранить</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Message',
  data () {
    return {
      isEdit: false,
      moment
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    isCurrentUser () {
      return this.message.username === this.currentUser.username
    }
  },
  methods: {
    deleteMessage () {
      this.$store.dispatch('deleteMessage', this.message.id)
    },
    editMessage () {
      this.isEdit = false
      this.$store.dispatch('editMessage', this.message)
    }
  }
}
</script>

<style scoped lang="scss">
  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .message {
    margin-bottom: 20px;
    max-width: 300px;
    background-color: white;
    padding: 10px;
    border-radius: 3px;

    &--current {
      margin-left: auto;
    }

    &__text {
      overflow-wrap: break-word;
      white-space: break-spaces;
    }

    &__text-input {
      width: 100%;
      resize: vertical;
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    &__button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
