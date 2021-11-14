<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card elevation="6" class="mx-auto my-12" width="700">
          <div class>
            <v-toolbar flat dense color="tertiary" dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <div class="pl-4 pr-4 pt-4 pb-2">
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

              <div class="error--text">{{ error }}</div>
              <br />
              <v-btn @click="login" color="success">Login</v-btn>
              <v-btn to="/register" color="accent">Create an account</v-btn>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authservice from "../services/authservice";
import punchservice from "../services/punchservice";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await authservice.login({
          email: this.email,
          password: this.password,
        });
        var clockinresponse = await punchservice.getLastPunch(
          response.data.user.id
        );
        console.log(JSON.stringify(clockinresponse));
        if (!Object.keys(clockinresponse.data).length) {
          console.log("I got here");
          clockinresponse = false;
        } else if (clockinresponse.data.punchMessage == true) {
          clockinresponse = true;
        } else {
          clockinresponse = false;
        }
        console.log(clockinresponse);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setClockin", clockinresponse);
        this.$router.push("/home");
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
