<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Edit User
        </v-btn>
      </template>
      <v-card>
        <v-form v-model="isFormValid" autocomplete="off" lazy-validation>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="First name*"
                  required
                  v-model="firstname"
                  :rules="[rules.required, rules.counter , rules.name]"
                  counter
                  outlined
                  maxlength="35"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Last name*"
                  persistent-hint
                  required
                  :rules="[rules.required, rules.counter , rules.name]"
                  counter
                  outlined
                  maxlength="35"
                   v-model="lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  outlined
                   v-model="email"
                    :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Address*"
                  required
                  v-model="address"
                  :rules="[rules.required, rules.addcounter]"
                  counter
                  outlined
                  maxlength="50"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Phone Number*"
                  :rules="[rules.required, rules.phone, rules.phonecounter, rules.phonecounter2]"
                  outlined
                  required
                   v-model="phonenum"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
             <v-select
                :items="options"
                label="User Role*"
                item-text="message"
                item-value="abbr"
                outlined
                v-model="isAdmin"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
             <v-select
                :items="employoptions"
                label="User Employed*"
                item-text="message"
                item-value="abbr"
                outlined
                v-model="isEmployed"
                required
              >
              </v-select>
            </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!isFormValid"
            @click="updateUser"
          >
            Save
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import contactservice from "../services/contactservice";

export default {
  data() {
    return {
       options: [
          { message: 'User', abbr: false },
          { message: 'Admin', abbr: true },
        ],
        employoptions: [
          { message: 'Employed', abbr: true },
          { message: 'Not Employed', abbr: false },
        ],
      rules: {
          required: value => !!value || 'Required.',
          name: value => /^([^0-9]*)$/.test(value) || 'No numbers allowed',
          phone: value => /^[0-9]*$/.test(value) || 'Only numbers allowed',
          counter: value => value.length <= 35 || 'Max 35 characters',
          phonecounter: value => value.length <= 10 || 'Max 10 characters',
          phonecounter2: value => value.length >= 10 || 'No less 10 characters',
          addcounter: value => value.length <= 50 || 'Max 50 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },},
       isFormValid: false,
      error: null,
      dialog: false,
      id: "",
      firstname:"",
      lastname: "",
      email: "",
      isAdmin: "",
      isEmployed: "",
      phonenum:"",
      address: "",
    }
  },
 async mounted(){
    const fullUser = (await contactservice.show(this.$store.state.route.params.id)).data
    console.log(fullUser)
    this.firstname = fullUser.firstname
    this.lastname = fullUser.lastname
    this.email = fullUser.email
    this.phonenum = fullUser.phonenum
    this.address = fullUser.address
    this.isAdmin = fullUser.isAdmin
    this.isEmployed = fullUser.isEmployed
  },
  methods: {
    async updateUser() {
      try {
        await contactservice.updateUser(this.$store.state.route.params.id,{
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          address: this.address,
          phonenum: this.phonenum,
          isAdmin: this.isAdmin,
          isEmployed: this.isEmployed
        })
        this.dialog = false
        this.$router.go()
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>