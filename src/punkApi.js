import axios from 'axios'
import Store from './store.js'

const PUNK = 'https://api.punkapi.com/v2'

export default {
  getAllBeers: (pagesNum, perPage) => {
    let promises = []
    for (let i = 0; i < pagesNum; i++) {
      let page = i + 1
      let promise = new Promise((resolve, reject) => {
        axios.get(`${PUNK}/beers?per_page=${perPage}&page=${page}`).then((res) => {
          resolve(res.data)
        }).catch((e) => {
          Store.commit('newError', e.message)
          reject(new Error(e.message))
        })
      })
      promises.push(promise)
    }
    return Promise.all(promises)
  },
  filterBeers: (filters) => {
    let query = '?'
    Object.keys(filters).forEach((name) => {
      if (filters[name] && name !== 'search') {
        query += `${name}_gt=${filters[name][0]}&${name}_lt=${filters[name][1]}&`
      }
    })

    return axios.get(`${PUNK}/beers${query}`).then((res) => {
      return res.data
    }).catch((e) => {
      Store.commit('newError', e.message)
    })
  },
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
