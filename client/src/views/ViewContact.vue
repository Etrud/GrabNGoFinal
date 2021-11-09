<template>
  <v-container fill-height fluid flex-column min>
    <v-flex class="pa-5">
      <v-card elevation="6" class="mx-auto my-12" width="700">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title
              >{{ user.firstname }}'s Profile Page</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fill-height fluid flex-column>
            <v-row justify="center">
              <v-col justify="center">
                <v-img
                  max-height="150"
                  max-width="150"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="mx-auto mb-5"
                ></v-img>
                <v-card height="300" width="300">
                  <p><br />Employee ID: {{ user.id }}</p>
                  <hr />
                  <br />
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
      <v-card elevation="6" class="mt-3" v-show="this.$store.state.user.isAdmin == true">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            Admin Controls
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <div class="my-3"><editUser /></div>
                <br/>
                <div class="my-3"> <deleteUser /></div>
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
import deleteUser from "@/components/deleteUser";
import editUser from "@/components/editUser";

export default {
  components: { deleteUser, editUser },
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