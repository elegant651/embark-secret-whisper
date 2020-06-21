<template>
  <v-container fluid>
    <BoardFeed :items="items" />
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters('board', [
      'numItems',
      'allItems'
    ])
  },
  async mounted() {
    

    await this.getFeeds()
  },
  methods: {
    ...mapMutations('feed', [
      'setItems',
      'addItem'
    ]),
    ...mapMutations('feedForm', [
      'setContent'
    ]),

    async getFeeds () {
      
    }
  },

  async addContent (obj) {
    const item = {
      id: this.numItems,
      title: obj.title,
      content: obj.content,
      created_at: new Date()
    }
    this.setContent(item)
    this.addItem(item)
  }
}
</script>

<style scoped>

</style>