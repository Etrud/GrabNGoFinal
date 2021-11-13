

<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Welcome, {{ fullName }}!</v-toolbar-title>
          </v-toolbar>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <Clock />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-flex>

    <v-flex xs6 offset-xs3 mt-3>
      <v-card elevation="6" height=800>
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Your Next Few Days...</v-toolbar-title>
          </v-toolbar>
          <v-container >
            <yourCalendar/>
          </v-container>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>








<script>
import Clock from "@/components/Clock.vue";
import yourCalendar from "@/components/yourCalendar.vue";

export default {
  components: { Clock, yourCalendar },
  computed: {
    fullName: function () {
      var first = JSON.stringify(this.$store.state.user.firstname);
      var last = JSON.stringify(this.$store.state.user.lastname);

      var newName = first + " " + last;

      console.log(newName);
      return newName.replace(/['"]+/g, "");
    },
  },
};
</script>