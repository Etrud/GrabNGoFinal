<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
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
                >
                <br />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card elevation="6" class="mt-5">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Your Punch History</v-toolbar-title>
          </v-toolbar>
          <v-container class="mt-5 pb-10" id="printMe">
            <v-row justify="center">
              <v-col>
                <punchHistory />
              </v-col>
            </v-row>
          </v-container>
          <v-btn class="mb-3" @click="print">Print</v-btn>
        </div>
      </v-card>

      <v-card elevation="6" class="mt-5">
        <div v-show="this.$store.state.user.isAdmin == true">
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>All Punches</v-toolbar-title>
          </v-toolbar>
          <v-container class="mt-5 pb-10" id="printMe2">
            <v-row justify="center">
              <v-col>
                <punchAll />
              </v-col>
            </v-row>
            <br />
            <addPunch />
          </v-container>
          <v-btn class="mb-3" @click="print2">Print</v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import Clock from "@/components/Clock";
import punchHistory from "@/components/punchHistory";
import punchAll from "@/components/punchAll";
import addPunch from "@/components/addPunch";
import punchservice from "../services/punchservice";

export default {
  data() {
    return {
      punches: "",
      employeeID: "",
      punchTime: "",
      punchMessage: "",
      output: null,
    };
  },

  components: { Clock, punchHistory, punchAll, addPunch },
  async mounted() {},
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    async print2() {
      // Pass the element id here
      await this.$htmlToPaper("printMe2");
    },
    async clockIn() {
      var date = new Date();
      var currentDate = Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );

      console.log(currentDate);

      if (this.$store.state.clockIn == false) {
        this.$store.dispatch("setClockin", true);
        //console.log(this.punchTime);
        alert("Clocked in");
      } else {
        this.$store.dispatch("setClockin", false);
        alert("Clocked out");
      }
      try {
        await punchservice.registerPunch({
          employeeID: this.$store.state.user.id,
          punchTime: currentDate,
          punchMessage: this.$store.state.clockIn,
        });
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>