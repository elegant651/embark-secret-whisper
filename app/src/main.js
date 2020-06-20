import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import VueChatScroll from 'vue-chat-scroll'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Web3 from 'web3'
import Config from './config'

Vue.use(VueChatScroll)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
  async created() {  	
    // console.log(await ethereum.send('net_version'))
    
    if (window.ethereum) {
      this.$web3 = new Web3(window.ethereum)
    }
        
    this.$config = Config

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
