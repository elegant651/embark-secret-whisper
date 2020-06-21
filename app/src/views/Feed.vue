<template>
  <v-container fluid>
    <BoardFeed :items="items" />
  </v-container>
</template>

<script>
import BoardFeed from '@/components/BoardFeed.vue'

export default {  
  components: {
    BoardFeed
  },
  data() {
    return {
      items: []
    }    
  },
  async mounted() {
    await this.getFeeds()
  },
  methods: {
    async getFeeds () {
      
    }
  }
}
</script>

<style scoped>

</style>