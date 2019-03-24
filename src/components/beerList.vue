<template lang="html">
        <v-container fill-height grid-list-lg text-xs-center>
          <v-layout style="margin-bottom: 50px;" row wrap align-center>
            <v-flex v-for="beer in beers" v-bind="{ [`xs${size}`]: true }">
              <v-hover>
                <v-card hover
                        slot-scope="{hover}"
                        :to="{ name: 'about', params: {id: beer.id, beer: beer}}"
                        style="padding-top: 24px; height: 340px;">
                  <v-expand-transition>
                    <div v-if="hover"
                         class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal white--text"
                         style="">{{beer.description.length > 250 ? `${beer.description.substring(0,250)}...` : beer.description}}
                    </div>
                  </v-expand-transition>
                  <v-img class="white--text"
                         :lazy-src="placeholder"
                         :src="beer.image_url || placeholder"
                         contain
                         height="200px">

                  </v-img>
                  <v-card-title primary-title center>
                    <div style="width: 100%">
                      <h3 class="text-truncate font-weight-medium headline">{{beer.name}}</h3>
                      <div style="margin-top: 8px;">{{beer.tagline.length > 40 ? `${beer.tagline.substring(0,40)}...` : beer.tagline}}</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
</template>

<script>
import placeHolder from '@/assets/images/beerPlaceholder.svg'

export default {
  name: 'beer-list',
  props: ['type'],
  data: function() {
    return {
      placeholder: placeHolder
    }
  },
  computed: {
    size () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '4'
        case 'md': return '4'
        case 'lg': return '3'
        case 'xl': return '2'
      }
    },
    beers () {
      let array = []

      if (this.type === 'saved') {
        if (localStorage) {
          let saved = localStorage.getItem('punkApiFavs')
          array = saved ? JSON.parse(saved) : []
        }
      } else {
        array = this.$store.getters.getBeers
      }

      let perPage = this.$store.state.perPage
      let from = this.page * perPage
      let to = from + perPage
      return array.slice(from, to)
    },
    page () {
      return this.$store.getters.getCurrentPage -1
    }
  },
  methods: {
    cropText(text) {
      // todo
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: auto;
  padding: 10px;
  top: 0;
  height: 224px;
  z-index: 20;
}
</style>
