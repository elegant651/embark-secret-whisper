<template>
  <div class="chatcomp">    
    <div class="chatWrapper">
      <v-list class="messages" three-line v-chat-scroll>
        <template v-for="(msg, index) in allItems"> 
          <v-list-item
            :key="index"            
            :class="getChatItemClass(msg.myturn)"
          >
            <template v-if="msg.myturn">              
              <div class="subtitle mr-2" v-html="msg.content"></div>
              <div class="profile mr-2">
                <v-list-item-avatar color="grey" style="margin: 0 auto"><v-img :src="getProfile(msg.nickname)" /></v-list-item-avatar>
                <div class="usertitle">{{msg.nickname}}</div>
              </div>
            </template>
            <template v-else>              
              <div class="profile ml-2">
                <v-list-item-avatar color="grey" style="margin: 0 auto"><v-img :src="getProfile(msg.nickname)" /></v-list-item-avatar>
                <div class="usertitle">{{msg.nickname}}</div>
              </div>
              <div class="subtitle ml-2" v-html="msg.content"></div>              
            </template>
          </v-list-item>
        </template>
      </v-list>
    </div>
    
  </div>
</template>

<script>
// import {format as tformat} from 'timeago.js'
import {getIdenticon} from '@/util/identicon'
import { mapGetters } from 'vuex'

export default {
  name: 'ChatGroupBox',
  components: {
  },

  // data() {
  //   return {
  //     items: []      
  //   }
  // },

  async mounted() {
    // await this.getPartyChats()
  },

  computed: {
    ...mapGetters('profile', [
      'userData'
    ]),
    ...mapGetters('room', [
      'roomInfo'
    ]),
    ...mapGetters('message', [
      'allItems'
    ])
  },

  methods: {
    async getPartyChats () {
      if(!this.roomInfo) {
        this.$router.push('/')
        return
      }

      // fbdb
      // const db = firebase.firestore()

      // db.collection("messages_forweb").doc(this.roomInfo.id).collection('chats').orderBy("created_at", "desc").limit(10).onSnapshot((snapshot) => {
      //   let newArr = []

      //   snapshot.forEach((doc) => {
      //     let data = doc.data()
      //     const isMyTurn = (this.userData.id == data.uuid) ? true : false
      //     data = {...data, myturn: isMyTurn}
      //     newArr.push(data)
      //   })
      //   newArr.reverse()
      //   this.items = newArr
      // })
    },

    getChatItemClass(myturn) {
      if (myturn) {
        return "msgWrapper d-flex justify-end"
      } else {
        return "msgWrapper d-flex"
      }
    },

    getProfile (user_name) {
      return getIdenticon(user_name)      
    },
    getImage (url) {
      if(url) {
        return url
      } else {
        return ''
      }     
    }    
  }
}
</script>

<style scoped>
.chatcomp {
  min-width: 260px;
  height: 100%;
  display: flex;
  flex-flow: column;  
}

.chatWrapper {
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  box-shadow: inset 1px 0 0 0 rgba(0, 0, 0, 0.1);  
  flex: 1;
  overflow: auto;
}

.btnReady {
  width: 200px;
  margin: 10px;
}

.messages {  
  width: 100%;
  height: 100%;    
  padding: 0px 0px 0px 0px;
  overflow-y: auto;
  background-color: #D3D3D3;
}


.messages .msgWrapper{  
  color: #e3e4eb;
  font-family: Lato;
  font-size: 13px; 
  padding: 0px 0px 0px 0px;
  list-style: none;  
  margin: 0px 0 0px 0;  
  text-align: left;
  cursor: default;
  padding-left: 10px;
  padding-right: 10px;
}

.messages .msgWrapper .profile {
  text-align: center;
}

.messages .msgWrapper .usertitle {
  font-size: 10px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #323b43;
}

.messages .msgWrapper .subtitle {  
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.74;
  letter-spacing: normal;
  color: #111111;
  border-radius: 4px;
  background-color: #eeeeee;
  padding: 10px;
  margin-left: 10px;
}


.message .username {
  font-weight: 800;
}


</style>
