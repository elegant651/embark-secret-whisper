import Vue from 'vue'
import Vuex from 'vuex'

import board from '@/store/modules/board'
import boardForm from '@/store/modules/board-form'
import message from '@/store/modules/message'
import profile from '@/store/modules/profile'
import room from '@/store/modules/room'
import wallet from '@/store/modules/wallet'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    board,
    boardForm,
    message,
    profile,
    room,
    wallet
  }
})
