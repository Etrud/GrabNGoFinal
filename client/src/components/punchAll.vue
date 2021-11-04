<template>
  <div>
    <v-data-table
    dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
    ><template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template  v-slot:[`item.punchMessage`]="{ item }">
      <v-chip
        :color="getColor(item.punchMessage)"
        dark
      >
        {{ item.punchMessage }}
      </v-chip>
    </template>
    </v-data-table>
  </div>
</template>

<script>
import punchservice from "@/services/punchservice";
import moment from "moment"

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
          {
            text: 'Employee F. Name',
            value: 'User.firstname',
          },
          {
            text: 'Employee L. Name',
            value: 'User.lastname',
          },
          { text: 'Punch Time', value: 'punchTime' },
          { text: 'Punch In Message', value: 'punchMessage' },
          { text: 'Actions', value: 'actions', sortable: false },
        ]
      }
  },
  methods: {
      getColor (punchMessage) {
        if (punchMessage == true) return 'green'
        else if (punchMessage == false) return 'red'
        else return 'green'
      },
    },
  async mounted() {


    const preChanged = (await punchservice.index()).data
        for(var i in preChanged)
        {
          console.log( preChanged[i].punchTime )
          preChanged[i].punchTime = moment.utc(preChanged[i].punchTime).format('YYYY-MM-DD HH:mm:ss a')
          console.log( preChanged[i].punchTime )
        }
        
        this.punches = preChanged
  },
};
</script>