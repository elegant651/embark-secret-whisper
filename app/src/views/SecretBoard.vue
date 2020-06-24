<template>
  <div>
    <BoardTable :items="allItems" v-on:create-item="onCreateItem" v-on:update-item="onUpdateItem" />
  </div>
</template>

<script>

import * as WhisperService from '@/services/WhisperService'
import { mapActions, mapMutations, mapGetters } from 'vuex'

import BoardTable from '@/components/board/BoardTable'

export default {
  components: {
    BoardTable
  },
  data() {
    return {
      headers: [
        { text: 'Assignee_id', value: 'assignee_id' },        
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },  
  computed: {
    ...mapGetters('board', [
      'numItems',
      'allItems'
    ])
  },
  async mounted() {
    await WhisperService.init()
    await WhisperService.sendPublicMsg({title: "testtete"})

    this.onSubscribeForHttp()
  },
  methods: {    
    ...mapMutations('board', [
      'setItems',
      'addItem'
    ]),
    ...mapMutations('boardForm', [
      'setContent'
    ]),

    async onSubscribeForHttp () {
      WhisperService.getFilterMsg((data) => {
        console.log('d',data)
        // const jsonObj = JSON.parse(data)
        this.addContent(data)
      })
    },

    async onSubscribeForWebsocket () {
      WhisperService.subscribePublicMsg((data) => {
        // this.addItem(web3.utils.toAscii(data.payload))
        const content = data.payload

        const jsonObj = JSON.parse(content) 
        this.addContent(jsonObj)
      })
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
    },

    async onCreateItem (item) {      
      // this.addContent(item.title) 
      await WhisperService.sendPublicMsg(item)
    },

    async onUpdateItem (id, item) {
      // this.addContent(item.title)
      await WhisperService.sendPublicMsg(item)
    }
  }
}

</script>