<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Punch Page</v-toolbar-title>
          </v-toolbar>
          <v-container class="mt-5 pb-10">
            <v-row justify="center">
              <v-col>
                <Clock />

                <v-btn
                  color="green"
                  :disabled="$store.state.clockIn"
                  @click="clockIn"
                  class="mr-3"
                  >Clock In</v-btn
                >
                <v-btn
                  color="red"
                  :disabled="!$store.state.clockIn"
                  @click="clockIn"
                  >Clock Out</v-btn
                > <br>
              </v-col>




            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card elevation="6" class="mt-5">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Punch History</v-toolbar-title>
          </v-toolbar>
          <v-container class="mt-5 pb-10">
            <v-row justify="center">
              <v-col>
                <punchHistory/>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>


      <v-card elevation="6" class="mt-5">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>All Punches</v-toolbar-title>
          </v-toolbar>
          <v-container class="mt-5 pb-10">
            <v-row justify="center">
              <v-col>
                <punchAll/>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import Clock from "@/components/Clock"
import punchHistory from "@/components/punchHistory"
import punchAll from "@/components/punchAll"
import punchservice from '../services/punchservice'

export default {
  data() {
    return {
      punches: '',
      employeeID: '',
      punchTime: '',
      punchMessage:'',
    }
  },
 
  components: { Clock, punchHistory, punchAll },
  async mounted() {

  },
  methods: {
    async clockIn(){
      var currentDate = new Date()
      try {
        await punchservice.registerPunch({
          employeeID: this.$store.state.user.id,
          punchTime: currentDate,
          punchMessage: this.$store.state.clockIn
        });
      } catch (error) {
        this.error = error.response.data.error;
    }
      if (this.$store.state.clockIn == false) {
        this.$store.dispatch("setClockin", true);
        console.log(this.punchTime);
        alert('Clocked in')
      } else {
        this.$store.dispatch("setClockin", false);
        alert('Clocked out')
      }
    },
  },
};
</script>