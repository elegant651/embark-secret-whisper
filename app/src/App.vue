<template>
  <v-app>
    <v-navigation-drawer      
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <template v-if="isConnected">
          <template v-for="item in itemsOnAuth"> 
            <router-link :to="item.route" :key="item.text">
              <v-list-item>              
                <v-list-item-content>
                  <v-list-item-title class="menu_title">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </template>

          <v-divider class="mt-4"></v-divider>

          <v-subheader class="mt-4 grey--text text--darken-1">MY PROFILE</v-subheader>
          <router-link to="/profile">
            <v-list-item>
              <v-list-item-avatar>
                <img :src="getProfileImg" />
              </v-list-item-avatar>
              <v-list-item-title v-text="nickname" style="text-align: left; color:#acb3be; font-size: 12px;"></v-list-item-title>
            </v-list-item>
          </router-link>
        </template>

        <template v-else>
          <template v-for="item in itemsPublic"> 
            <router-link :to="item.route" :key="item.text">
              <v-list-item>              
                <v-list-item-content>
                  <v-list-item-title class="menu_title">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#FFF" app clipped-left dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"><img src="/img/ic-menu.png" srcset="/img/ic-menu@2x.png 2x,/img/ic-menu@3x.png 3x"></v-app-bar-nav-icon>
      <v-toolbar-title>Inssa Chat</v-toolbar-title> 
      <v-spacer></v-spacer>

      <template v-if="isConnected">        
        <div class="balance">{{parseFloat(balance).toFixed(4)}} Ether</div>
      </template>
      <template v-else>
        <v-btn outlined @click="goToProfile">Connect to Wallet</v-btn>
      </template>
    </v-app-bar>
    <v-content>
      <!-- <v-container fluid class="fill-height"> -->
        <router-view/>
      <!-- </v-container> -->
    </v-content>

    <v-footer id="footerWrap" height="auto" color="#0f194a">
      <v-layout justify-center row wrap>
        <v-flex py-2 text-xs-center xs12>
          &copy;2020 — <strong>Inssa Chat</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import {getIdenticon} from '@/util/identicon'

  export default {
    data: () => ({
      drawer: null,
      itemsPublic: [
        { text: 'Home', route: '/' },
        { text: 'Feed', route: '/feed' },
        { text: 'Secret Board', route: '/secret-board' },        
      ],
      itemsOnAuth: [
        { text: 'Home', route: '/' },
        { text: 'Chat', route: '/chat'},
        { text: 'Feed', route: '/feed' },
        { text: 'Secret Board', route: '/secret-board' },
        { text: 'Marketplace', route: '/marketplace'}
      ]
    }),
    computed: {
      ...mapState('wallet', [        
        'isConnected',        
        'address',
        'balance'
      ]),

      nickname () {
        return this.address
      },

      getProfileImg () {
        if (this.address) {
          return getIdenticon(this.address)  
        } else {
          return "/img/profile-medium.png"
        }        
      }
    },
    created () {
      this.connect()      
    },
    methods: {
      ...mapMutations('wallet', [        
        'setIsConnected',        
        'setAddress',
        'setBalance'
      ]),

      async connect () {
        try {
          if (window.ethereum) {
            const accounts = await ethereum.enable()
            const account = accounts[0]
            this.setAddress(account)
            this.setIsConnected(true)

            const balanceWei = await this.$web3.eth.getBalance(account)
            const balance = this.$web3.utils.fromWei(balanceWei, 'ether')
            this.setBalance(balance)
          }          
        } catch(error) {
          console.error(error)
        }
      },

      logout () {        
        this.setIsConnected(false)

        location.reload()
      },

      goToProfile () {
        this.$router.push('/profile')
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  text-decoration: none;
}

.btnMenu {
  margin: 5px;
}

.menu_title {
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0062ff;
  text-align: left;
}

.menu_title.logout {
  color: #acb3be;
}

#footerWrap {
  color: #fff;
  border: 3px solid #000;
  font-size: 12px;
}
</style>
