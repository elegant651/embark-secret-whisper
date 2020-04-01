<template>
<div>
  <v-card class="cardContent mx-auto mb-4" max-width="400" max-height="400"
    v-for="item in items" :key="item.index">
    <v-list-item>
      <v-list-item-avatar color="grey"><img :src="getProfile(item.user_name)" /></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{item.title}}</v-list-item-title>
        <v-list-item-subtitle>{{getCreatedAt(item.created_at.seconds)}}</v-list-item-subtitle>
      </v-list-item-content>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <img src="/img/heart-off.png" />
      </v-btn>
      <div>0</div>
    </v-list-item>

    <p class="ma-4">{{item.content}}</p>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Comment
      </v-btn>
      <div class="flex-grow-1"></div>
      <!-- <v-btn icon>
        <img src="/img/heart-on.png" />
      </v-btn> -->
    </v-card-actions>
  </v-card>
</div>  
</template>

<script>
import {format as tformat} from 'timeago.js'
import {getIdenticon} from '@/util/identicon'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    
  },
  data() {
    return {
      
    }    
  },

  methods: {
    getProfile (user_name) {
      return getIdenticon(user_name)      
    },
    getImage (url) {
      if(url) {
        return url
      } else {
        return ''
      }     
    },
    getCreatedAt (createdAt) {      
      return tformat(new Date(createdAt*1000))
    }
  }
  
}
</script>

<style scoped>
.cardContent {
  text-align: left;
}

.v-list-item__title {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
}

.v-list-item__subtitle {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #7f899a;
}
</style>