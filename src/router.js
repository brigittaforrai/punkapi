import Vue from 'vue'
import Router from 'vue-router'
import Store from './store.js'
import Home from './views/Home.vue'
import About from './views/About.vue'
import List from './views/List.vue'
import { publicPath } from './../vue.config.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: publicPath,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        Store.dispatch('getRandomBeer').then(() => {
          next()
        })
      }
    },
    {
      path: '/beers',
      name: 'beers',
      component: List
    },
    {
      path: '/saved',
      name: 'saved',
      component: List
    },
    {
      path: '/about/:id',
      name: 'about',
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.beer) {
          Store.commit('setBeer', to.params.beer)
        } else {
          Store.dispatch('getBeerById', to.params.id)
        }
        next()
      },
      component: About
    }
  ]
})
