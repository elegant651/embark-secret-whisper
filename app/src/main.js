import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import VueChatScroll from 'vue-chat-scroll'
import Web3 from 'web3'

Vue.use(VueChatScroll)

Vue.config.productionTip = false

Vue.mixin({
  async created() {  	
    // console.log(await ethereum.send('net_version'))

    // await ethereum.enable()

    this.$web3 = new Web3(ethereum)

    this.$getDefaultAccount = () => {
      return new Promise((resolve, reject) => {
        this.$web3.eth.getAccounts((err, data) => {
          if(!err) {
            this.$web3.eth.defaultAccount = data[0]
            resolve(data[0])
          }
          reject(err)
        })
      })
    }

    try {
      if (window.ethereum.isStatus) {
        console.log('status app found')
      } else {
        console.log('no Status app found')
      }     
    } catch (error) {
      console.error('e', error)
    }
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
