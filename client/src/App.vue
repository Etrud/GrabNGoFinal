<!-- App.vue -->
<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
      <div id="nav" class="d-flex">
      <v-app-bar dense fixed >
        <v-toolbar-title>Grab N Go Scheduler</v-toolbar-title>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-card flat class="d-flex justify-end">
          <router-link to="/Login">Login / Register</router-link>
          <v-icon>mdi-login</v-icon>
        </v-card>
      </v-app-bar>
         <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="'/'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Punches</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Schedule</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-contacts-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Contact Book</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/about'">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </div>
    
    <router-view/>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>

<style>


.loginDiv {
  float: right;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  margin-bottom: 45px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
