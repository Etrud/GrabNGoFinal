<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
      ><template v-slot:[`item.actions`]="{ item }">

        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>

        
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this punch?
            </v-card-title>
            <v-card-text
              >This will be a permanent deletion of the data.</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn color="green darken-1" text @click="deleteItem(item.id)">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:[`item.punchMessage`]="{ item }">
        <v-chip :color="getColor(item.punchMessage)" dark>
          {{ item.punchMessage }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import punchservice from "@/services/punchservice";
import moment from "moment";

export default {
  data() {
    return {
      dialog: false,
      punches: [],
      headers: [
        {
          text: "Punch ID #",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Employee ID #",
          value: "employeeID",
        },
        {
          text: "Employee F. Name",
          value: "User.firstname",
        },
        {
          text: "Employee L. Name",
          value: "User.lastname",
        },
        { text: "Punch Time", value: "punchTime" },
        { text: "Punch In Message", value: "punchMessage" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getColor(punchMessage) {
      if (punchMessage == true) return "green";
      else if (punchMessage == false) return "red";
      else return "green";
    },
    async deleteItem(id) {
      try {
        await punchservice.deletePunch(id);
        this.dialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  async mounted() {
    const preChanged = (await punchservice.index()).data;
    for (var i in preChanged) {
      //console.log( preChanged[i].punchTime )
      preChanged[i].punchTime = moment(preChanged[i].punchTime).format(
        "YYYY-MM-DD HH:mm:ss a"
      );
      //console.log( preChanged[i].punchTime )
    }

    this.punches = preChanged;
  },
};
</script>