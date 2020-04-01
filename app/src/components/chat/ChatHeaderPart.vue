<template>
<div class="rootWrap">
  <v-row>	
    <div class="detail ml-2">      
      <h4>Inssa chat title</h4>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon class="btnInvite mr-2" href="http://localhost:8080">invite</v-btn>
    <v-btn icon class="btnShare mr-2" @click.prevent="copyData"><v-icon>share</v-icon></v-btn>
    <v-btn icon class="btnHelp mr-2"><v-icon>help</v-icon></v-btn>
  </v-row>

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
    errorTxt: ''
  }),  
  computed: {
    ...mapGetters('room', [
      'roomInfo'
    ])
  },
  methods: {
    copyData: function () {
      const link = "http://localhost:8080"
      var textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      this.errorTxt = 'Completed to copying the link' 
      this.snackbar = true

      textArea.remove();
    },
  }

}

</script>
<style scoped>

.rootWrap {
  width: 100%;
  padding: 20px;
  height: 80px;
  background: #fff;
}

.detail h2 {
  font-family: Roboto;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;	
}

.detail h4 {
  font-family: Roboto;
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.4);
}

.btnHelp {
  width: 41px;
  height: 41px;  
}

</style>