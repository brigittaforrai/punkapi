<template>
    <v-container>
      <v-flex xs12 v-if="beer">
        <slot></slot>
        <v-card style="padding:0px 50px 50px 0">
          <v-card-actions v-if="addToFav" class="pa-3">
            <v-icon :color="isFav ? 'orange': 'gray'" @click="save">star</v-icon>
          </v-card-actions>

          <v-layout style="padding-top: 50px;">
            <v-flex xs4>
              <v-img
                :lazy-src="placeholder"
                :src="beer.image_url || placeholder"
                height="350px"
                contain
              ></v-img>

              <v-list v-if="details" two-line justify-center style="padding-left: 24px; padding-top: 50px;">
                <template v-for="(value, key) in beer" v-if="listKeys.includes(key)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${key}: ${value}`"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>

            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline font-weight-black">{{beer.name}}</div>
                  <div class="subheading" style="margin-bottom: 20px;">{{beer.tagline}}</div>
                  <div style="margin-bottom: 20px;">{{beer.description}}</div>
                  <div class="font-weight-bold">Brewer's tips:</div>
                  <div style="margin-bottom: 20px;">{{beer.brewers_tips}}</div>
                  <div class="font-weight-bold">Food pairing:</div>
                  <div>{{beer.food_pairing}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>

        </v-card>
      </v-flex>
    </v-container>
</template>

<script>
import placeHolder from '@/assets/images/beerPlaceholder.svg'

export default {
  name: 'overview',
  props: ['beer', 'addToFav', 'details'],
  data: function () {
    return {
      listKeys: ['first_brewed', 'abv', 'ibu', 'target_fg', 'target_og', 'ebc', 'srm', 'ph', 'attenuation_level', 'contributed_by'],
      savedItems: [],
      placeholder: placeHolder
    }
  },
  mounted () {
    let saved = localStorage ? localStorage.getItem('punkApiFavs') : []
    this.savedItems = saved ? JSON.parse(saved) : []
  },
  computed: {
    isFav () {
      return this.savedItems.find((item) => {
        return parseInt(item.id) === parseInt(this.beer.id)
      })
    }
  },
  methods: {
    save () {
      if (!this.isFav) {
        this.savedItems.push(this.beer)
        if (localStorage) {
          localStorage.setItem('punkApiFavs', JSON.stringify(this.savedItems))
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
