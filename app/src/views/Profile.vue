<template>
<v-container fluid>
  <h2>Profile</h2>  
  <MyProfile />
  <MyWallet />
</v-container>
</template>

<script>
import MyProfile from '@/components/my/MyProfile'
import MyWallet from '@/components/my/MyWallet'

export default {  
  components: {
    MyProfile,
    MyWallet
  }
}
</script>

<style lang="scss" scoped>
</style>