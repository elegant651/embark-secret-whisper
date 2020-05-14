<template>
<div>  
  
  <div class="btnWrapper">
    <div class="mb-3"><v-btn height="80" @click="chooseType(0)" color="#45c65b">Join Chat</v-btn></div>    
  </div>

  <v-divider class="mt-5 mb-4" />
  
  <div class="d-flex justify-center">
    <v-text-field
      class="textField"
      v-model="nickname"
      label="nickname"
      solo
      required
    ></v-text-field>
  </div>  

  <!-- <div class="d-flex justify-center">
    <v-text-field
      class="textField"
      v-model="partyCode"
      label="participant code"
      solo
      required
    ></v-text-field>
  </div> -->
    
  <div class="d-flex justify-center">
    <v-btn outlined @click="submit">Sign in</v-btn>
  </div>  

  <v-snackbar
      v-model="snackbar" top>
      {{ errorTxt }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    snackbar: false,
    errorTxt: '',    
    nickname: '',
    partyCode: '',
  }),

  async mounted() {
    // await this.getChatInfo()
  },

  computed: {
    ...mapGetters('room', [
      'roomInfo'
    ])
  },

  methods: {  

    submit () {
      if (!this.nickname) {
        this.errorTxt = '닉네임을 입력해주세요'
        this.snackbar = true
        return false
      }

      // if (this.partyCode && this.roomInfo && this.partyCode == this.roomInfo.participantCode) {
        this.$emit('login', this.nickname)
      // } else {
      //   this.errorTxt = '입력 필드를 다시 확인해주세요!'
      //   this.snackbar = true
      //   return false
      // }
    }
  }
}

</script>

<style scoped>

@media (max-width: 600px) {
  .textField {
    max-width: 350px;
  }
}

.btnSubmit {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0062ff;
  text-transform: none;
}

.btnWrapper .v-btn {  
  width: 480px;
  height: 80px;
  border-radius: 7px;
  font-size: 23px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

</style>