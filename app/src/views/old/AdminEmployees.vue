<template>
  <div>
    <EmployeeTable :items="items" v-on:create-item="onCreateItem" v-on:update-item="onUpdateItem" v-on:delete-item="onDeleteItem" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import EmployeeTable from '@/components/EmployeeTable'

export default {
  components: {
    EmployeeTable
  },  
  computed: {
    ...mapGetters('employees', {
      items: 'allEmployees'
    })    
  },
  async mounted() {
    await this.getAllEmployees()
  },
  methods: {
    ...mapActions('employees', [
      'getAllEmployees'
    ]),
    ...mapMutations('employeeForm', [
      'setEmployee'
    ]),
    ...mapActions('employeeForm', [
      'registerEmployee',
      'updateEmployee',
      'removeEmployee'
    ]),

    async onCreateItem (item) {
      this.setEmployee(item)
      await this.registerEmployee()
    },

    async onUpdateItem (id, item) {
      this.setEmployee(item)
      await this.updateEmployee(id)
    },

    async onDeleteItem (id) {
      await this.removeEmployee(id)
    }
  }
}

</script>