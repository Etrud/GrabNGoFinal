<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
      <div class>
        <v-toolbar flat dense color="#303F9F" dark>
          <v-toolbar-title>Contact book</v-toolbar-title>
        </v-toolbar>
        <v-container mt-5>
    <v-row justify="center">
      <v-col
        v-for="user in users" :key="user.email"
        cols="auto"
      >
        <v-card 
          :elevation="n - 1"
          height="300"
          width="300"
          color="green"
        > 
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          
          >
          {{user.firstname}}
          {{user.lastname}}
          {{user.email}}
          {{user.phonenum}}
          <v-btn>View</v-btn>
              </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
      </div>
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>

import contactservice from '@/services/contactservice'

export default {
  data() {
    return {
        users: null
    }
  },
  async mounted() {
    //do a request to a backend for all users
    this.users = (await contactservice.index()).data
  }
}
</script>

<style scoped>
.secondary{
   color: aqua;
}
</style>