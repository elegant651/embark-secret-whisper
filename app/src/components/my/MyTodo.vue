<template>
<div>
  <v-card class="cardContent mx-auto pa-3 mb-4" max-width="400">
    <v-list-item @click="showDetailDlog">
      <div class="detail">
        <div class="timestamp">
          {{current_date}}
        </div>
        <div class="todo">
          {{todoTitle}}
        </div>
        <div class="status">
          {{num_upload_today}} / 1
        </div>
      </div>
      <div class="flex-grow-1"></div>
      <div class="ml-3">
        
        <img :src="getImage(user_name)" width="45" height="45" />
        
        <div class="username mt-1">{{user_name}}</div>
      </div>
    </v-list-item>    

    <template v-if="!isView">
      <v-card-actions>
        <template v-if="isMine">
          <v-btn class="btnAction" color="#0062ff" rounded outlined @click="showPhotoDlog"><img src="/img/ic-card-camera.png" class="mr-2" />Take a photo</v-btn>  
        </template>
        <template v-else>
          <template v-if="isVerified">
            <div class="ml-2" style='color:#0062ff'>Verified</div>
          </template>
          <template v-else>
            <v-btn class="btnAction" color="#0062ff" rounded outlined @click="actionConfirm"><img src="/img/ic-card-check.png" class="mr-2"/>Confirmed</v-btn>
          </template>
        </template>
      </v-card-actions>

      <div class="cardContent mx-auto pa-3 mb-2"> 
        <v-container class="imgContainer grey lighten-5">
          <v-row no-gutters>
            <template v-for="n in 7">
            <v-col :key="n">
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <div style="font-size: 18px; font-weight: bold; color: #ebedf0;">{{arrayWeekday[n-1]}}</div>
                <v-img class="imgPic" :src="photo_urls[n-1]" width="70" height="70" @click="showPhoto(photo_urls[n-1])" />
              </v-card>
            </v-col>
            <v-responsive
              v-if="n === 2"
              :key="`width-${n}`"
              width="100%"
            ></v-responsive>
          </template>
          </v-row>
        </v-container>
      </div>  
    </template>
      
  </v-card>
</div>  
</template>

<script>
import moment from 'moment'
import firebase from "firebase"
import "firebase/firestore";
import "firebase/storage";
import {getIdenticon} from '@/util/identicon'

export default {
  props: {
    isMine: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object
    }    
  },
  computed: {
    todoTitle () {
      if(this.item.todo_object){
        return this.item.todo_object.title  
      } else {
        return ""
      }
    },
    user_name () {
      return this.item.user_name
    },
    current_date () {       
      return moment().format("dddd, MMMM Do YYYY")
    },
    curDayIdx () {
      return parseInt(moment().format("d"))
    },

    num_upload_today () {
      if(this.isUploadToday) {
        return 1
      } else {
        return 0
      }      
    }
  },
  watch: {
    item: function (newItem) {
      if(newItem) {
        this.getCollectionInfo(newItem.collection_id)
      }      
    }
  },
  components: {
    
  },
  data() {
    return {
      arrayWeekday: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      isVerified: false,
      photo_urls: [],
      isUploadToday: false
    }    
  },
  mounted() {    
  },
  methods: {
    async getCollectionInfo (collection_id) { 
      
    },

    getImage (user_name) {
      return getIdenticon(user_name)
    },

    async getVerifyPhoto (idx) {
      return '/img/profile-large.png'      
    },

    showPhoto (url) {
      if(url != '/img/profile-large.png') {
        window.open(url, '_blank')
      }
    },

    showPhotoDlog () {
      this.$emit('show-photo-dlog', this.item)
    },

    showDetailDlog () {
      this.$emit('show-detail-dlog', this.item)
    },

    actionConfirm () { 
      this.$emit('action-confirm', this.item)
    }
  }
}
</script>

<style scoped>
.cardContent {
  text-align: left;
}

.cardContent .username {
  font-size: 12px;
  text-align: center;
}

.detail .timestamp {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #cfd3d9;
}

.detail .todo {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
  margin-top: 6px;
}

.detail .status {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;  
  color: #0062ff;
  margin-top: 8px;
  margin-bottom: 8px;
}

.btnAction {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0062ff;
  text-transform: none;
}

.cardContent h3 {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
  margin-top: 8px;
  margin-bottom: 8px;
}

.cardContent .content {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #17191d;
  margin-top: 8px;
  margin-bottom: 8px;
}

.imgContainer {
  max-width: 420px;
  text-align: center;
}

.imgContainer .imgPic {
  margin: 0 auto;
  cursor: pointer;
}
</style>