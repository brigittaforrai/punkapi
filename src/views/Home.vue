<template>
<div class="home">
  <h1>PUNK API</h1>
  <h5>by brigittaforrai</h5>

  <beerOverview :beer="randomBeer" :addToFav="true" :details="false" style="position:relative">
    <section>
      <h2>Random beer</h2>
      <v-btn @click="getNew" class="white--text" depressed color="orange">Get new!</v-btn>
      <!-- TODO -->
      <router-link class="read-more" :to="{ name: 'about', params: {id: randomBeer.id, beer: randomBeer}}">read more</router-link>
    </section>
  </beerOverview>

</div>
</template>

<script>
import beerOverview from './../components/beerOverview.vue'

export default {
  name: 'home',
  components: {
    beerOverview
  },
  methods: {
    getNew() {
      this.$store.dispatch('getRandomBeer')
    }
  },
  computed: {
    randomBeer() {
      return this.$store.getters.getRandomBeer
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 24px auto 8px auto;
  font-size: 3em;
}

h1,
h5 {
  text-align: center;
}

section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
}

section button {
  margin: 0;
}

.read-more {
  position: absolute;
  right: 20px;
  bottom: 15px;
  z-index: 5;
  margin: 20px;
  color: orange;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
