<template>
  <v-row>
    <v-col>
        
      <v-sheet height="700">
         <h3> Next Scheduled Event: {{nextDate}}</h3><br/>
        <v-calendar
          ref="calendar"
          :events="events"
          :event-color="getEventColor"
          type="4day"
          @change="getEvents"
          first-time="09:00"
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
      nextDate:[]
      }),
    mounted () {
      this.$refs.calendar.scrollToTime('11:00')
    },
     methods: {
      async getEvents () {
        const oldNextDate=(await scheduleservice.showNext(this.$store.state.user.id)).data
        this.nextDate =  moment(oldNextDate[0].start).format('YYYY-MM-DD hh:mm a')

        const preChanged = (await scheduleservice.show(this.$store.state.user.id)).data
        for(var i in preChanged)
        {
          preChanged[i].start = moment(preChanged[i].start).format('YYYY-MM-DD HH:mm')
          preChanged[i].end = moment(preChanged[i].end).format('YYYY-MM-DD HH:mm')
        }
        
        this.events = preChanged
      },
      getEventColor (event) {
        return event.color
      },
    },
  }
</script>