<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title
              >{{ user.firstname }}'s Profile Page</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fill-height fluid>
            <v-row justify="center">
              <v-col justify="center">
                <v-img
                  max-height="150"
                  max-width="150"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="mx-auto mb-5"
                ></v-img>
                <v-card max-width="315">
                  <p><br />Employee ID: {{ user.id }}</p>
                  <p>Name: {{ user.firstname }} {{ user.lastname }}</p>
                  <p>Email: {{ user.email }}</p>
                  <p>Phone #: {{ user.phonenum | phoneFix }}</p>
                  <p>Address: {{ user.address }}</p>
                  <v-btn @click="emailTo" class="mb-5">Email Me</v-btn></v-card
                >
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card elevation="6" class="mt-3">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            Admin Controls
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <v-btn>Edit User</v-btn>
                <v-btn>Delete User</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import contactservice from "@/services/contactservice";

export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    const userId = this.$store.state.route.params.id;
    this.user = (await contactservice.show(userId)).data;
  },
  methods: {
    emailTo: function () {
      window.open(`mailto:${this.user.email}`);
    },
  },
  filters: {
    phoneFix: function (phone) {
      return phone
        .replace(/[^0-9]/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    },
  },
};
</script>