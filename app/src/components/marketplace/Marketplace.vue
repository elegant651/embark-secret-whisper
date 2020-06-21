<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(auction, index) in auctions" :key="index" xs4>
        <v-card>
          <v-img :src="auction.image" height="200px"></v-img>
          
          <div>Title: {{auction.title}}</div>
          <div>Price: {{auction.price}} Ether</div>
          <div>TokenId: {{auction.tokenId}}</div>
          <div>Owner: {{auction.owner}}</div>
          <div>Active: {{auction.active}}</div>
          <div>Finalized: {{auction.finalized}}</div>        
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import { mapState } from 'vuex'

export default {
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
      
        console.log('count', count)

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
    }
  }
}
</script>