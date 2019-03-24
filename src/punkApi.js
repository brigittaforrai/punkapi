import axios from 'axios'
import Store from './store.js'
import { FILTERS } from './constants.js'

const PUNK = 'https://api.punkapi.com/v2'

export default {
  getAllBeers: (pagesNum, perPage) => { // todo error
    let promises = []
    for (let i = 0; i < pagesNum; i++) {
      let page = i + 1
      let promise = new Promise((resolve, reject) => {
        axios.get(`${PUNK}/beers?per_page=${perPage}&page=${page}`).then((res) => {
          resolve(res.data)
        }).catch((e) => {
          Store.commit('newError', e.message)
        })
      })
      promises.push(promise)
    }
    return Promise.all(promises)
  },
  // getBeers: () => {
  //   let query = '?'
  //   const filters = Store.getters.getFilters
  //   Object.keys(filters).forEach((filter) => {
  //     if (filters[filter]) {
  //       query += a[filter] + '=' + filters[filter] + '&'
  //     }
  //   })
  //
  //   return axios.get(`${PUNK}/beers${query}`).then((res) => {
  //     return res.data
  //   }).catch((e) => {
  //     Store.commit('newError', e.message)
  //   })
  // },
  getBeerById: (id) => {
    return axios.get(`${PUNK}/beers/${id}`).then((res) => {
      return res.data
    }).catch((e) => {
      Store.commit('newError', e.message)
    })
  },
  getRandomBeer: () => {
    return axios.get(`${PUNK}/beers/random`).then((res) => {
      return res.data
    }).catch((e) => {
      Store.commit('newError', e.message)
    })
  }
}
