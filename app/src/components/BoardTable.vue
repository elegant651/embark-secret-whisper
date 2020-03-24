<template>
  <v-data-table
    :headers="headers"
    :items="items" 
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of messages</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Content</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.title" label="title"></v-text-field>
                  </v-col>                  
                </v-row>
                <v-row>
                  <v-textarea solo label="content" v-model="editedItem.content" />
                </v-row>

                <v-row>
                  <RichEditor />
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
  import RichEditor from './RichEditor'

  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    components: {
      RichEditor
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
          text: 'Title',
          value: 'title',          
        },
        {
          text: 'Content',
          value: 'content',
        },
        {
          text: 'created_at',
          value: 'created_at'
        },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        title: '',
        content: ''
      },
      defaultItem: {
        title: '',
        content: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Content' : 'Edit Content'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted() {      
    },
    beforeDestroy() {
      this.editor.destory()
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const contentId = item.id
        confirm('Are you sure you want to delete this item?') && this.$emit('delete-item', contentId)
      },

      close () {
        this.dialog = false        
      },

      save () {
        if (this.editedIndex > -1) {
          //update          
          const contentId = this.items[this.editedIndex].id
          this.$emit('update-item', contentId, this.editedItem)
        } else {
          //create          
          this.$emit('create-item', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>