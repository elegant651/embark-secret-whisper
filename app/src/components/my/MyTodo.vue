<template>
<div>
  <v-card class="cardContent mx-auto pa-3 mb-4" max-width="400">
    <v-list-item>
      <div class="detail">
        <div class="timestamp">
          {{current_date}}
        </div>
        <div class="todo">
          {{todoTitle}}
        </div>
        <div class="rule">
          {{item.rule}}
        </div>
      </div>       
    </v-list-item>    

    
      <v-card-actions>        
        <v-btn class="btnAction" color="#0062ff" rounded outlined @click="showPhotoDlog"><img src="/img/ic-card-camera.png" class="mr-2" />Take a photo</v-btn>
        <template v-if="isVerified">
          <div class="ml-2" style='color:#0062ff'>Verified</div>
        </template>
        <template v-else>
          <div class="ml-2" style='color:#0062ff'>Not Verified</div>
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
      
  </v-card>
</div>  
</template>

<script>
import moment from 'moment'
import {getIdenticon} from '@/util/identicon'

export default {
  props: {    
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
    current_date () {       
      return moment().format("dddd, MMMM Do YYYY")
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