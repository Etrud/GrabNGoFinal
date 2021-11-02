<template>
  <v-container fluid >
    <v-flex xs6 offset-xs3 >
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
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
          <v-toolbar flat dense color="#303F9F" dark>
            
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <v-btn>Request day off</v-btn>
                <v-btn>Other button</v-btn>
                <v-btn>Other button</v-btn>
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

export default {
  components: { Calendar },
}
</script>