<template>
  <div class="containWrap">      
    <v-card class="cardG">
      <div>                 
        <p class="text-center address">
           {{account}} <span class="reftxt">(Address)</span>
        </p>
        <p class="text-center balance">
           {{balance}} Ether <span class="reftxt">(Balance)</span>
        </p>
      </div>
    </v-card>                 
  </div>
</template>
<script>
  export default {
    data() {
      return {       
        account: '',
        balance: null                
      }      
    },

    async mounted() {                             
      this.account = await this.$getDefaultAccount()      

      this.$web3.eth.getBalance(this.account, (error, result) => {        
        this.balance = this.$web3.fromWei(result, 'ether')
      })      
    },  

    methods: {
     
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