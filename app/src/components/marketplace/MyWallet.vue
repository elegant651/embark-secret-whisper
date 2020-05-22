<template>
  <div class="containWrap">      
      <v-card class="cardG">
        <template v-if="isConnectWallet">
          <div>
            <p class="text-center address">
               {{myaddress}} <span class="reftxt">(Address)</span>
            </p>
            <p class="text-center balance">
               {{balance}} Ether <span class="reftxt">(Balance)</span>
            </p>
          </div>
        </template>
        <template v-else>
          <v-text-field
              v-model="privateKey"
              label="Private Key"
              type="password"
              solo
              required
            ></v-text-field>

          <v-btn outlined class="btnSubmit" @click="this.handleAddWallet">CONNECT WALLET</v-btn>          
        </template>
      </v-card>      

      <h2>Transfer</h2>
      <v-select v-model="selectedAuction" :items="auctionIds" label="Asset" @change="getAuctionById"></v-select>
      <div v-show="selectedAuction">
        <h3>Auction Info</h3>
        <div>Title: {{auctionInfo.title}}</div>
        <div>Price: {{auctionInfo.price}} KLAY</div>
        <div>TokenId: {{auctionInfo.tokenId}}</div>
        <div>Owner: {{auctionInfo.owner}}</div>
      </div>

      <v-text-field
        v-model="toAddress"
        label="To Address"
        required
      ></v-text-field>

      <v-btn @click="finalizeAuction" outlined color="teal">Finalize</v-btn>

      <v-snackbar
        v-model="snackbar" top>
        {{ snackbarMsg }}
        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        auctionIds:[],
        toAddress: null,
        selectedAuction: null,

        auctionInfo: {
          title: '',
          price: 0,
          tokenId: '',
          owner: ''
        },

        snackbar: false,
        snackbarMsg: '',

        privateKey: null,
      }      
    },

    computed: {
      
    },

    async mounted() {
      
    },

    methods: {      
      async handleAddWallet () {
        
      },

      async getWalletInfo () {        
        
      },
      
      async getMyAuctions() {
        
      },

      async getAuctionById() {
        
      },

      finalizeAuction() {
        if(!this.toAddress) {
          alert("please fill in to Address")
          return
        }

        
      }
    }

  }
</script>
<style scoped>  
  .containWrap {
    max-width: 600px;
    margin: 0 auto;
  }

  .cardG {
    margin: 10px;
    padding: 10px;
  }

  .cardG .reftxt {
    color: #b7afaf;
  }
</style>