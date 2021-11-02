<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Contact Book</v-toolbar-title>
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col v-for="user in users" :key="user.email" cols="auto">
                <v-card
                  :elevation="3"
                  height="300"
                  width="300"
                  color="indigo lighten-5"
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                    align-content="center"
                  >
                    <v-col>
                      <v-img
                        max-height="125"
                        max-width="125"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        class="mx-auto"
                      ></v-img>
                      <p>
                        <br />
                        Name: {{ user.firstname + " " + user.lastname }}<br />
                        Email: {{ user.email }} <br />
                        Phone #: {{ user.phonenum | phoneFix }} <br />
                        <v-btn class="mt-2" 
                        :to="{name: 'Contact', params: {id: user.id}}">
                        View</v-btn>
                      </p>
                    </v-col>
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
import contactservice from "@/services/contactservice";

export default {
  data() {
    return {
      users: null,
      dialog: false,
    }
  },
  async mounted() {
    //do a request to a backend for all users
    this.users = (await contactservice.index()).data;
  },
  props: {
    msg: String,
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

<style scoped>
</style>