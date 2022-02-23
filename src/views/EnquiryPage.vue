<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col>
        <v-row>
          <v-col class="adnot">
            <material-card
              icon="mdi-account-details"
              icon-small
              title="Enquiries"
              color="accent"
            >
              <template #actions>
                <v-icon class="mr-2" small v-text="actionIcon" />
                <div class="text-truncate">
                  <v-row align="center" justify="space-around">
                    <v-dialog v-model="dialog" persistent max-width="800px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          text
                          large
                          v-bind="attrs"
                          v-on="on"
                        >
                          Add Enquiry
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Edit Enquiry</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Name"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Email*"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Mobile"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Parent's Name"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  :items="items"
                                  label="Qualification"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="How did you find us?"
                                  type="text"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-textarea
                                  class="mx-2"
                                  label="Address"
                                  rows="2"
                                  placeholder="Enter Address"
                                 
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-textarea
                                  class="mx-2"
                                  label="Description"
                                  rows="2"
                                  placeholder="Enter Description"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  :items="items"
                                  label="Select Status"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                          <!-- <small>*indicates required field</small> -->
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Update
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Register Candidate
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </template>
            </material-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.word-breaker {
  word-break: break-all;
}
</style>
<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

const items = [{}];
const fields = [
  { key: "name", _style: "width:30%" },
  { key: "email", _style: "width:30%" },
  { key: "mobile", _style: "width:30%" },
  {
    key: "actions",
    _style: "width:20%",
    label: "",
    sorter: false,
    filter: false,
  },
  /*  {
    key: "showVideos",
    label: "",
    _style: "width:20%;",
    sorter: false,
    filter: false
  } */
];
export default {
  name: "EnquiryPage",
  mixins: [ajaxCallMixin, localDb],
  data() {
    return {
      fields,
      details: [],
      showEnquiryList: false,
      collapseDuration: 0,
      companyId: this.get("userCompanyId"),
      companyList: [],
      enquiryList: [],
      username: "",
      name: "",
      password: "",
      mobile: "",
      email: "",
      enquiryId: "",
      description: "",
      enquiryModal: false,
      enquiryExcelModal: false,
      blockModal: false,
      disabled: false,
      blockTill: "",
      enquiryCount: 0,
      fixedToasts: 0,
      message: "",
      status: 0,
      source: "",
      statusList: [],
      hasError: false,
    };
  },
  created() {
    this.getEnquiryList();
  },
  methods: {
    /*     generateCompanyList(apiResponse) {
      if (apiResponse.error != true) {
        let companyList = apiResponse.data.companyList;
        apiResponse = "";
        this.companyList = this.changeListToSelect(
          companyList,
          "companyId",
          "companyName"
        );
      }
    },
    getCompanyList() {
      let param = {};
      let data = {};
      let url = "company/company/getCompanyList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateCompanyList);
    },
 */
    generateEnquiryList(apiResponse) {
      if (apiResponse.error !== true) {
        const enquiryList = apiResponse.data.enquiryList;
        this.showEnquiryList = true;
        this.enquiryCount = apiResponse.data.enquiryCount;
        this.enquiryList = enquiryList;
        this.save("enquiryList", enquiryList, "session");
        this.save("enquiryCount", apiResponse.data.enquiryCount, "session");
      }
    },
    getEnquiryList() {
      const enquiryCount = this.get("enquiryCount", "session");
      const enquiryList = this.get("enquiryList", "session");
      if (enquiryCount > 0) {
        this.enquiryList = enquiryList;
        this.enquiryCount = enquiryCount;
        this.showEnquiryList = true;
        return;
      }
      this.showEnquiryList = false;
      this.enquiryList = [];
      const param = {};
      const data = {};
      data.limit = 0;
      data.companyId = this.get("userCompanyId");
      const url = "enquiry/enquiry/getEnquiryList";
      param.data = data;
      param.token = this.getToken();
      this.statusList = [
        { label: "open", value: "1" },
        { label: "close", value: "2" },
      ];
      this.ajaxCall(url, param, this.generateEnquiryList);
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    deleteEnquiry(item) {
      const param = {};
      const data = {};
      data.enquiryId = item.enquiryId;
      const url = "enquiry/enquiry/deleteEnquiry";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.callBackBlock);
    },
    callBackBlock(apiResponse) {
      if (apiResponse.error !== true) {
        this.hasError = false;
        this.message = "Enquiry Deleted Successfully";
        this.save("enquiryCount", 0, "session");
        this.getEnquiryList();
      } else {
        this.message = "Error occured";
        this.hasError = true;
      }
      this.blockModal = false;
      this.fixedToasts++;
    },
    addEditEnquiry() {
      this.disabled = true;
      this.enquiryModal = false;
      const param = {};
      const data = {};
      data.companyId = this.get("userCompanyId");
      data.name = this.name;
      data.email = this.email;
      data.mobile = this.mobile;
      data.enquiryId = this.enquiryId;
      data.status = this.status;
      data.description = this.description;
      data.source = this.source;
      const url = "enquiry/enquiry/addEditEnquiry";
      param.data = data;
      param.token = this.getToken();
      this.save("enquiryCount", 0, "session");
      this.ajaxCall(url, param, this.getEnquiryList);
    },
    editEnquiryModal(item) {
      this.disabled = false;
      this.name = item.name;
      this.mobile = item.mobile;
      this.email = item.email;
      this.enquiryId = item.enquiryId;
      this.enquiryModal = true;
    },
    showEnquiryModal() {
      this.disabled = false;
      this.name = "";
      this.mobile = "";
      this.email = "";
      this.enquiryId = 0;
      this.enquiryModal = true;
    },
    showEnquiryExcelModal() {
      this.disabled = false;
      this.name = "";
      this.mobile = "";
      this.email = "";
      this.enquiryId = 0;
      this.enquiryExcelModal = true;
    },
    registerCandidate() {
      this.disabled = true;
      this.candidateModal = false;
      const param = {};
      const data = {};
      data.username = this.mobile;
      data.password = this.mobile;
      data.name = this.name;
      data.companyId = this.get("userCompanyId");
      data.email = this.email;
      data.mobile = this.mobile;
      data.candidateId = 0;
      const url = "candidate/candidate/candidateSignUp";
      param.data = data;

      param.token = this.getToken();
      this.ajaxCall(url, param, this.registerCallBack);
      this.addEditEnquiry();
    },
    registerCallBack(apiResponse) {
      if (apiResponse.error !== true) {
        this.$router.push(
          "/candidatePurchases/" +
            apiResponse.data.candidateId +
            "/" +
            this.get("userCompanyId")
        );
        this.hasError = false;
        this.message = "Registration Successful";
      } else {
        this.message = "Error occured";
        this.hasError = true;
      }
      this.fixedToasts++;
    },
  },
};
</script>
