<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        add Schedule Event
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="15" sm="14" md="10">
              <v-text-field label="Event name*" required v-model="name"></v-text-field>
            </v-col>

            <v-col cols="12">
              <VueCtkDateTimePicker v-model="datetime" />
            </v-col>
            <v-col cols="12">
              <VueCtkDateTimePicker v-model="end" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="users"
                label="Employee Assigned*"
                item-text="firstname"
                item-value="id"
                v-model="employeeId"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-color-picker
                dot-size="12"
                swatches-max-height="202"
                v-model="color"
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
        <v-btn color="blue darken-1" text @click="createEvent"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import contactservice from "@/services/contactservice";
import scheduleservice from "@/services/scheduleservice";

export default {
  data: () => ({
    dialog: false,
    users: null,
    datetime: "",
    end: "",
    employeeId: '',
    color:"",
    name:"",
  }),
  async mounted() {
    //do a request to a backend for all users
    const fullUser = (await contactservice.index()).data;
    // const updatedUser = fullUser.map(
    //   (user) => "ID: " + user.id + ", " + user.firstname + " " + user.lastname
    // );
    this.users = fullUser;
  },
  methods: {
    getID : function(string){
      return string.charAt(4)
    },
    async createEvent() {
      try {
         await scheduleservice.registerSchedule({
          name: this.name,
          start: this.datetime,
          end: this.end,
          employeeID: this.employeeId,
          color: this.color,
        });
        this.$router.go()
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>