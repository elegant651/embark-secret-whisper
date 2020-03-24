<template>
  <div>
    <PerformReviews is-admin :headers="headers" :employees="employees" :items="items" v-on:create-item="onCreateItem" v-on:update-item="onUpdateItem" />
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
        {
          text: 'Assigner_id',
          align: 'left',
          sortable: false,
          value: 'assigner_id',
        },
        { text: 'Assignee_id', value: 'assignee_id' },
        { text: 'Review', value: 'content' },
        { text: 'Actions', value: 'action', sortable: false }
      ]      
    }
  },
  computed: {
    ...mapGetters('reviews', {
      items: 'allReviews'
    }),
    ...mapGetters('employees', {
      employees: 'allEmployees'
    })
  },
  async mounted() {
    await this.getAllEmployees()
    await this.getAllReviews()
  },
  methods: {
    ...mapActions('employees', [
      'getAllEmployees'
    ]),
    ...mapActions('reviews', [
      'getAllReviews'
    ]),
    ...mapMutations('reviewForm', [
      'setReview'
    ]),
    ...mapActions('reviewForm', [
      'registerReview',
      'updateReview'
    ]),

    async onCreateItem (item) {
      this.setReview(item)
      await this.registerReview()
    },

    async onUpdateItem (id, item) {
      this.setReview(item)      
      await this.updateReview(id)
    }
  }
}

</script>