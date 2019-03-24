<template>
    <v-container>
      <v-flex xs12 v-if="beer">
        <slot></slot>
        <v-card style="padding-bottom: 50px;">
          <v-card-actions v-if="addToFav" class="pa-3">
            <v-icon :color="isFav ? 'orange': 'gray'"
                    @click="save">star</v-icon>
          </v-card-actions>

          <v-layout column>
            <v-flex v-bind="{ [`xs${size}`]: true }">
              <v-img
                :lazy-src="placeholder"
                :src="beer.image_url || placeholder"
                height="350px"
                contain
              ></v-img>
            </v-flex>

            <v-flex v-bind="{ [`xs${size}`]: true }">
              <v-card-title primary-title>
                <div>
                  <div class="display-1 font-weight-black">{{beer.name}}</div>
                  <div class="headline" style="margin-bottom: 20px;">{{beer.tagline}}</div>
                  <div class="subheading font-weight-light" style="margin-bottom: 20px;">{{beer.description}}</div>
                  <div class="subheading font-weight-bold">Brewer's tips:</div>
                  <div class="subheading font-weight-light" style="margin-bottom: 20px;">{{beer.brewers_tips}}</div>
                  <div v-if="details" class="subheading font-weight-bold">
                    Perfect food pairing:
                    <ul v-for="food in beer.food_pairing">
                      <li class="subheading font-weight-light">{{food}}</li>
                    </ul>
                </div>
                </div>
              </v-card-title>

              <section v-if="details" style="padding: 16px;">
                <div class="subheading font-weight-bold">Ingredients:</div>
                <ul v-for="(value, key) in beer.ingredients">
                  <li>
                    <span class="subheading font-weight-light">{{key}}: </span>
                    <span v-if="value[k].name && value[k].name.length"
                          class="ingredients subheading font-weight-light"
                          v-for="(v, k, i) in value">{{value[k].name}}</span>
                  </li>
                </ul>
              </section>

              <v-list v-if="details" two-line justify-center style="padding: 16px">
                <template v-for="(value, key) in beer" v-if="listKeys.includes(key)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="`${key}: ${value}`"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

              </v-list>
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
    },
    size () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '4'
        case 'md': return '4'
        case 'lg': return '3'
        case 'xl': return '2'
      }
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
.ingredients:after {
  content: ', '
}
.ingredients:last-of-type:after {
  content: ''
}

</style>
