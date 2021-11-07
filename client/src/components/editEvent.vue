<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small v-bind="attrs" v-on="on"> mdi-pencil </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="15" sm="14" md="10">
              <v-text-field label="Event name*" required></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-datetime-picker label="Start Date / Time*" v-model="datetime">
              </v-datetime-picker>
            </v-col>
            <v-col cols="12">
              <v-datetime-picker label="End Date / Time*" v-model="datetime">
              </v-datetime-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="users"
                label="Employee Assigned*"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-color-picker
                dot-size="12"
                swatches-max-height="202"
              ></v-color-picker>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import contactservice from "@/services/contactservice";

  export default {
    data: () => ({
      dialog: false,
      users: null,
      datetime: ''
    }),
    async mounted() {
    //do a request to a backend for all users
    const fullUser = (await contactservice.index()).data
    const updatedUser = fullUser.map(user => 'ID: '+user.id+', '+user.firstname+' '+user.lastname)
    this.users = updatedUser
}
  }
  
</script>