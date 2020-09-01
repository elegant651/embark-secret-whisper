<template>
<div>
  <v-card class="cardContent d-flex mx-auto mb-4 pa-2">
    <v-container>
      <v-row>
        <v-col cols="16">
          <v-form
            ref="form"
            class="mt-2"    
            lazy-validation
            >
            <v-text-field
              v-model="title"      
              label="Title"
              :rules="titleRules"
              solo
              required
            ></v-text-field>
            <input type="file" accept="image/*" v-on:change="this.handleImportFile" required />

            <v-btn v-if="!isLoading" outlined @click="validate">POST</v-btn>
            <v-progress-circular indeterminate v-else></v-progress-circular>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>  
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageCompression from '@/util/imageCompression'

export default {
  data: () => ({    
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 255) || 'Title must be less than 255 characters',
    ],
    isLoading: false
  }),

  computed: {
    ...mapGetters('wallet', [
      
    ])
  },

  methods: {
    validate () {
      if (!this.$refs.form.validate()) {
      	const snackbarMsg = 'form data are incorrect. please check again'        
        this.$emit('error-validate', snackbarMsg)
        return false
      }

      this.submit()
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

    async submit () {
      try {
        this.isLoading = true
        

      } catch (e) {
        this.isLoading = false
      }
    }
  }
}

</script>

<style scoped>

</style>