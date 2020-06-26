<template>
  <div>
    <h2>Todo List</h2>
    <!-- <v-btn outlined @click="goToUpload">New Todo</v-btn> -->
    <TodoFeed />
  </div>
</template>
<script>
  import TodoFeed from '@/components/battles/TodoFeed.vue'

  export default {
    components: { 
      TodoFeed
    },

    methods: {
      goToUpload () {
        this.$router.push('/upload')
      }
    }
  } 
</script>
