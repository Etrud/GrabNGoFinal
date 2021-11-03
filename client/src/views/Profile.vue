<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Your Profile Page</v-toolbar-title>
             <v-spacer></v-spacer>
             <v-btn to="/profile/edit">Edit</v-btn>
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
                <v-card height="300"
                  width="300">
                <p><br>Employee ID: {{ getID }}</p>
                <p>Name: {{ fullName }}</p>
                <p>Email: {{ getEmail }}</p>
                <p>Phone #: {{ getPhone }}</p>
                <p>Address: {{ getAddress }}</p>
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
export default {
  components: {},
  computed: {
    fullName: function () {
      var first = JSON.stringify(this.$store.state.user.firstname);
      var last = JSON.stringify(this.$store.state.user.lastname);

      var newName = first + " " + last;
      console.log(newName);
      return newName.replace(/['"]+/g, "");
    },
    getID: function () {
      var id = JSON.stringify(this.$store.state.user.id);
      console.log(id);
      return id.replace(/['"]+/g, "");
    },
    getEmail: function () {
      var email = JSON.stringify(this.$store.state.user.email);
      console.log(email);
      return email.replace(/['"]+/g, "");
    },
    getPhone: function () {
      var phone = JSON.stringify(this.$store.state.user.phonenum);
      console.log(phone);
      return phone.replace(/["'](\d{3})(\d{3})(\d{4})["']/, "($1) $2-$3");
    },
    getAddress: function () {
      var address = JSON.stringify(this.$store.state.user.address);
      console.log(address);
      return address.replace(/['"]+/g, "");
    },
  },
};
</script>