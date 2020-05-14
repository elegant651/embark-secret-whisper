<template>
<div>
  <v-row wrap>
    <v-col class="leftPanel">
      <CommonLeftPanel />
    </v-col>
    <v-col>
      <v-card class="rightPanel align-center justify-center" tile outlined>
        <LoginBox v-if="!isLoggedIn" v-on:login="handleLogin" />

        <template v-else>
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
        </template>        
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import * as WhisperService from '@/services/WhisperService'
import ChatHeaderPart from '@/components/chat/ChatHeaderPart'
import CommonLeftPanel from '@/components/chat/CommonLeftPanel'
import ChatGroupBox from '@/components/chat/ChatGroupBox'
import LoginBox from '@/components/LoginBox'

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'chat', 
  components: {
    ChatHeaderPart,
    CommonLeftPanel, 
    ChatGroupBox,
    LoginBox
  },
  data() {
    return {
      channelUrl: 'testchannelurl',
      channel: null,
      items: [],      
      message: '',
      isLoading: false,
      isLoggedIn: false
    }
  },
  async mounted() {
    // if (!this.userData.id) {
    //   this.$router.push('/')
    //   return
    // }

    await WhisperService.init()    

    this.onSubscribeForHttp()    
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

    ...mapMutations('profile', [
      'setNickname'
    ]),

    handleLogin(nickname) {
      this.setNickname(nickname)
      this.isLoggedIn = true
    },

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
    },

    async onSubscribeForHttp () {
      WhisperService.getFilterMsg((data) => {
        console.log('d',data)
        // const jsonObj = JSON.parse(data)
        this.addContent(data)
      })
    },

    async onSubscribeForWebsocket () {
      WhisperService.subscribePublicMsg((data) => {        
        const content = data.payload

        const jsonObj = JSON.parse(content)
        this.addContent(jsonObj)
      })
    },

    async addContent (obj) {
      const item = {
        uuid: 'uuid',
        nickname: this.userData.nickname,
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

