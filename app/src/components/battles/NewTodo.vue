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

            <!-- <v-btn @click="uploadImg" outlined color="teal">Upload Image</v-btn>    -->
            <!-- <img :src="uploadedImg" width="300" /> -->

            <!-- <v-text-field
              v-model="dataURI"   
              label="Data URI"
              disabled
              required
              ></v-text-field> -->

            <div class="ma-3">  
              <v-btn v-if="!isLoading" @click="uploadImg" outlined color="teal">Submit</v-btn>      
              <v-progress-circular v-else indeterminate></v-progress-circular>
            </div>

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
                  v-model="todo.todoTitle"
                  placeholder="e.g. Brush my teeth"
                  label="Todo title"
                  persistent-hint
                  ></v-text-field>

              <v-text-field
                  v-model="todo.price"
                  placeholder="e.g. 0.1"
                  label="Price"
                  type="number"
                  persistent-hint
                  ></v-text-field>

              <v-btn v-if="!isLoading" @click="createTodo" outlined color="teal">Create Todo</v-btn>
              <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-form>
        </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>	
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      caNFT: null,
      caAuction: null,

      e1: 1,
      file: null,
      tokenId: null,
      isLoading: false,
      // isRegistered: false,
      dataURI: null,

      todo: {
        todoTitle: '',
        price: null
      },
    }
  }, 

  components: {    
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
    this.caAuction = new this.$web3.eth.Contract(this.$config.AUCTIONS_ABI, this.$config.AUCTIONS_CA)

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
      
      this.isLoading = true

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

        this.submit()
      }).catch(error => {
        alert(error)
        this.isLoading = false
      })
    },

    async submit() {
      await this.caNFT.methods.registerUniqueToken(this.$config.AUCTIONS_CA, this.address, this.tokenId, this.dataURI).send({
          from: this.address,
          gas: this.$config.GAS_AMOUNT
        })
        .on('transactionHash', (transactionHash) => { 
          alert("tx:"+transactionHash)
          this.isLoading = false

          this.e1 = 2
          // this.isRegistered = true
        })
        .on('error', (error, receipt) => {
          alert(error)
          this.isLoading = false
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

    async createTodo() {
      if(!this.tokenId) {
        alert("Check for tokenId")
        return
      }

      this.isLoading = true

      const price = await this.$web3.utils.toWei(this.todo.price, 'ether')      
      await this.caAuction.methods.createAuction(this.$config.MYNFT_CA, this.tokenId, this.todo.todoTitle, this.dataURI, price)
        .send({from: this.address, gas: this.$config.GAS_AMOUNT})
      .on('transactionHash', (transactionHash) => {
        this.isLoading = false        
        alert("Creation completed...! tx:"+transactionHash)
        this.$router.push('/marketplace')
      })      
      .on('error', (error, receipt) => {
        this.isLoading = false
        alert(error)
      });
 
    }    
  }

}
</script>