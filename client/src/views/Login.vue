<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
      <div class>
        <v-toolbar flat dense color="#303F9F" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
          <div class ="pl-4 pr-4 pt-4 pb-2">
            <v-text-field
            filled
            dense
            outlined
            ref="email"
            v-model="email"
            placeholder="email@example.com"
            label="Email"
             />
            <br>
            <v-text-field
            filled
            outlined
            dense
            type="password"
            ref="password"
            v-model="password"
            placeholder=""
            label="Password"
             />
            <br>
            

            <div class="error" v-html="error"/>
            <br>
            <v-btn @click="login" color="#98fb98">Login</v-btn>
            <v-btn to="/register" color="#78909C">Create an account</v-btn>
          </div>
      </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import authservice from '../services/authservice'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await authservice.login({
          email: this.email,
          password: this.password
      }) }
      catch (error) {
        this.error = error.response.data.error
      }
      }   
    }
  }
</script>


<style scoped>
.error{
  color: red;
}

.v-btn{
  margin: 1%
}

</style>
