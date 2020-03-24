import Api from '@/services/Api'

export default {
  
  getEmployees() {
    return Api().get('/employees')
  },

  getEmployee(id) {
    return Api().get(`/employees/${id}`)
  },

  createEmployee(data) {
    return Api().post('/employees', data)
  },

  updateEmployee(id, data) {
    return Api().put(`/employees/${id}`, data)
  },

  removeEmployee(id) {
    return Api().delete(`/employees/${id}`)
  },

  getReviews() {
    return Api().get('/reviews')
  },

  getReview(id) {
    return Api().get(`/reviews/${id}`)
  },

  createReview(data) {
    return Api().post('/reviews', data)
  },

  updateReview(id, data) {
    return Api().put(`/reviews/${id}`, data)
  }

}