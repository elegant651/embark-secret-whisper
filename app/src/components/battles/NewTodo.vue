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

            <v-text-field
              v-model="rule"      
              label="Rule"
              :rules="ruleRules"
              solo
              required
            ></v-text-field>

            <div class="mx-auto d-flex justify-space-around">
              <div class="timeBox pa-2">
                <div class="tbTitle ma-1">Start Time</div>
                <div class="timestamp">12:00 AM, {{startTime}}</div>
              </div>
              <div class="timeBox">
                <div class="tbTitle ma-1">End Time</div>
                <div class="timestamp">12:00 AM, {{endTime}}</div>
              </div>
            </div>            

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
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data: () => ({    
    title: '',
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 255) || 'Title must be less than 255 characters',
    ],
    ruleRules: [
      v => !!v || 'Rule is required',
      v => (v && v.length <= 255) || 'Rule must be less than 255 characters',
    ],
    isLoading: false,
    startTime: '',
    endTime: '',
    ciFeed: null
  }),

  computed: {
    ...mapGetters('wallet', [
      
    ])
  },

  mounted() {
    this.ciFeed = new this.$web3.eth.Contract(this.$config.FEED_ABI, this.$config.FEED_CA)

    const startDate = moment().day(0).startOf('date').format("dddd, MMMM Do YYYY") // this sunday
    const endDate = moment().day(6).endOf('date').format("dddd, MMMM Do YYYY") // this saturday

    this.startTime = startDate
    this.endTime = endDate
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

    async submit () {
      try {
        this.isLoading = true
        
        await this.ciFeed.methods.createAuction(this.$config.MYNFT_CA, this.tokenId, this.todo.todoTitle, this.dataURI, price)
        .send({from: this.address, gas: this.$config.GAS_AMOUNT})
        .on('transactionHash', (transactionHash) => {
          this.isLoading = false        
          alert("Creation completed...! tx:"+transactionHash)
          this.$router.push('/marketplace')
        })      
        .on('error', (error, receipt) => {
          this.isLoading = false
          alert(error)
        });

      } catch (e) {
        this.isLoading = false
      }
    }
  }
}

</script>

<style scoped>

.timeBox .tbTitle {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #525457;
}

.timeBox .timestamp {
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
}

</style>