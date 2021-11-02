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
          { text: 'Punch Message', value: 'punchMessage' },
        ]
      }
  },
  async mounted() {
    console.lo
    const employeeID = this.$store.state.user.id;
    this.punches = (await punchservice.show(employeeID)).data
  }
}
</script>
