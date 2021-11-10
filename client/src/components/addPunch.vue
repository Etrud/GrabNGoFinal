<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        add Manual Punch
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Punch</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            

            <v-col cols="12">
              <VueCtkDateTimePicker v-model="punchTime" label="Punch Time/Date*"/>
            </v-col>
            
            <v-col cols="12" sm="6">
              <v-select
                :items="users"
                label="Selected Employee*"
                :item-text="item => 'ID: '+item.id+', '+item.firstname +' '+ item.lastname"
                item-value="id"
                outlined
                v-model="employeeId"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
             <v-select
                :items="options"
                label="Clock In or Out*"
                item-text="message"
                item-value="abbr"
                outlined
                v-model="punchMessage"
                required
              >
              </v-select>
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
        <v-btn color="blue darken-1" text @click="createPunch"> Add </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import contactservice from "@/services/contactservice";
import punchservice from "@/services/punchservice";

export default {
  data: () => ({
    options: [
          { message: 'Clock IN', abbr: true },
          { message: 'Clock OUT', abbr: false },
        ],
    dialog: false,
    users: null,
    employeeId: "",
    punchTime: "",
    punchMessage: ""
  }),
  async mounted() {
    //do a request to a backend for all users
    const fullUser = (await contactservice.index()).data;
    this.users = fullUser;
  },
  methods: {
    async createPunch() {
      try {
        await punchservice.registerPunch({
          employeeID: this.employeeId,
          punchTime: this.datetime,
          punchMessage: this.punchMessage,
        });
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>