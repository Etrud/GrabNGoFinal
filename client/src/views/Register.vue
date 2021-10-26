<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
      <div class>
        <v-toolbar flat dense color="#9E9E9E" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
          <div class ="pl-4 pr-4 pt-2 pb-2">
            <input type= "email" 
            name = "email" 
            v-model="email"
            placeholder="email" />
            <br>
            <input type= "password" 
            name = "password" 
            v-model="password"
            placeholder="password" />
            <br>
            <v-text-field 
            ref="lastname"
            v-model="lastname"
            placeholder="First Name"
            label="First Name"
             />
            <br>
            <v-text-field 
            ref="lastname"
            v-model="lastname"
            placeholder="Last Name"
            label="Last Name"
             />
            <br>
            <v-text-field 
            ref="address"
            v-model="address"
            placeholder="Address"
            label="Address Line"
            counter="50"
             />
            <br>
            <v-text-field 
            ref="phonenum"
            v-model="phonenum"
            placeholder="(777)777-1234"
            label="Phone #"
             />

            <div class="error" v-html="error"/>
            <br>
            <v-btn @click="register">Register</v-btn>

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
      firstname: '',
      lastname: '',
      address: '',
      phonenum: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        await authservice.register({
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          address: this.address,
          phonenum: this.phonenum
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

input{
  box-sizing: border-box;
}
</style>
