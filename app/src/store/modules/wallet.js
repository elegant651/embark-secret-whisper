
const state = {
  isConnected: false,
  isConnectWallet: false,
  address: '',
  balance: 0
}

const getters = {
  
}

const mutations = {
  setIsConnected(state, isConnected) {
    state.isConnected = isConnected
  },
  setIsConnectWallet(state, isConnected) {
    state.isConnectWallet = isConnected
  },  
  setBalance(state, balance) {
    state.balance = balance
  },
  setAddress(state, address) {
    state.address = address
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