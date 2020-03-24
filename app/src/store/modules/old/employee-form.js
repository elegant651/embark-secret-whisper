import DataService from '@/services/DataService'

const state = {
  id: '',
  email: '',
  name: '',
  feedbacks: []
}

const getters = {
  formData: state => {
    return {
      email: state.email,
      name: state.name
    }
  },
  pendingReviews: state => {    
    return state.feedbacks.filter(f => f.is_submit === false)
  }
}

const mutations = {
  setEmployee(state, employee){
    state.id = employee.id
    state.email = employee.email
    state.name = employee.name
    if(employee.feedbacks) {
      state.feedbacks = Object.values(employee.feedbacks)
    }    
  },
  clear() {
    state.id = ''
    state.email = ''
    state.name = ''
    state.feedbacks = []
  }
}

const actions = {
  async registerEmployee ({ commit, getters }) {
    const data = getters.formData
    const employee = await DataService.createEmployee(data)
    commit('employees/addEmployee', {id: employee.data.id, ...data}, { root: true })
  },
  async updateEmployee ({ commit, getters }, employeeId) {
    const data = getters.formData
    await DataService.updateEmployee(employeeId, data)
    commit('employees/updateEmployee', {id: employeeId, ...data}, { root: true })
  },
  async removeEmployee ({ commit }, employeeId) {
    await DataService.removeEmployee(employeeId)
    commit('employees/removeEmployee', {id: employeeId}, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}