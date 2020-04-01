import Vue from 'vue'
import Vuex from 'vuex'

// import employees from '@/store/modules/employees'
// import employeeForm from '@/store/modules/employee-form'
// import reviews from '@/store/modules/reviews'
// import reviewForm from '@/store/modules/review-form'
import board from '@/store/modules/board'
import boardForm from '@/store/modules/board-form'
import message from '@/store/modules/message'
import profile from '@/store/modules/profile'
import room from '@/store/modules/room'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { 
    board,
    boardForm,
    message,
    profile,
    room
  }
})
