<template>
  <v-row>
    <v-col>
        
      <v-sheet height="700">
          
        <v-calendar
          ref="calendar"
          :events="events"
          :event-color="getEventColor"
          type="week"
          @change="getEvents"
        >
        </v-calendar>
      
      </v-sheet>

    </v-col>
  </v-row>
</template>

<script>
import scheduleservice from "@/services/scheduleservice";
import moment from 'moment';

  export default {
    data: () => ({
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      }),
    mounted () {
      this.$refs.calendar.scrollToTime('11:00')
    },
     methods: {
      async getEvents () {
        const preChanged = (await scheduleservice.show(this.$store.state.user.id)).data
        for(var i in preChanged)
        {
          console.log( preChanged[i].start )
          preChanged[i].start = moment.utc(preChanged[i].start).format('YYYY-MM-DD HH:mm')
          preChanged[i].end = moment.utc(preChanged[i].end).format('YYYY-MM-DD HH:mm')
          console.log( preChanged[i].start )
        }
        
        this.events = preChanged
      },
      getEventColor (event) {
        return event.color
      },
    },
  }
</script>