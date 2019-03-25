<template>
<v-container>
  <v-layout column no-wrap justify-center>
    <v-flex>
      <v-range-slider :min="filters.abv.min" :max="filters.abv.max" v-model="filters.abv.val" :color="filters.abv.color" :label="filters.abv.label" :thumb-color="filters.abv.color" thumb-label></v-range-slider>
      <v-range-slider :min="filters.ibu.min" :max="filters.ibu.max"v-model="filters.ibu.val" :color="filters.ibu.color" :label="filters.ibu.label" :thumb-color="filters.ibu.color" thumb-label></v-range-slider>
      <v-range-slider :min="filters.ebc.min" :max="filters.ebc.max" v-model="filters.ebc.val" :color="filters.ebc.color" :label="filters.ebc.label" :thumb-color="filters.ebc.color" thumb-label></v-range-slider>
    </v-flex>
  </v-layout>
  <v-btn @click="filter('ibu')"
         style="margin: 15px 10px 0 0;"
         depressed
         color="orange"
         class="white--text">filter</v-btn>
 <v-btn @click="reset"
        style="margin: 15px 0 0 10px;"
        depressed
        color="rgb(150, 150, 150)"
        class="white--text">reset</v-btn>
</v-container>
</template>

<script>
export default {
  data: function() {
    return {
      filters: {
        abv: {
          label: 'Alcohol By Volume',
          val: [1, 30],
          color: 'orange',
          max: 30,
          min: 1,
        },
        ibu: {
          label: 'International Bitterness Units',
          val: [1, 200],
          color: 'blue',
          max: 200,
          min: 1,
        },
        ebc: {
          label: 'European Brewery Convention',
          val: [1, 90],
          max: 90,
          min: 1,
          color: 'red'
        }
      }
    }
  },
  methods: {
      filter() {
        Object.keys(this.filters).forEach((name) => {
          this.$store.commit('setFilter', {
            type:name,
            value:this.filters[name].val
          })
        })

        this.$store.dispatch('filter')
      },
    reset() {
      Object.keys(this.filters).forEach((name) => {
        let filter = this.filters[name]
        filter.val = [filter.min, filter.max]
      })
      this.$store.commit('resetFilters')
    }
  }
}
</script>

<style scoped>

</style>
