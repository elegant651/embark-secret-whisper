<template>
  <div class="pa-3">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Step 1</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Step 2</v-stepper-step>
      </v-stepper-header>


      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form class="form" ref="form">
            <v-text-field
              v-model="tokenId"
              disabled
              label="Unique ID">
            </v-text-field>

            <input
              type="file"
              @change="captureFile" />

            <v-btn @click="uploadImg" outlined color="teal">Upload Image</v-btn>   
            <img :src="uploadedImg" width="300" />

            <v-text-field
              v-model="dataURI"   
              label="Data URI"
              disabled
              required
              ></v-text-field>

            <v-btn @click="submit" outlined color="teal">Submit</v-btn>      

            <!-- <div v-show="isRegistered">
              <v-divider />
              <v-btn @click="transferToCA" class="ma-4" outlined color="teal">TransferToCA</v-btn>
              <v-divider />
            </div> -->
          </v-form>
        </v-stepper-content>
      

      <v-stepper-content step="2">        
        <div>
          <v-form class="form" ref="form">
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
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>	
</template>
<script>
import { mapState } from 'vuex'
import PostAuction from '@/components/marketplace/PostAuction.vue'

export default {
  data() {
    return {
      caNFT: null,
      caAuction: null,

      e1: 1,
      file: null,
      tokenId: null,
      // isRegistered: false,
      dataURI: null,

      auction: {
        auctionTitle: '',
        price: null
      },
    }
  }, 

  components: {
    PostAuction
  },

  computed: {
    ...mapState('wallet', [      
      'address',
    ]),

    uploadedImg(){
      if (this.dataURI) {
        return 'https://gateway.ipfs.io/ipfs/'+this.dataURI  
      } else {
        return ''
      }      
    },
  },

  mounted() {    
    this.caNFT = new this.$web3.eth.Contract(this.$config.MYNFT_ABI, this.$config.MYNFT_CA)
    this.caAuction = new this.$web3.eth.Contract(this.$config.AUCTIONS_ABI, this.$config.AUCTIONS_C)

    this.tokenId = this._getRandomInt(123456789,999999999)              
  },

  methods: {
    _getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    captureFile(event) {
      event.stopPropagation()
      this.file = event.target.files[0]
    },

    uploadImg() {
      if(!this.file){
        alert("Please put the file on input.")
        return
      }
      
      const formData = new FormData()
      formData.append('file', this.file)
      this.axios({
        method: 'post',
        baseURL: 'https://ipfs.infura.io:5001',
        url: '/api/v0/add',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response)=> {
        this.dataURI = response.data.Hash
      })
    },

    async submit() {
      if(!this.dataURI){
        alert("Fill in dataURI on the input")
        return
      }

      await this.caNFT.methods.registerUniqueToken(this.$config.AUCTIONS_CA, this.address, this.tokenId, this.dataURI).send({
          from: this.address,
          gas: this.$config.GAS_AMOUNT
        })
        .on('transactionHash', (transactionHash) => { 
          alert("tx:"+transactionHash)
          // this.isRegistered = true
        })
        .on('error', (error, receipt) => {
          alert(error)
        });
      
    },

    // async transferToCA() {
    //   await this.caNFT.methods.transferFrom(this.address, this.$config.AUCTIONS_CA, this.tokenId).send({
    //       from: this.address,
    //       gas: this.$config.GAS_AMOUNT
    //     })
    //   .on('transactionHash', (transactionHash) => { 
    //     alert("tx:"+transactionHash)
    //     alert("Token transfered to CA...!")
    //   }).on('error', (error, receipt) => {
    //     alert(error)
    //   });      
    // },

    async createAuction() {
      if(!this.tokenId) {
        alert("Check for tokenId")
        return
      }

      const price = await this.$web3.utils.toWei(this.auction.price, 'ether')      
      await this.caAuction.methods.createAuction(this.$config.MYNFT_CA, this.tokenId, this.auction.auctionTitle, this.metadata, price)
        .send({from: this.address, gas: this.$config.GAS_AMOUNT})
      .on('transactionHash', (transactionHash) => {
        alert("tx:"+transactionHash) 
        alert("Creation completed...!")
      })      
      .on('error', (error, receipt) => {
        alert(error)
      });
 
    }    
  }

}
</script>