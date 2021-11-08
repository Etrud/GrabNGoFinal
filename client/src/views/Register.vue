<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6" class="mx-auto my-12" width="700">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-4 pb-2">
            <form name="register-form" autocomplete="off">
              <v-text-field
                filled
                dense
                outlined
                ref="email"
                v-model="email"
                placeholder="email@example.com"
                label="Email"
              />
              <br />
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
              <br />
              <v-text-field
                ref="firstname"
                filled
                outlined
                dense
                v-model="firstname"
                placeholder="First Name"
                label="First Name"
              />
              <br />
              <v-text-field
                ref="lastname"
                filled
                outlined
                dense
                v-model="lastname"
                placeholder="Last Name"
                label="Last Name"
              />
              <br />
              <v-text-field
                ref="address"
                filled
                outlined
                dense
                v-model="address"
                placeholder="Address"
                label="Address Line"
                counter="50"
              />
              <br />
              <v-text-field
                ref="phonenum"
                filled
                outlined
                dense
                v-model="phonenum"
                placeholder="(777)777-1234"
                label="Phone #"
              />
            </form>
            <div class="error--text">{{ error }}</div>
            <v-btn @click="register" color="#98fb98">Register</v-btn>
            <v-btn to="/login" color="#78909C">Already have an account?</v-btn>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import authservice from "../services/authservice";
export default {
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenum: "",
      error: null,
    };
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
          phonenum: this.phonenum,
        });
        this.$router.push('/login')
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>


<style scoped>
.error {
  color: red;
}

.v-btn {
  margin: 1%;
}
</style>
