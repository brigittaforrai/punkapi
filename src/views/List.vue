<template>
  <div class="list">
    <h1>{{title}}</h1>
    <paginator v-if="route !== 'saved'"></paginator>
    <beerList :type="route"></beerList>
  </div>
</template>

<script>
import beerList from '@/components/beerList.vue'
import search from '@/components/search.vue'
import paginator from '@/components/paginator.vue'

export default {
  name: 'List',
  components: {
    beerList,
    search,
    paginator
  },
  computed: {
    route() {
      return this.$route.name
    },
    title() {
      return this.route === 'saved' ? 'Your favourite beers' : 'Find your favoure beers'
    }
  }
}
</script>
<style scoped>
  h1 {
    text-align: center;
    margin: 50px auto;
  }
</style>
