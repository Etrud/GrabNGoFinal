<template>
  <v-container fill-height fluid flex-column min>
    <v-flex class="pa-5">
      <v-card elevation="6" class="mx-auto my-12" width="700">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Your Profile Page</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn to="/profile/edit" color="accent">Edit<v-icon small color="" > mdi-pencil </v-icon></v-btn>
          </v-toolbar>
          <v-container fill-height fluid flex-column>
            <v-row justify="center">
              <v-col justify="center">
                <v-img
                  max-height="150"
                  max-width="150"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="mx-auto"
                ></v-img>

                <v-card
                  height="400"
                  width="300"
                  justify="center"
                  class="mt-2"
                  color=""
                  
                  elevation="0"
                >
                  <h4>
                    <br /> <v-icon med color="" > mdi-account </v-icon>&nbsp;About Me
                  </h4>

                  <hr />
                  <p><br />Employee ID: {{ getID }}</p>

                  <p>Name: {{ fullName }}</p>
                  <p>Email: {{ getEmail }}</p>
                  <p>Phone #: {{ getPhone }}</p>
                  <p>Address: {{ getAddress }}</p><br>
                  <request-info-change/>
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
import RequestInfoChange from '../components/requestInfoChange.vue';
export default {
  components: {RequestInfoChange},
  computed: {
    fullName: function () {
      var first = JSON.stringify(this.$store.state.user.firstname);
      var last = JSON.stringify(this.$store.state.user.lastname);

      var newName = first + " " + last;
      return newName.replace(/['"]+/g, "");
    },
    getID: function () {
      var id = JSON.stringify(this.$store.state.user.id);
      return id.replace(/['"]+/g, "");
    },
    getEmail: function () {
      var email = JSON.stringify(this.$store.state.user.email);
      return email.replace(/['"]+/g, "");
    },
    getPhone: function () {
      var phone = JSON.stringify(this.$store.state.user.phonenum);
      return phone.replace(/["'](\d{3})(\d{3})(\d{4})["']/, "($1) $2-$3");
    },
    getAddress: function () {
      var address = JSON.stringify(this.$store.state.user.address);
      return address.replace(/['"]+/g, "");
    },
  },
};
</script>