
<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="schedules"
      :items-per-page="5"
      class="elevation-1"
      ><template v-slot:[`item.actions`]="{ item }">


        <editEvent/>
        
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
      <template v-slot:[`item.color`]="{ item }">
        <v-chip :color="getColor(item.color)" dark>
          {{ item.color }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import scheduleservice from "@/services/scheduleservice";
import editEvent from "@/components/editEvent"
import moment from "moment";

export default {
  components: {editEvent},
  data() {
    return {
      dialog: false,
      schedules: [],
      headers: [
        {
          text: "Schedule ID #",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Employee ID #",
          value: "employeeID",
        },
        {
          text: "Event Name",
          value: "name",
        },
        {
          text: "Employee F. Name",
          value: "User.firstname",
        },
        {
          text: "Employee L. Name",
          value: "User.lastname",
        },
        { text: "Start", value: "start" },
        { text: "End", value: "end" },
        { text: "Color", value: "color" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
      getColor(color) {
        return color;
    },
    async deleteItem(id) {
      try {
        await scheduleservice.deleteSchedule(id);
        this.dialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  async mounted() {
    const preChanged = (await scheduleservice.index()).data;
    for (var i in preChanged) {
      //console.log( preChanged[i].punchTime )
      preChanged[i].start = moment(preChanged[i].punchTime).format(
        "YYYY-MM-DD HH:mm:ss a"
      )
      preChanged[i].end = moment(preChanged[i].punchTime).format(
        "YYYY-MM-DD HH:mm:ss a"
      )
      //console.log( preChanged[i].punchTime )
    }

    this.schedules = preChanged;
  },
};
</script>