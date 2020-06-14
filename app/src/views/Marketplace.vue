<template>
  <div>
    <h2>Marketplace</h2>
    <v-btn outlined @click="goToUpload">Upload Item</v-btn>
    <Marketplace />
  </div>
</template>
<script>
  import Marketplace from '@/components/marketplace/Marketplace.vue'

  export default {
    components: { 
      Marketplace
    },

    methods: {
      goToUpload () {
        this.$router.push('/upload')
      }
    }
  } 
</script>
