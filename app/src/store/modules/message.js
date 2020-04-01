
const state = {
  items: []
}

const getters = {
  allItems: (state) => state.items
}

const mutations = {
  setItem(state, items) {
    state.items = items    
  },
  addItem(state, msg) {
    state.items = [...state.items, msg]
  },  
  clear() {
    state.items = []
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}