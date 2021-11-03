<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="#303F9F" dark>
            <v-toolbar-title>Settings</v-toolbar-title>
          </v-toolbar>
          <v-container mt-5>
            <v-btn @click="changeTheme" text rounded>Change Theme</v-btn>
          </v-container>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      output: null,
    };
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
};
</script>