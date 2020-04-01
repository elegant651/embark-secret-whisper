<template>
  <v-app>
    <v-navigation-drawer      
      app
      clipped
    >
      <v-list dense>        
        <template v-for="item in items"> 
          <router-link :to="item.route" :key="item.text">
            <v-list-item>              
              <v-list-item-content>
                <v-list-item-title class="menu_title">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#FFF" app clipped-left dense>
      <v-toolbar-title>Secure Messanger</v-toolbar-title> 
    </v-app-bar>
    <v-content>
      <!-- <v-container fluid class="fill-height"> -->
        <router-view/>
      <!-- </v-container> -->
    </v-content>    
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      items: [
        { text: 'Home', route: '/' },
        { text: 'Chat', route: '/chat'},
        { text: 'Secret Board', route: '/secret-board' }
      ]      
    })    
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
