<template>
  <div>
    <v-data-table
    dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
    >
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
import punchservice from "@/services/punchservice"
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
          
          { text: 'Punch Time', value: 'punchTime' },
          { text: 'Punch In Message', value: 'punchMessage' },
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
    //do a request to a backend for all users
    const userId = this.$store.state.user.id;
    const preChanged = (await punchservice.show(userId)).data
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