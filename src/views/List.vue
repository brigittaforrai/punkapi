<template>
<div class="list">
  <h1 :style="this.route !== 'saved' ? 'margin:0': ''">{{title}}</h1>
  <filters v-if="route !== 'saved'"></filters>
  <paginator v-if="route !== 'saved'"></paginator>
  <beerList :type="route"></beerList>
</div>
</template>

<script>
import beerList from '@/components/beerList.vue'
import paginator from '@/components/paginator.vue'
import filters from '@/components/filters.vue'

export default {
  name: 'List',
  components: {
    beerList,
    paginator,
    filters
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
