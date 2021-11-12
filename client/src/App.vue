<!-- App.vue -->
<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
      <div id="nav" class="d-flex">
      <v-app-bar fixed color="primary" class="white--text" >
        <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">Grab N Go Scheduler</v-toolbar-title>
        <v-app-bar-nav-icon @click="drawer = true" v-if="$store.state.isUserLoggedIn"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-card flat class="mx-auto"
           v-if="!$store.state.isUserLoggedIn">
          <v-btn color="accent" class="white--text"   to="/login"  ml-2>Login / Signup<v-icon>mdi-login</v-icon></v-btn>
        </v-card>

        <v-card flat rounded class="d-flex justify-end mr-6 pa-2 " pr-2 color="secondary" dark
          v-if="$store.state.isUserLoggedIn">
          Logged in as:&nbsp;<router-link to="/profile">{{email}}</router-link>
        </v-card>
        
        <v-card flat class="d-flex justify-end"
          v-if="$store.state.isUserLoggedIn">
          <v-btn color="accent"   @click="logout" ml-2>Logout<v-icon>mdi-login</v-icon></v-btn>
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
          <v-list-item :to="'/home'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/profile'">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/punch'">
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Punches</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/schedule'">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Schedule</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/contact'">
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
    <div mt-5>
    <router-view/>
    </div>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods: {
      logout() {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
         this.$store.dispatch('setClockin', null)
         window.localStorage.clear();
    window.sessionStorage.clear();
        this.$router.push({
          name: 'Launch'
        })
      }
    },
    computed: {
      email: function() {
      var email = JSON.stringify(this.$store.state.user.email)
      return email.replace(/['"]+/g, '')
  }
    }
  }
</script>

<style>


.loginDiv {
  float: right;
}

#app {
  font-family: 'Roboto';
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
   text-decoration: none;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #80bae9;
}
</style>
