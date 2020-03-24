<template>
  <div>
    <PerformReviews :headers="headers" :items="items" v-on:feedback-item="onFeedbackItem" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import PerformReviews from '@/components/PerformReviews'

export default {
  components: {
    PerformReviews
  },
  data() {
    return {
      headers: [        
        { text: 'Assignee_id', value: 'assignee_id' },        
        { text: 'Actions', value: 'action', sortable: false }
      ]      
    }
  },  
  computed: {
    ...mapGetters('employeeForm', {
      items: 'pendingReviews'
    })
  },
  async mounted() {
    // for testing
    const userId = 'QExWU4t49pmMQXbN6ePb' 
    await this.getEmployee(userId)
    await this.setReviews(this.items)
  },
  methods: {
    ...mapActions('employees', [
      'getEmployee'
    ]),
    ...mapMutations('reviews', [
      'setReviews'
    ]),
    ...mapMutations('reviewForm', [
      'setReview'
    ]),
    ...mapActions('reviewForm', [
      'registerReview',
      'updateReview'
    ]),

    async onFeedbackItem (id, item) {      
      this.setReview(item)
      await this.updateReview(id)
    }
  }
}

</script>