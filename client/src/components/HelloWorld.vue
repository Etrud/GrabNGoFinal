<template>
  <v-container fill-height fluid flex-column text-xs-center>
    <v-card color="secondary" dark max-width="700">
      <v-card-title class="text-h5 justify-center"> {{ msg }} </v-card-title>
      <img alt="Vue logo" src="../assets/logo.png" />
      <v-card-subtitle>
        A web application for the employees and management of Grab N Go Smoke
        Shop. This application entails schedule and time management tools and
        trackers for our team!<br /><br />
        Please continue to the login screen to continue using our application,
        Thank you!
      </v-card-subtitle>
    </v-card>

    <v-card color="secondary" dark max-width="374" class="mt-5">
      <v-card-title class="text-h5 justify-center">
        Hours of Operations
      </v-card-title>

      <v-card-subtitle
        >Mon: 11:00 AM – 11:00 PM<br />
        Tue: 11:00 AM – 11:00 PM<br />
        Wed: 11:00 AM – 11:00 PM<br />
        Thu: 11:00 AM – 11:00 PM<br />
        Fri: 11:00 AM – 11:00 PM<br />
        Sat: 11:00 AM – 11:00 PM<br />
        Sun: Closed</v-card-subtitle
      >
    </v-card>
    <v-card color="secondary" dark max-width="374" class="mt-5">
      <v-card-title class="text-h5 justify-center">Address</v-card-title>

      <v-card-subtitle>
        9540 Richmond Ave<br />
        Houston, TX 77063<br />
        United States
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 25px 0;
}

a {
  color: #42b983;
}
</style>
