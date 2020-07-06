<template>
<div>  
  <v-card class="cardContent mx-auto mb-4" max-width="400" max-height="400"
    v-for="(auction, index) in auctions" :key="index">
    <v-list-item>
      <v-list-item-avatar color="grey"><img :src="getProfile(auction.owner)" /></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{auction.title}}</v-list-item-title>
        <v-list-item-subtitle>{{auction.price}} Ether</v-list-item-subtitle>
      </v-list-item-content>
      <div class="flex-grow-1"></div>      
      <img v-if="auction.active" src="/img/heart-on.png" />
      <img v-else src="/img/heart-off.png" />
    </v-list-item>

    <v-img :src="auction.image" height="194"></v-img>

    <!-- <p class="ma-4">{{item.content}}</p> -->

    <v-card-actions>
      <!-- <v-btn
        text
        color="deep-purple accent-4"
        @click="getOwner"
      >
        Get Owner
      </v-btn> -->
      <v-btn
        text
        color="deep-purple accent-4"
        @click="signing(auction)"
      >
        Signing
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="joinChat(index)"
      >
        Join Chat
      </v-btn>       
    </v-card-actions>
  </v-card>
</div>  
</template>

<script>
const sigUtil = require('eth-sig-util')
import { mapState } from 'vuex'

import {getIdenticon} from '@/util/identicon'

export default {  
  components: {
    
  },
  data() {
    return {
      ciMyNFT: null,
      ciAuctions: null,
      auctions: []
    }    
  },

  computed: {
    ...mapState('wallet', [
      'address'
    ]),
  },

  mounted() {
    this.ciAuctions = new this.$web3.eth.Contract(this.$config.AUCTIONS_ABI, this.$config.AUCTIONS_CA)
    // this.ciAuctions.options.from = this.address
    this.ciMyNFT = new this.$web3.eth.Contract(this.$config.MYNFT_ABI, this.$config.MYNFT_CA)

    this.getAuctions()
  },

  methods: {
    async getAuctions() {
      const count = await this.ciAuctions.methods.getCount().call() 

        for(let i=0; i<count; i++) {

          const result = await this.ciAuctions.methods.getAuctionById(i).call()
          const owner = await this.ciMyNFT.methods.ownerOf(result[3]).call()
          this.auctions.push({
            title: result[0],
            price: this.$web3.utils.fromWei(result[1], 'ether'),
            image: 'https://gateway.ipfs.io/ipfs/'+result[2],
            tokenId: result[3],
            owner: owner,
            active: result[6],
            finalized: result[7]
          })
        }
    },

    getProfile (user_name) {
      return getIdenticon(user_name)      
    },
    getImage (url) {
      if(url) {
        return url
      } else {
        return ''
      }     
    },
    // getCreatedAt (createdAt) {      
    //   return tformat(new Date(createdAt*1000))
    // },

    async getOwner() {
      // if someone who try to buy things with above price, it should transfer ownership to them.
      
    },

    async signing(auction) {
      // const DOMAIN = [
      //   { name: "name", type: "string" },
      //   { name: "version", type: "string" },
      //   { name: "chainId", type: "uint256" },
      //   { name: "verifyingContract", type: "address" },
      //   { name: "salt", type: "bytes32" },
      // ];

      // const VALUES = [
      //     { name: "Title", type: "string" },
      //     { name: "Amount", type: "string" },
      // ];

      // const DOMAIN_DATA = {
      //     name: "EthSignTypedDataV3",
      //     version: "1",
      //     chainId: "4",
      //     verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070", //TODO change
      //     salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558" //TODO change
      // };

      // const message = {
      //   'Title':  auction.title,
      //   'Amount': auction.price
      // }        

      // const data = JSON.stringify({
      //     types: {
      //         EIP712Domain: DOMAIN,
      //         Values: VALUES
      //     },
      //     // domain: DOMAIN_DATA,
      //     primaryType: "Values",
      //     message: message
      // });

      const msgParams = [
        {
          type: 'string',      // Any valid solidity type
          name: 'Title',     // Any string label you want
          value: auction.title  // The value to sign
       },
       {   
         type: 'uint32',
            name: 'Amount',
            value: auction.price
        }
      ]


      const from = this.address   

      this.$web3.currentProvider.sendAsync({
        method: 'keycard_signTypedData',
        params: [msgParams, from],
        from: from,
      }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
          return console.error(result.error.message)
        }
        console.log('dd', result)
        const recovered = sigUtil.recoverTypedSignature({
          data: msgParams,
          sig: result.result
        })
        if (recovered === from ) {
          alert('Recovered signer: ' + from)
        } else {
          alert('Failed to verify signer, got: ' + result)
        }
      })
    },

    joinChat(index) {
      // join channel in chat room
      const channelId = 'channel'+index
      this.$router.push(`/chat/${channelId}`)
    }
  }
  
}
</script>

<style scoped>
.cardContent {
  text-align: left;
}

.v-list-item__title {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
}

.v-list-item__subtitle {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #7f899a;
}
</style>