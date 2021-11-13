<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="punches"
      :items-per-page="5"
      class="elevation-1"
      ><template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="triggerEditDialog(item)"> mdi-pencil </v-icon>
        <v-icon small @click="triggerDeleteDialog(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.punchMessage`]="{ item }">
        <v-chip :color="getColor(item.punchMessage)" dark>
          {{ item.punchMessage }}
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this punch?
        </v-card-title>
        <v-card-text
          >This will be a permanent deletion of the data.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItem(selectedItem.id)">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <VueCtkDateTimePicker v-model="punchTime" label="Punch Time/Date*"/>
            </v-col>
            
            <v-col cols="12" sm="6">
              <v-select
                :items="users"
                label="Selected Employee*"
                :item-text="item => 'ID: '+item.id+', '+item.firstname +' '+ item.lastname"
                item-value="id"
                outlined
                v-model="employeeId"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
             <v-select
                :items="options"
                label="Clock In or Out*"
                item-text="message"
                item-value="abbr"
                outlined
                v-model="punchMessage"
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
        <v-btn color="blue darken-1" text @click="editDialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="editItem(selectedItem.id)"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  </div>
</template>

<script>
import punchservice from "@/services/punchservice";
import contactservice from "@/services/contactservice";
import moment from "moment";

export default {
  data() {
    return {
      deleteDialog: false,
      editDialog: false,
      users: null,
    employeeId: "",
    punchTime: "",
    punchMessage: "",
    options: [
          { message: 'Clock IN', abbr: true },
          { message: 'Clock OUT', abbr: false },
        ],
      punches: [],
      headers: [
        {
          text: "Punch ID #",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Employee ID #",
          value: "employeeID",
        },
        {
          text: "Employee F. Name",
          value: "User.firstname",
        },
        {
          text: "Employee L. Name",
          value: "User.lastname",
        },
        { text: "Punch Time", value: "punchTime" },
        { text: "Punch In Message", value: "punchMessage" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    triggerDeleteDialog(item) {
      this.selectedItem = item; // have to define in data section.
      this.deleteDialog = true; // activate dialog after assigning selected items
    },
    triggerEditDialog(item) {
      this.selectedItem = item; // have to define in data section.
      this.editDialog = true; // activate dialog after assigning selected items
      this.punchTime = this.selectedItem.punchTime,
      this.employeeId = this.selectedItem.employeeID
      if(this.selectedItem.punchMessage == 'CLOCK OUT')
        this.punchMessage = false
      else
        this.punchMessage = true
    },

    getColor(punchMessage) {
      if (punchMessage == "CLOCK IN") return "green";
      else if (punchMessage == "CLOCK OUT") return "red";
      else return "green";
    },
    async deleteItem(id) {
      try {
        await punchservice.deletePunch(id);
        this.dialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async editItem(id) {
      try {
        await punchservice.editPunch(id,{
          punchTime: this.punchTime,
          employeeID: this.employeeId,
          punchMessage: this.punchMessage,
        })
        this.editDialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  async mounted() {
    const preChanged = (await punchservice.index()).data;
    for (var i in preChanged) {
      //console.log( preChanged[i].punchTime )
      preChanged[i].punchTime = moment(preChanged[i].punchTime).format(
        "YYYY-MM-DD HH:mm:ss a"
      );
      if (preChanged[i].punchMessage == true) {
        preChanged[i].punchMessage = "CLOCK IN"
      } 
      else if (preChanged[i].punchMessage == false){
        preChanged[i].punchMessage = "CLOCK OUT"
      } 
      //console.log( preChanged[i].punchTime )
    }

    this.punches = preChanged;
    const fullUser = (await contactservice.index()).data;
    this.users = fullUser;
  },
};
</script>