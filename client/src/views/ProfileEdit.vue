<template>
  <v-container fluid column>
    <v-flex xs6 offset-xs3>
      <v-card elevation="6">
        <div class>
          <v-toolbar flat dense color="tertiary" dark>
            <v-toolbar-title>Editing Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-btn @click="update" :disabled="!isFormValid" color="success">Save</v-btn>

            <v-btn to="/profile">Back</v-btn>
          </v-toolbar>
          <v-form v-model="isFormValid" autocomplete="off" lazy-validation>
          <v-container mt-5>
            <v-row justify="center">
              <v-col>
                <v-img
                  max-height="150"
                  max-width="150"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="mx-auto"
                ></v-img
                >
                  <p><br />Employee ID: {{ id }}</p>
                  <p>
                    <v-text-field
                      label="First Name"
                      v-model="firstname"
                      :rules="[rules.required, rules.counter, rules.name]"
                      outlined
                      counter
                      maxlength="35"
                    ></v-text-field>
                  </p>
                  <p>
                    <v-text-field
                      label="Last Name"
                      v-model="lastname"
                      :rules="[rules.required, rules.counter , rules.name]"
                      outlined
                      counter
                      maxlength="35"
                    ></v-text-field>
                  </p>
                  <p>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      outlined
                      disabled
                    ></v-text-field>
                  </p>
                  <p>
                    <v-text-field
                      label="Phone #"
                      v-model="phonenum"
                       :rules="[rules.required, rules.phone, rules.phonecounter, rules.phonecounter2]"
                      outlined
                    ></v-text-field>
                  </p>
                  <p>
                    <v-text-field
                      label="Address"
                      v-model="address"
                      :rules="[rules.required, rules.addcounter]"
                      outlined
                      counter
                      maxlength="50"
                    ></v-text-field>
                  </p>
                
              </v-col>
            </v-row>
          </v-container>
          </v-form>
          <div class="error--text">{{ error }}</div>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import authservice from "../services/authservice";

export default {
  data() {
    return {
       rules: {
          required: value => !!value || 'Required.',
          name: value => /^([^0-9]*)$/.test(value) || 'No numbers allowed',
          phone: value => /^[0-9]*$/.test(value) || 'Only numbers allowed',
          counter: value => value.length <= 35 || 'Max 35 characters',
          phonecounter: value => value.length <= 10 || 'Max 10 characters',
          phonecounter2: value => value.length >= 10 || 'No less 10 characters',
          addcounter: value => value.length <= 50 || 'Max 50 characters',
          },
      isFormValid: false,
      error: null,
      id: this.$store.state.user.id,
      firstname: this.$store.state.user.firstname,
      lastname: this.$store.state.user.lastname,
      email: this.$store.state.user.email,
      phonenum: this.$store.state.user.phonenum,
      address: this.$store.state.user.address,
    };
  },
  methods: {
    async update() {
      try {
         await authservice.update({
          id: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phonenum: this.phonenum,
          address: this.address,
        })
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'Launch'
        })
        
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    
    },
    computed: {
      getPhone: function () {
        var phone = JSON.stringify(this.$store.state.user.phonenum);
        return phone.replace(/["'](\d{3})(\d{3})(\d{4})["']/, "($1) $2-$3");
      },
  },
};
</script>