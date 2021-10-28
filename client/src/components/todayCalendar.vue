<template>
<v-container fluid column>
    <v-flex xs6 offset-xs3>
  <div id = "scheduleComponent">
    <v-card
      class="d-flex justify-center mb-6"
      :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
      :elevation="6"
      tile
    >
      <v-card-title>Today's Schedule</v-card-title>
  <v-row>
    <v-col >
      <v-sheet height="400">
        <v-calendar
          color="primary"
          type="day"
          :events="events"
        >
          <template v-slot:day-header="{ present }">
            <template
              v-if="present"
              class="text-center"
            >
              Today
            </template>
          </template>

          <template v-slot:interval="{ hour }">
            <div
              class="text-center"
            >
              {{ hour }}:00
            </div>
            
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
    </v-card>
  </div>
    </v-flex>
</v-container>
</template>

<script>
  export default {
    data: () => ({
        events: [
        {
          name: 'Weekly Meeting',
          start: '2021-10-28 09:00',
          end: '2021-10-28 10:00',
        },
        {
          name: `Thomas' Birthday`,
          start: '2021-10-28',
        },
        {
          name: 'Weekly Meeting 2',
          start: '2021-10-28 09:00',
          end: '2021-10-28 11:00',
        },
      ],
    }),
     mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
  }
</script>

<style scoped>

</style>