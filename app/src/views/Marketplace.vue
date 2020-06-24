<template>
  <div>
    <h2>Marketplace</h2>
    <v-btn outlined @click="goToUpload">Upload Item</v-btn>
    <MarketplaceFeed />
  </div>
</template>
<script>
  import MarketplaceFeed from '@/components/marketplace/MarketplaceFeed.vue'

  export default {
    components: { 
      MarketplaceFeed
    },

    methods: {
      goToUpload () {
        this.$router.push('/upload')
      }
    }
  } 
</script>
