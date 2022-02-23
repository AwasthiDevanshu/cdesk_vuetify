 <template>
  <v-container fluid tag="section">
    <v-row>
      <v-col class="adnot">
        <material-card
          icon="mdi-bell-ring"
          icon-small
          title="Add Notification"
          color="accent"
          cols="12"
          sm="12"
          md="6"
          lg="6"
        >
          <div style="padding: 2rem">
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    v-model="name"
                    label="Title"
                    placeholder="Enter Title"
                    prepend-icon="mdi-feather"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-file-input placeholder="Choose File"></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <!-- <v-col cols="12" sm="12" md="6" lg="6"
                  > -->
                <v-textarea
                  class="mx-2"
                  prepend-icon="mdi-comment-outline"
                  label="Message"
                  rows="1"
                ></v-textarea>
                <!-- </v-col> -->
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Send Now"
                    required
                    style="display: inline"
                  ></v-checkbox
                ></v-col>

                <v-col cols="12" sm="6" md="3" lg="3">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Is Repeated?"
                    required
                    style="display: inline"
                  ></v-checkbox
                ></v-col>
              </v-row>
              <div id="submit" class="text-center">
                <v-btn
                  color="grey lighten-4"
                  text--white
                  @click="resetValidation"
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </div>
        </material-card></v-col
      ></v-row
    >
    <!-- ></v-col
      ></v-row -->
  </v-container>
</template>
            
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

// You can also register Quill modules in the component
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";
export default {
  name: "Notification",
  components: {
    // quillEditor,
  },
  mixins: [ajaxCallMixin, localDb],
  data() {
    return {
      disabled: false,
      title: "",
      companyId: this.get("userCompanyId"),
      body: "",
      sendNow: true,
      isRepeated: false,
      notificationTime: "",
      repeatCount: 0,
      repeatAfter: 0,
      currentAlertCounter: 0,
      fields: [],
      editorOption: {
        placeholder: "Enter Body",
        theme: "snow",
        name: "notification",
      },
      message: "",
    };
  },
  computed: {
    token: function () {
      return this.getToken();
    },
  },
  beforeMount() {
    this.getCompanyDropDown();
  },
  methods: {
    addNotification() {
      this.disabled = true;
      const param = {};
      const data = {};
      data.sendNow = this.sendNow;
      data.title = this.title;
      data.message = this.body;
      data.notificationTime = this.notificationTime;
      data.isRepeated = this.isRepeated;
      data.repeatCount = this.repeatCount;
      data.repeatAfter = this.repeatAfter;
      data.companyId = this.companyId;
      const url = "notification/notify/schedulePushNotification";
      param.data = data;
      param.token = this.token;
      this.ajaxCall(url, param, this.callBackAddEditCourse, this.fields);
    },
    callBackAddEditCourse(apiResponse) {
      this.currentAlertCounter = 10;
      this.message = "Notification sent";
      this.alertColor = "success";
      this.disabled = false;
    },
    // getCompanyDropDown () {
    //   const param = {}
    //   const assessorId = this.$route.params.assessorId
    //   const url = 'company/company/getCompanyList'

    //   param.data = {}
    //   param.token = this.token
    //   this.ajaxCall(url, param, this.populateList)
    // },
    populateList(apiResponse) {
      if (apiResponse.error !== true) {
        this.companyList = this.changeListToSelect(
          apiResponse.data.companyList,
          "companyId",
          "companyName"
        );
      }
    },
  },
};
</script>
<style scoped>
#submit {
  margin-top: 3rem;
}
</style>