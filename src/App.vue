<template>
  <div class="app" id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  .app {
    max-width: 920px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
