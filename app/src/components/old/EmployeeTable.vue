<template>
  <v-data-table
    :headers="headers"
    :items="items" 
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of Employees</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Employee</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>      
    </template>
    
  </v-data-table>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Id',
          value: 'id',
          align: 'left',
        },
        {
          text: 'Name',          
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'action', sortable: false },
      ],      
      editedIndex: -1,
      editedItem: {
        name: '',
        email: ''
      },
      defaultItem: {
        name: '',
        email: ''        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Employee' : 'Edit Employee'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const employeeId = item.id
        confirm('Are you sure you want to delete this item?') && this.$emit('delete-item', employeeId)
      },

      close () {
        this.dialog = false        
      },

      save () {
        if (this.editedIndex > -1) {
          //update          
          const employeeId = this.items[this.editedIndex].id
          this.$emit('update-item', employeeId, this.editedItem)
        } else {
          //create          
          this.$emit('create-item', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>