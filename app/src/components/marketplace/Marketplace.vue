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


export default {
  data() {
    return {      
      auctions: []
    }
  },

  mounted() {
    this.getAuctions()
  },

  methods: {
    async getAuctions() {
      
    }	
  }
}
</script>