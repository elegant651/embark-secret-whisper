import DataService from '@/services/DataService'

const state = {
  items: []
}

const getters = {
  allReviews: (state) => {
    return state.items
  }
}

const mutations = {
  setReviews: (state, reviews) => {
    state.items = reviews
  },

  addReview (state, review) {
    state.items.unshift(review)
  },

  updateReview (state, review) {    
    const index = state.items.findIndex(j => j.id === review.id)        
    Object.assign(state.items[index], review)
  }
}

const actions = {
  async getAllReviews({ commit }) {
    const response = await DataService.getReviews()
    commit('setReviews', response.data.results)
  },
  async getReview ({ commit }, id) {
    const review = await DataService.getReview(id)
    commit('reviewForm/setReview', review.data.data, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}