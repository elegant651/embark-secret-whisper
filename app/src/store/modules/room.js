
const state = {
  roomInfo: null
}

const getters = {
  roomInfo: state => state.roomInfo
}

const mutations = {
  setRoomInfo(state, roomInfo) {
    state.roomInfo = roomInfo
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