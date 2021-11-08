<template>
  <v-container fluid >
    <v-flex xs6 offset-xs3 >
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Grab N Go Schedule</v-toolbar-title>
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <Calendar/>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card elevation="6" class="mt-3">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
           <v-toolbar-title>User Commands</v-toolbar-title> 
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col class="mb-5">
                <requestDayOff/>

              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card elevation="6" class="mt-3">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Admin Settings</v-toolbar-title>
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <addEvent/>
                
              </v-col>
              <v-col>
                <calendarTable/>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>


<script>
import Calendar from "@/components/Calendar.vue";
import requestDayOff from "@/components/requestDayOff.vue";
import addEvent from "@/components/addEvent.vue";
import calendarTable from "@/components/calendarTable.vue";

export default {
  components: { Calendar, addEvent, calendarTable, requestDayOff },
}
</script>