<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="error" dark v-bind="attrs" v-on="on">
          Delete User
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this user?
        </v-card-title>
        <v-card-text
          >This will also delete the associated punches, schedule, and other
          related data along with the user.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteUser"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import contactservice from "../services/contactservice";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async deleteUser() {
      try {
        await contactservice.deleteUser(this.$store.state.route.params.id)
        this.dialog = false
        this.$router.push('/contact')
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>