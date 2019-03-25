<template>
  <div class="about">
    <beerOverview :addToFav="true" :details="true" :beer="beer"></beerOverview>
  </div>
</template>

<script>
import beerOverview from './../components/beerOverview.vue'

export default {
  name: 'About',
  components: {beerOverview},
  computed: {
    beer () {
      return this.$store.getters.getBeer
    },
  }
}
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: 20px;
}

</style>
