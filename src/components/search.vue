<template lang="html">
  <v-form v-on:submit.prevent="change" v-if="$route.name !== 'saved'">
    <v-container>
      <v-layout row>

        <v-flex xs8 sm10 md11>
          <v-text-field
          class="mt-2 mb-0"
            v-model="search"
            prepend-inner-icon="search"
            label="Search by name"
          ></v-text-field>
        </v-flex>

        <v-flex xs3 sm2 md1>
          <v-btn @click="reset"
                 style="margin-top: 16px;"
                 class="white--text"
                 depressed
                 color="rgb(150, 150, 150)">Reset</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: function () {
    return {
      search: ''
    }
  },
  methods: {
    change () {
      this.$store.commit('setSearch', this.search)
      this.$store.dispatch('searchName')

      if(this.$route.name === 'home') {
        this.$router.push({name: 'beers'})
      }
    },
    reset () {
      this.search = ''
      this.$store.commit('resetFilters')
    }
  }
}
</script>
