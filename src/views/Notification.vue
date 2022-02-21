 <template>
  <v-container fluid tag="section">
    <v-row>
      <v-col>
        <v-row>
          <v-col class="adnot">
            <material-card
              icon="mdi-bell-ring"
              icon-small
              title="Add Notification"
              color="#ff9800"
            >
              <div style="padding: 2rem">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="name"
                    label="Title"
                    placeholder="Enter Title"
                    cols="12"
                    sm="6"
                    md="6"
                    lg="4"
                  ></v-text-field>

                  <v-file-input
                    cols="12"
                    sm="4"
                    md="4"
                    lg="4"
                    placeholder="Choose File"
                  ></v-file-input>

                  <v-textarea
                    autocomplete="Message"
                    label="Message"
                  ></v-textarea>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Send Now"
                    required
                    style="display: inline"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Is Repeated?"
                    required
                    style="display: inline"
                  ></v-checkbox>

                  <v-btn color="grey" @click="resetValidation"> Submit </v-btn>
                </v-form>
              </div>
            </material-card></v-col
          ></v-row
        ></v-col
      ></v-row
    ></v-container
  >
</template>
            </material-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
