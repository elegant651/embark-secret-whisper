<template>
<div>
  <v-row wrap>
    <v-col class="leftPanel">
      <CommonLeftPanel />
    </v-col>
    <v-col>
      <v-card class="rightPanel align-center justify-center" tile outlined>
        <ChatHeaderPart />
        
        <v-layout row class="d-flex justify-space-between" style="width: 100%; height: 60%">
          <ChatGroupBox />          
        </v-layout>
        
        <div class="bottomWrapper pl-5 pr-5">
          <div class="msgContainer mt-1">
            <v-layout row>
              <v-text-field solo
                id="ipMsg" label="Message..." v-model="message" @keypress.enter.native.prevent="sendMessage" 
              ></v-text-field>
              <v-btn class="ic_send" @click="sendMessage" style="background-color: #e6e6e6;">
                †
              </v-btn>
            </v-layout>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import Web3 from 'web3'
const web3 = new Web3();

import * as WhisperService from '@/services/WhisperService'
import ChatHeaderPart from '@/components/chat/ChatHeaderPart'
import CommonLeftPanel from '@/components/chat/CommonLeftPanel'
import ChatGroupBox from '@/components/chat/ChatGroupBox'


import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'chat', 
  components: {
    ChatHeaderPart,
    CommonLeftPanel, 
    ChatGroupBox
  },
  data() {
    return {
      channelUrl: 'testchannelurl',
      channel: null,
      items: [],      
      message: '',
      isLoading: false
    }
  },
  async mounted() {
    // if (!this.userData.id) {
    //   this.$router.push('/')
    //   return
    // }

    await WhisperService.init()    

    this.onSubscribe()
  },
  computed: {
    ...mapGetters('profile', [
      'userData'
    ]),
    ...mapGetters('room', [
      'roomInfo'
    ])    
  },
  methods: {
    ...mapMutations('message', [
      'setItem',
      'addItem'
    ]),

    async sendMessage() {
      if(!this.message) return
      this.isLoading = true      

      // const roomId = this.roomInfo.id
      // if(!roomId) return

      try {
        await this.createItem({content: this.message})  
      } catch(e) {
        console.error(e)
      }
      
      this.isLoading = false
      this.message = ''

      // const db = firebase.firestore()
      // db.collection("messages_forweb").doc(roomId).collection('chats').add({
      //   uuid: this.userData.id,
      //   nickname: this.userData.nickname,
      //   content: this.message,
      //   created_at: new Date()
      // })
      // .then((docRef) => {
      //   this.message = '';
      //   this.isLoading = false
      // })
      // .catch((error) => {
      //   console.error("error:", error)
      //   this.isLoading = false
      // })      
    },

    async onSubscribe () {
      WhisperService.subscribePublicMsg((data) => {        
        const content = web3.utils.toUtf8(data.payload)

        const jsonObj = JSON.parse(content)
        this.addContent(jsonObj)
      })
    },

    async addContent (obj) {
      const item = {
        uuid: 'uuid',
        nickname: 'nickname',
        content: obj.content,
        created_at: new Date()
      }
      this.addItem(item)
    },

    async createItem (item) {      
      // this.addContent(item.title) 
      await WhisperService.sendPublicMsg(item)
    },
  }
}

</script>
<style scoped>
.col {
  padding: 0px !important;
}

.rightPanel {
  background-color: #D3D3D3; 
  display: flex;
  flex-flow: column;
  height: 92vh;
}

/* bottom input */
.bottomWrapper {  
  width: 100%;

  min-height: 60px;
  background-color: #D3D3D3;
  border-top: 1px solid #808080;
}

.msgContainer {  
  height: 30px;
  margin-right: 10px;
  margin-bottom: 20px;
}

.msgContainer #ipMsg {
  display: inline-block; 
  background: #060c30;
  color: #e3e4eb;
  border: 0;
}

.msgContainer .ic_send {
  position: absolute;
  cursor: pointer;
  color: #7f7e7e;
  right: 20px;
  margin-top: 5px;
}

@media (max-width: 800px) {
  .leftPanel {
    display: none;
  }
}

</style>

