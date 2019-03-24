<template>
  <div id="app">
    <navigation></navigation>
    <search></search>
    <router-view/>
  </div>
</template>

<script>
  import navigation from './components/navigation.vue'
  import search from '@/components/search.vue'
  export default {
    name: 'App',
    components: { navigation, search },
    mounted () {
      this.$store.dispatch('getAllBeers')
    },
  }
</script>

<style>
  body {
    font-family: Helvetica;
  }
  a:-webkit-any-link {
    text-decoration: none;
  }
</style>
