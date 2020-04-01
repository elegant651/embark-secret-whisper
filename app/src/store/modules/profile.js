
const state = {
  id: 'UPRXIXUtFLeFCq7gfWRcT8OXV8k2',
  nickname: 'cherryboy',
  profileUrl: '',
  isActive: true,
  userType: 1
}

const getters = {
  userData: state => {
  	return {
  	  id: state.id,
  	  nickname: state.nickname,
  	  profileUrl: state.profileUrl,
  	  isActive: state.isActive,
      userType: state.userType
  	}
  }
}

const mutations = {
  setData(state, user) {
    state.id = user.userId
    state.nickname = user.nickname
    state.profileUrl = user.profileUrl
    state.isActive = user.isActive
    state.userType = user.userType
  },
  clear() {
    state.id = ''
    state.nickname = ''
    state.profileUrl = ''
    state.isActive = false
    state.userType = 0
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