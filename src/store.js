import Vue from 'vue'
import Vuex from 'vuex'
import punkApi from './punkApi.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: [],
    beers: [],
    filteredBeers: [],
    randomBeer: null,
    selectedBeer: null,
    itemNum: 325, // punk api does not return any info about how many items are there in the db
    currentPage: 1,
    perPage: 48,
    search: null,
    filters: {
      abv: null,
      ibu: null,
      ebc: null
    }
  },
  getters: {
    getPageNum: (state) => {
      return Math.ceil(state.filteredBeers.length / state.perPage)
    },
    getCurrentPage: (state) => {
      return state.currentPage
    },
    getBeers: (state) => {
      return state.filteredBeers
    },
    getBeer: (state) => {
      return state.selectedBeer
    },
    getRandomBeer: (state) => {
      return state.randomBeer
    },
    getFilters: (state) => {
      return state.filters
    }
  },
  mutations: {
    newError: (state, e) => {
      state.errors.push(e)
    },
    setBeers: (state, beers) => {
      state.beers = beers
      state.filteredBeers = beers
    },
    setBeer: (state, beer) => {
      state.selectedBeer = beer
    },
    setRandomBeer: (state, beer) => {
      state.randomBeer = beer
    },
    setPage: (state, num) => {
      state.currentPage = num
    },
    setFilter: (state, {type, value}) => {
      state.filters[type] = value
    },
    setSearch: (state, val) => {
      state.search = val
    },
    resetFilters: (state) => {
      state.filteredBeers = state.beers
    }
  },
  actions: {
    getAllBeers: ({state, commit}) => {
      let pagesNum = Math.ceil(state.itemNum / state.perPage)
      punkApi.getAllBeers(pagesNum, state.perPage).then((values) => {
        let beers = flattenList(values)
        commit('setBeers', beers)
      })
    },
    getBeerById: ({state, commit}, id) => {
      return punkApi.getBeerById(id).then((beer) => {
        commit('setBeer', beer[0])
      })
    },
    getRandomBeer: ({state, commit}) => {
      return punkApi.getRandomBeer().then((beer) => {
        commit('setRandomBeer', beer[0])
      })
    },
    searchName: (context) => {
      let search = context.state.search
      let filtered = context.state.beers.filter((beer) => {
        return replaceText(beer.name).includes(replaceText(search))
      })
      context.state.filteredBeers = filtered
      context.state.currentPage = 1
    },
    filter: (context) => {
      let filters = context.state.filters
      punkApi.filterBeers(filters).then((res) => {
        context.state.filteredBeers = res
      })
      context.state.currentPage = 1
    }
  }
})

function replaceText (text) {
  return text.replace(/[^a-zA-Z ]/g, "").trim().split(' ').join('').toLowerCase()
}

function flattenList (list) {
  let newArr = []
  list.forEach((arr) => {
    newArr = newArr.concat(arr)
  })
  return newArr
}
