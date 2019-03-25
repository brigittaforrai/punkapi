<template>
<v-app id="app">
  <navigation></navigation>
  <search></search>
  <router-view />
</v-app>
</template>

<script>
import navigation from './components/navigation.vue'
import search from './components/search.vue'
export default {
  name: 'App',
  components: {
    navigation,
    search
  },
  mounted() {
    this.$store.dispatch('getAllBeers')
  },
}
</script>

<style>
html {
  height: 100%;
}

body,
#app {
  height: auto;
}

.application--wrap {
  height: 100%;
}

a:-webkit-any-link {
  text-decoration: none;
}
</style>
