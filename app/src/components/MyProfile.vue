<template>
<div>
  <v-card class="cardContent mx-auto mb-4 pa-2">
    <div class="avatar mb-6">
      <img :src="getProfileImg" />
      <!-- <div class="nickname">{{nickname}}</div> -->
    </div>

    <div class="mx-auto d-flex justify-space-around">
      <div class="countBox">
        <div class="cntTitle">Feed</div>
        <div class="cntVal">{{numFeeds}}</div>
      </div>
    </div>
  </v-card>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {getIdenticon} from '@/util/identicon'

export default {  
  data: () => ({

  }),

  computed: {
    ...mapState('wallet', [
      'address'
    ]),

    nickname () {
      return this.address
    },

    getProfileImg () {
      return getIdenticon(this.address)
    },

    numFeeds () {
      return 0
    }
  },

  methods: {

  }
}
</script>

<style scoped>

.cardContent h2 {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
  text-align: left; 
}

.avatar .nickname {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #17191d;	
}

.countBox {
  width: 120px;	
  height: 88px;
  padding-top: 10px;  
}

.countBox .cntTitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #acb3be;	
}

.countBox .cntVal {
  margin-top: 8px;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #17191d;	
}

.walletBox {
  width: 180px;
  height: 88px;
  padding-top: 20px;
}

.walletBox .wbTitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #acb3be;
}

.walletBox .amtKlay {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal; 
  letter-spacing: normal;
  color: #17191d;
  margin-top:5px;
}

.walletBox .amtKlay img {
  margin-bottom: -4px;
}

</style>