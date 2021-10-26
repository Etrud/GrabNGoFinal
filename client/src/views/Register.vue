<template>
  <div>
    <h1>Registration</h1>

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
    <input type= "text" 
    name = "firstname" 
    v-model="firstname"
    placeholder="First Name" />
    <br>
    <input type= "text" 
    name = "lastname" 
    v-model="lastname"
    placeholder="Last Name" />
    <br>
    <input type= "text" 
    name = "address" 
    v-model="address"
    placeholder="Address" />
    <br>
    <input type= "phone" 
    name = "phonenum" 
    v-model="phonenum"
    placeholder="Phone #" />

    <div class="error" v-html="error"/>
    <br>
    <button @click="register">Register</button>

  </div>
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
</style>
