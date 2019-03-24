<template lang="html">
  <div class="home">
    <h1>PUNK API</h1>
    <h5>by brigittaforrai</h5>

    <beerOverview :beer="randomBeer" :addToFav="true" :details="false">
      <section>
        <h2>Random beer</h2>
        <v-btn @click="getNew" depressed color="orange">Get new!</v-btn>
      </section>
    </beerOverview>
  </div>
</template>

<script>
import beerOverview from './../components/beerOverview.vue'

export default {
  name: 'home',
  components: { beerOverview },
  methods: {
    getNew () {
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
  h1, h5 {
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
</style>
