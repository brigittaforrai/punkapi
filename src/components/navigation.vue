<template>
    <v-toolbar :color="'orange'" flat>

      <router-link class="link" to="/">
        <img class="icon" src="./../assets/images/beer.svg"></img>
        <h2 :class="$vuetify.breakpoint.name === 'xs' ? 'hidden': ''">PUNK API</h2>
      </router-link>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link class="link" to="/"><v-btn class="white--text" flat>Home</v-btn></router-link>
        <router-link class="link" to="/beers"><v-btn class="white--text" flat>Beers</v-btn></router-link>
        <router-link class="link" to="/saved"><v-btn class="white--text" flat>Saved</v-btn></router-link>
      </v-toolbar-items>

    </v-toolbar>
</template>

<script>
  export default {
    name: 'navigation'
  }
</script>

<style scoped>
  .link {
    height: 100%;
    align-items: center;
    display: flex;
  }
  .icon {
    height: 70%;
    width: auto;
  }
  h2 {
    display: inline-block;
    margin-left: 8px;
    margin-right: 10px;
    color: white;
  }
  h2.hidden {
    display: none;
  }
</style>
