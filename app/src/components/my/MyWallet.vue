<template>
  <div class="containWrap">      
    <v-card class="cardG">
      <div>                 
        <p class="text-center address">
           {{address}} <span class="reftxt">(Address)</span>
        </p>
        <p class="text-center balance">
           {{balance}} Ether <span class="reftxt">(Balance)</span>
        </p>
      </div>
    </v-card>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
      }      
    },

    computed: {
      ...mapState('wallet', [        
        'isConnected',       
        'address',
        'balance'
      ]),

    },

    async mounted() {
      
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