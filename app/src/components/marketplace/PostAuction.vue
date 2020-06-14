<template>
  <div>
    <v-form class="form" ref="form">      
      <v-text-field
      	v-model="tokenid"
      	></v-text-field>

        <v-text-field
            v-model="auction.auctionTitle"
            placeholder="e.g. My NFT"
            label="Auction title"
            persistent-hint
            ></v-text-field>

        <v-text-field
            v-model="auction.price"
            placeholder="e.g. 1"
            label="Price"
            type="number"
            persistent-hint
            ></v-text-field>

        <v-btn @click="createAuction" outlined color="teal">Create Auction</v-btn>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['tokenid', 'metadata'],

  data() {
    return {      
      contractInstance: null,

      auction: {
        auctionTitle: '',
        price: null
      },
    }
  },

  computed: {
    ...mapState('wallet', [      
      'address',
    ]),
  },

  async mounted() {    
    this.contractInstance = new this.$web3.eth.Contract(this.$config.AUCTIONS_ABI, this.$config.AUCTIONS_CA)
  },

  methods: {
    async createAuction() {
      if(!this.tokenid) {
        alert("Check for tokenId")
        return
      }

      const price = this.$web3.toWei(this.auction.price, 'ether')
      await this.contractInstance.methods.createAuction(this.$config.MYNFT_CA, this.tokenid, this.auction.auctionTitle, this.metadata, price)
        .send({from: this.address, gas: this.$config.GAS_AMOUNT})

      this.watchCreated((error, result) => {
        if(!error) alert("Creation completed...!")
      })    
    },

    async watchCreated(cb) {
      const currentBlock = await this.getCurrentBlock()
      const eventWatcher = this.contractInstance.AuctionCreated({fromBlock: currentBlock - 1})
      eventWatcher.watch(cb)
    },

    async getCurrentBlock() {
      return await this.$web3.eth.getBlockNumber()      
    }
  }
}
</script>