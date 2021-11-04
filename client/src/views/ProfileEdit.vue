<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Editing Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="update">Save</v-btn>

            <v-btn to="/profile">Back</v-btn>
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <v-img
                  max-height="150"
                  max-width="150"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="mx-auto"
                ></v-img>
                <p><br />Employee ID: {{ id }}</p>
                <p>
                  <v-text-field
                    label="First Name"
                    v-model="firstname"
                    outlined
                  ></v-text-field>
                </p>
                <p>
                  <v-text-field
                    label="Last Name"
                    v-model="lastname"
                    outlined
                  ></v-text-field>
                </p>
                <p>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    outlined
                    disabled
                  ></v-text-field>
                </p>
                <p>
                  <v-text-field
                    label="Phone #"
                    v-model="phonenum"
                    outlined
                  ></v-text-field>
                </p>
                <p>
                  <v-text-field
                    label="Address"
                    v-model="address"
                    outlined
                  ></v-text-field>
                </p>
              </v-col>
            </v-row>
          </v-container>
          <div class="error" v-html="error" />
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
      id: this.$store.state.user.id,
      firstname: this.$store.state.user.firstname,
      lastname: this.$store.state.user.lastname,
      email: this.$store.state.user.email,
      phonenum: this.$store.state.user.phonenum,
      address: this.$store.state.user.address,
    };
  },
  methods: {
    async update() {
      try {
         await authservice.update({
          id: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phonenum: this.phonenum,
          address: this.address,
        })
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'Launch'
        })
        
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    
    },
    computed: {
      getPhone: function () {
        var phone = JSON.stringify(this.$store.state.user.phonenum);
        return phone.replace(/["'](\d{3})(\d{3})(\d{4})["']/, "($1) $2-$3");
      },
  },
};
</script>