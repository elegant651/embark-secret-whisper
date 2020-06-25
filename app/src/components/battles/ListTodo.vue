<template>
<div>
  <v-card v-for="item in items" :key="item.index" class="cardContent d-flex align-center justify-space-between pl-2 pr-2 mb-4" @click="showDetail(item)">
    <img src="/img/ic-create-plus.png" />
    <div class="txtTodo ml-4">{{item.title}}</div>
    <div class="txtNumPeople mr-4">{{item.num_participants}} people</div>
  </v-card>
</div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    showDetail (item) {
      this.$emit('show-detail', item)
    }
  }
}
</script>

<style scoped>

.cardContent {  
  height: 80px;
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 45, 117, 0.08);
  background-color: #ffffff;
  cursor: pointer;
}

.txtTodo {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #17191d;
}

.txtNumPeople {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #acb3be;
}
</style>