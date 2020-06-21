const state = {
  id: '',
  title: '',
  content: '',
  created_at: null
}

const getters = {
  formData: state => {
    return {
      id: state.id,
      title: state.title,
      content: state.content,
      created_at: state.created_at      
    }
  }
}

const mutations = {
  setContent (state, data) {
    state.id = data.id
    state.title = data.title
    state.content = data.content
    state.created_at = new Date()
  },  
  clear() {
    state.id = ''
    state.title = ''
    state.content = ''
    state.created_at = null
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