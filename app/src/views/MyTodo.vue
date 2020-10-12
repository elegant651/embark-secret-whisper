<template>
  <v-container fluid>
    <MyTodo :items="items" v-on:show-photo-dlog="onShowPhotoDlog" />

    <v-dialog v-model="dlogFile" persistent max-width="350">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="btnClose"
              color="#000"
              text
              @click="dlogFile = false">
            X
          </v-btn>
        </v-card-actions>
        <input type="file" accept="image/*" v-on:change="this.handleImportFile" required />
        <v-btn v-if="!isLoading" outlined class="btnUpload ma-4" @click="this.fileUpload">UPLOAD</v-btn>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
// import { mapState, mapMutations } from 'vuex'  

import MyTodo from '@/components/my/MyTodo'
import imageCompression from '@/util/imageCompression'

export default {  
  components: {
    MyTodo,    
  },
  data() {
    return {
      items: [],
      dlogFile: false,
      selItem: null,
      imgFile: null,
      ciFeed: null,

      isLoading: false,
      snackbar: false,
    }
  },
  mounted() {
    this.ciFeed = new this.$web3.eth.Contract(this.$config.FEED_ABI, this.$config.FEED_CA)
    this.getList()    
  },
  computed: {
    // ...mapState([
    //   'profile'
    // ])
  },
  methods: {
    // ...mapMutations([
    //   'setMyProfile'
    // ]),

    async getList () {
      this.items = []

      const count = await this.ciFeed.methods.getTotalTodoCount().call()
      console.log(count)
      for(let i=0; i<count; i++) {
        const result = await this.ciFeed.methods.getTodo(i).call()        
        this.items.push({
          todoId: result[0],
          owner: result[1],
          title: result[2],
          photo: 'https://gateway.ipfs.io/ipfs/'+result[3],
          timestamp: result[4],
          isVerified: result[5],
          verifier: result[6]
        })
      }
    },

    async compressImage (imageFile) {
      try {
        const MAX_IMAGE_SIZE_MB = 0.03 // 30KB
        const compressedFile = await imageCompression(imageFile, MAX_IMAGE_SIZE_MB)
        return compressedFile
      } catch (error) {
        return imageFile
      }
    },

    async handleImportFile (e) {
      const MAX_IMAGE_SIZE = 30000 // 30KB
      const file = e.target.files[0]

      if (file.size > MAX_IMAGE_SIZE) {
        this.imgFile = await this.compressImage(file)
      } else {
        this.imgFile = file
      }      
    },

    onShowPhotoDlog (item) {
      this.selItem = item
      this.dlogFile = true
    },

    fileUpload () {
      if(this.imgFile && this.selItem) {
        this.isLoading = true

      }
    }
  }
}
</script>

<style scoped>
.btnClose {
  font-size: 26px;
}
</style>