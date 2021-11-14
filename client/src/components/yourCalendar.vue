<template>
  <v-row>
    <v-col>
      <v-sheet height="600" id="printMe3">
        <h3>Next Scheduled Event: {{ nextDate }}</h3> <br><v-btn @click="print3">Print</v-btn> <v-spacer></v-spacer>
        <br />
        
        <v-calendar
          ref="calendar"
          :events="events"
          :event-color="getEventColor"
          type="week"
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
import moment from "moment";

export default {
  data: () => ({
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    nextDate: [],
  }),
  mounted() {
    this.$refs.calendar.scrollToTime("11:00");
  },
  methods: {
    async print3 () {
      // Pass the element id here
      await this.$htmlToPaper('printMe3');
    },
    async getEvents() {
      const oldNextDate = (
        await scheduleservice.showNext(this.$store.state.user.id)
      ).data;
      this.nextDate = moment(oldNextDate[0].start).format("YYYY-MM-DD hh:mm a");

      const preChanged = (await scheduleservice.show(this.$store.state.user.id))
        .data;
      for (var i in preChanged) {
        preChanged[i].start = moment(preChanged[i].start).format(
          "YYYY-MM-DD HH:mm"
        );
        preChanged[i].end = moment(preChanged[i].end).format(
          "YYYY-MM-DD HH:mm"
        );
      }

      this.events = preChanged;
    },
    getEventColor(event) {
      return event.color;
    },
  },
};
</script>