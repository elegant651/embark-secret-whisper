
const state = {
  items: [{
    id: 1,
    title: 'new secret message',
    content: '',
    created_at: '09 Jan 2020'
  },
  {
    id: 2,
    title: 'new secret message2',
    content: '',
    created_at: '01 Jan 2020'
  }]
}

const getters = {
  allItems: (state) => {
    return state.items
  },
  numItems: (state) => state.items.length
}

const mutations = {
  setItems: (state, items) => {
    state.items = items
  },

  addItem (state, item) {
    state.items.unshift(item)
  },

  removeItem (state, item) {
    state.items = state.items.filter(data => data.id === item.id)
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