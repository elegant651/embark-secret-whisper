<template>
  <v-data-table
    :headers="headers"
    :items="items" 
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of performance reviews</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }" v-if="isAdmin">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Review</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Write Feedback</span>
            </v-card-title>

            <v-card-text>
              <template v-if="isAdmin">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">                      
                      <v-select
                        :items="employeeLabels"
                        v-model="selectAssigner"
                        solo
                        label="Assigner_id"
                        :disabled="!isAdmin"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">                      
                      <v-select
                        :items="employeeLabels"
                        v-model="selectAssignee"
                        solo                    
                        label="Assignee_id"
                        :disabled="!isAdmin"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.content" label="review"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
              <template v-else>
                <v-container>
                  <v-row>                    
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="editedItem.content" label="review"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">      
      <v-btn small class="mr-2" @click="editItem(item)" v-if="isAdmin">
        View
      </v-btn>
      <v-btn small class="ml-3" @click="feedbackItem(item)" v-if="!isAdmin">Feedback</v-btn>
    </template>
    
  </v-data-table>
</template>

<script>
  export default {
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      },
      employees: {
        type: Array
      },
      items: {
        type: Array,
        required: true
      },
      headers: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      dialog: false,
      selectAssigner: {},
      selectAssignee: {},          
      editedIndex: -1,
      editedItem: {
        assigner_id: '',
        assignee_id: '',
        content: '',
        is_submit: false
      },
      defaultItem: {
        assigner_id: '',
        assignee_id: '',
        content: ''
      },
    }),

    computed: {
      employeeLabels () {
        return this.employees.map(v => v.name)
      }
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

      feedbackItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false        
      },

      setAssign () {
        const assigner = this.employees.find(e => e.name === this.selectAssigner)
        if(assigner) {
          this.editedItem.assigner_id = assigner.id
        }
        const assignee = this.employees.find(e => e.name === this.selectAssignee)
        if(assignee) {
          this.editedItem.assignee_id = assignee.id
        }
      },

      save () {
        if(this.isAdmin) {
          if (this.editedIndex > -1) {
            //update            
            const reviewId = this.items[this.editedIndex].id
            this.setAssign()

            this.editedItem.is_submit = false
            this.$emit('update-item', reviewId, this.editedItem)
          } else {
            //create            
            this.setAssign()
            this.$emit('create-item', this.editedItem)
          }  
        } else {
          const reviewId = this.items[this.editedIndex].id
          this.editedItem.is_submit = true
          this.$emit('feedback-item', reviewId, this.editedItem)
        }
        
        this.close()
      },
    },
  }
</script>