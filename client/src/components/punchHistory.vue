<template>
  <div>
    <v-data-table
    dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import punchservice from "@/services/punchservice";

export default {
  data() {
    return {
      punches: [],
      headers: [
          {
            text: 'Punch ID #',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          {
            text: 'Employee ID #',
            value: 'employeeID',
          },
          { text: 'Punch Time', value: 'punchTime' },
          { text: 'Punch In Message', value: 'punchMessage' },
        ]
      }
  },
  async mounted() {
    //do a request to a backend for all users
    this.punches = (await punchservice.index()).data;
  },
};
</script>