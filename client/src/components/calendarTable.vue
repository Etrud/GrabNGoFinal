
<template>
  <div >
    <div id="printMe2">
    <v-data-table
      dense
      :headers="headers"
      :items="schedules"
      :items-per-page="5"
      class="elevation-1"
      >
      <template v-slot:[`item.actions`]="{ item }" >
        <v-icon  small  @click="triggerEditDialog(item)" > mdi-pencil </v-icon>
         <v-icon small @click="triggerDeleteDialog(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.color`]="{ item }">
        <v-chip :color="getColor(item.color)" dark>
          {{ item.color }}
        </v-chip>
      </template>
    </v-data-table>
    </div>
    <br>
    <v-btn @click="print2">Print</v-btn>


        <v-dialog v-model="deleteDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this event?
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
            <v-col cols="15" sm="14" md="10">
              <v-text-field label="Event name*" v-model="name" required></v-text-field>
            </v-col>

            <v-col cols="12">
               <VueCtkDateTimePicker v-model="datetime" />
            </v-col>
            <v-col cols="12">
               <VueCtkDateTimePicker v-model="end" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="users"
                
                label="Employee Assigned*"
                :item-text="item => 'ID: '+item.id+', '+item.firstname +' '+ item.lastname"
                item-value="id"
                v-model="employeeId"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-color-picker
                dot-size="12"
                v-model="color"
                swatches-max-height="202"
              ></v-color-picker>
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
import scheduleservice from "@/services/scheduleservice";
import moment from "moment";
import contactservice from "@/services/contactservice";
export default {

  data() {
    return {
      deleteDialog: false,
      editDialog: false,
      users: null,
      name: "",
      datetime: "",
      end: "",
      color: "",
      employeeId: "",
      schedules: [],
      headers: [
        {
          text: "Schedule ID #",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Employee ID #",
          value: "employeeID",
        },
        {
          text: "Event Name",
          value: "name",
        },
        {
          text: "Employee F. Name",
          value: "User.firstname",
        },
        {
          text: "Employee L. Name",
          value: "User.lastname",
        },
        { text: "Start", value: "start" },
        { text: "End", value: "end" },
        { text: "Color", value: "color" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    async print2 () {
      // Pass the element id here
      await this.$htmlToPaper('printMe2');
    },
    triggerDeleteDialog(item) {
      this.selectedItem = item; // have to define in data section.
      this.deleteDialog = true; // activate dialog after assigning selected items
    },
    triggerEditDialog(item) {
      this.selectedItem = item; // have to define in data section.
      this.editDialog = true; // activate dialog after assigning selected items
      this.name = this.selectedItem.name
      this.datetime = this.selectedItem.start
      this.end = this.selectedItem.end
      this.color = this.selectedItem.color
      this.employeeId = this.selectedItem.employeeID
    },
      getColor(color) {
        return color;
    },
    async deleteItem(id) {
      try {
        await scheduleservice.deleteSchedule(id);
        this.deleteDialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async editItem(id) {
      try {
        await scheduleservice.editSchedule(id,{
          employeeID: this.employeeId,
          name: this.name,
          start: this.datetime,
          end: this.end,
          color: this.color,
        });
        this.editDialog = false;
        this.$router.go();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  async mounted() {
    const preChanged = (await scheduleservice.index()).data;
    const fullUser = (await contactservice.index()).data
    this.users = fullUser
    for (var i in preChanged) {
      //console.log( preChanged[i].punchTime )
      preChanged[i].start = moment(preChanged[i].start).format(
        "YYYY-MM-DD HH:mm:ss a"
      )
      preChanged[i].end = moment(preChanged[i].end).format(
        "YYYY-MM-DD HH:mm:ss a"
      )
      //console.log( preChanged[i].punchTime )
    }

    this.schedules = preChanged;
  },
};
</script>