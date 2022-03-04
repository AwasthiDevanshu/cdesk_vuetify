<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col class="adnot">
        <material-card
          icon="mdi-bell-ring"
          icon-small
          title="Add Time Table"
          color="accent"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <div style="padding: 2rem">
            <v-form method= "post" ref="form" id="myform"  @submit.prevent= "addTimetable()"   >
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-textarea
                    solo
                    color="accent"
                    style="margin-right: 2rem"
                    label="Add Time Table"
                    placeholder="Add Text Here"
                    prepend-icon="mdi-time"
                  ></v-textarea>
                </v-col>
              </v-row>

              <div id="submit" style="margin-top: 3rem" class="text-center">
                <v-btn
                  type="submit"
                  color="grey lighten-4"
                  text--white
                 
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </div>
        </material-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";
export default {
  name: "Add Time Table",
  mixins: [ajaxCallMixin, localDb],
  components: {
    quillEditor,
  },
   data() {
    return {
      disabled: false,
      title: "",
      companyId: this.get("userCompanyId"),
      body: "",
      sendNow: true,
      notificationTime: "",
      currentAlertCounter: 0,
      fields: [],
      message: "",
    }},
    computed: {
    token: function () {
      return this.getToken();
    },
     methods: {
    addTimetable() {
      this.disabled = false;
      let param = {};
      let data = {};
      data.sendNow = this.sendNow;
      data.message = this.body;
      data.notificationTime = this.notificationTime;
      data.companyId = this.companyId;
      let url = "timetable/notify/schedulePushtimeTable";
      param.data = data;
      param.token = this.token;
      this.ajaxCall(url, param , this.callBackTimetable, this.fields);
      
    },
    callBackTimetable(apiResponse) {
    this.currentAlertCounter = 5;
    this.message = "Saved successfully";
    this.alertColor = "success";
    this.disabled = false;
  },
  populateList(apiResponse) {
    if (apiResponse.error != true) {
      this.companyList = this.changeListToSelect(
        apiResponse.data.companyList,
        "companyId",
        "companyName"
      );
    }
  },
  },
  },
};
</script>