<template>
  <div>    
    <v-form class="form" ref="form">
      <v-text-field
        v-model="tokenId"
        label="Unique ID">
      </v-text-field>

      <input
        type="file"
        @change="captureFile" />

      <v-btn @click="uploadImg" outlined color="teal">UploadImg</v-btn>   
      <img :src="uploadedImg" width="300" />

      <v-text-field
        v-model="dataURI"   
        label="Data URI"
        required
        ></v-text-field>

      <v-btn @click="submit" outlined color="teal">Submit</v-btn>      

      <div v-show="isRegistered">
        <v-divider />
        <v-btn @click="transferToCA" class="ma-4" outlined color="teal">TransferToCA</v-btn>
        <v-divider />
      </div>
    </v-form>

    <PostAuction :tokenid="tokenId" :metadata="dataURI" /> 
  </div>	
</template>
<script>
import { mapGetters } from 'vuex'
import PostAuction from '@/components/PostAuction.vue'

export default {
  data() {
    return {      
      file: null,
      tokenId: null,
      isRegistered: false,
      dataURI: null
    }
  }, 

  components: {
    PostAuction
  },

  computed: {

    uploadedImg(){
      if (this.dataURI) {
        return 'https://gateway.ipfs.io/ipfs/'+this.dataURI  
      } else {
        return ''
      }      
    },
  },

  mounted() {
    this.account = await this.$getDefaultAccount()
    this.contractInstance = this.$web3.eth.contract(this.$config.MYNFT_ABI).at(this.$config.MYNFT_CA)

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

    submit() {
      if(!this.dataURI){
        alert("Fill in dataURI on the input")
        return
      }

      this.contractInstance.registerUniqueToken(this.account, this.tokenId, this.dataURI, {
          from: this.account,
          gas: this.$config.GAS_AMOUNT
        }, (error, result) => {
          console.log("result",result)          
      })

      this.watchTokenRegistered((error, result) => {
        if(!error) {
          alert("Token registered...!")
          this.isRegistered = true
        }
      })
    },

    transferToCA() {
      this.contractInstance.transferFrom(this.account, this.$config.AUCTIONS_CA, this.tokenId, {
          from: this.account,
          gas: this.$config.GAS_AMOUNT
        }, (error, result) => {
          console.log("result",result)         
      })

      this.watchTransfered((error, result) => {
        if(!error) alert("Token transfered to CA...!")
      })
    }

    async watchTokenRegistered(cb) {
      const currentBlock = await this.getCurrentBlock()
      const eventWatcher = this.contractInstance.TokenRegistered({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
      eventWatcher.watch(cb)
    },

    async watchTransfered(cb) {
      const currentBlock = await this.getCurrentBlock()
      const eventWatcher = this.contractInstance.Transfer({}, {fromBlock: currentBlock - 1, toBlock: 'latest'})
      eventWatcher.watch(cb)
    },

    getCurrentBlock() {
      return new Promise((resolve, reject ) => {
        this.$web3.eth.getBlockNumber((err, blocknumber) => {
            if(!err) resolve(blocknumber)
            reject(err)
        })
      })
    },   
  }

}
</script>