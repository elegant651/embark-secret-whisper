import DataService from '@/services/DataService'

const state = {
  id: '',
  content: '',
  assigner_id: '',
  assignee_id: '',
  is_submit: false
}

const getters = {
  formData: state => {
    return {
      content: state.content,
      assigner_id: state.assigner_id,
      assignee_id: state.assignee_id,
      is_submit: state.is_submit
    }
  }
}

const mutations = {
  setReview (state, review) {
    state.id = review.id
    state.content = review.content
    state.assigner_id = review.assigner_id
    state.assignee_id = review.assignee_id
    state.is_submit = review.is_submit
  },  
  clear() {
    state.id = ''
    state.content = ''
    state.assignee_id = ''
    state.assigner_id = ''
    state.is_submit = false
  }
}

const actions = {
  async registerReview ({ commit, getters }) {
    const data = getters.formData
    const review = await DataService.createReview(data)
    commit('reviews/addReview', {id: review.data.id, ...data}, { root: true })
  },
  async updateReview ({ commit, getters }, reviewId) {
    const data = getters.formData      
    await DataService.updateReview(reviewId, data)
    commit('reviews/updateReview', {id: reviewId, ...data}, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}