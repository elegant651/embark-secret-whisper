<template>
  <v-container fluid>
    <ListTodo :items="items" v-on:show-detail="onShowDetail" />

    <v-dialog v-model="dialog" persistent min-width="200" max-width="650">
      <v-card>
        <v-card-actions>          
          <v-spacer></v-spacer>
          <v-btn
            class="btnClose"
              color="#000"
              text
              @click="dialog = false">
            X
          </v-btn>
        </v-card-actions>
        <DetailTodo :item="selItem" v-on:add-todo="onAddTodo" />        
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'  

import ListTodo from '@/components/battles/ListTodo'
import DetailTodo from '@/components/battles/DetailTodo'

export default {  
  components: {
    ListTodo,
    DetailTodo
  },
  data() {
    return {
      items: [],
      dialog: false,
      selItem: null
    }
  },
  mounted() {
    this.getList()

    // console.log(moment().day(0).format()) //this sunday
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

    getList () {
      
    },

    onShowDetail (item) {      
      this.selItem = item
      this.dialog = true
    },

    onAddTodo (item) {
    
    }
  }
}
</script>

<style scoped>
.btnClose {
  font-size: 26px;
}
</style>