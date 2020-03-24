import DataService from '@/services/DataService'

const state = {
  items: []
}

const getters = {
  allEmployees: (state) => {
    return state.items
  }
}

const mutations = {
  setEmployees (state, employees) {
    state.items = employees
  },

  addEmployee (state, employee) {    
    state.items.unshift(employee)
  },

  updateEmployee (state, employee) {
    const index = state.items.findIndex(j => j.id === employee.id)    
    Object.assign(state.items[index], employee)
  },

  removeEmployee (state, {id}) {
    state.items = state.items.filter(j => j.id !== id)    
  }
}

const actions = {
  async getAllEmployees ({ commit }) {
    const response = await DataService.getEmployees()    
    commit('setEmployees', response.data.results)
  },
  async getEmployee ({ commit }, id) {
    const employee = await DataService.getEmployee(id)
    commit('employeeForm/setEmployee', employee.data.data, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}