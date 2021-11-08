<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
    >
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
      punches: [],
      headers: [
        {
          text: "Punch ID #",
          align: "start",
          sortable: false,
          value: "id",
        },

        { text: "Punch Time", value: "punchTime" },
        { text: "Punch In Message", value: "punchMessage" },
      ],
    };
  },
  methods: {
    getColor(punchMessage) {
      if (punchMessage == "CLOCK IN") return "green";
      else if (punchMessage == "CLOCK OUT") return "red";
      else return "green";
    },
  },
  async mounted() {
    //do a request to a backend for all users
    const userId = this.$store.state.user.id;
    const preChanged = (await punchservice.show(userId)).data;
    for (var i in preChanged) {
      //console.log( preChanged[i].punchTime )
      preChanged[i].punchTime = moment(preChanged[i].punchTime).format(
        "YYYY-MM-DD HH:mm:ss a"
      );
      //console.log( preChanged[i].punchTime )

      if (preChanged[i].punchMessage == true) {
        preChanged[i].punchMessage = "CLOCK IN";
      } else if (preChanged[i].punchMessage == false) {
        preChanged[i].punchMessage = "CLOCK OUT";
      }
    }
    this.punches = preChanged;
  },
};
</script>