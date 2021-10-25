<template>
  <div>
    <h1>register</h1>

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


    <button @click="register">Register</button>

  </div>
</template>

<script>
import authservice from '../services/authservice'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register(){
      const response = await authservice.register({
        email: this.email,
        password:this.password
      })
      console.log(response.data)
    }
  }
 }
</script>


<style scoped>

</style>
