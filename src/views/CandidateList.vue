<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col class="cardcom" cols="12" md="12" lg="12">
            <material-card
              icon="mdi-clipboard-text"
              icon-small
              title="Candidate List"
              color="accent"
            >
              <template #actions>
                <v-icon class="mr-2" small v-text="actionIcon" />
                <div class="text-truncate">
                  <v-row align="center" justify="space-around">
                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          text
                          large
                          v-bind="attrs"
                          v-on="on"
                        >
                          Add Candidate
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add Candidate</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Username*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field label="Password*"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Name*"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Email*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Mobile*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6"> </v-col>
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
                            @click="dialog = false"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog
                      v-model="dialog"
                      persistent
                      max-height="300px"
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          text
                          large
                          v-bind="attrs"
                          v-on="on"
                        >
                          Upload Candidate Excel
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Update Candidate</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-file-input
                                  show-size
                                  label="File input"
                                ></v-file-input>
                                <span class="span1">
                                  <v-btn
                                    class="insidespan1"
                                    text
                                    href="/fooRoute"
                                    target="_blank"
                                  >
                                    Please check correct file format before
                                    uploading....
                                  </v-btn>
                                </span>
                              </v-col>
                            </v-row>
                          </v-container>
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
                            @click="dialog = false"
                          >
                            Update
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </template>
            </material-card>
            <material-card>
              <v-simple-table
                :items="candidateList"
                :fields="fields"
                :columnFilter="{ external: true }"
                itemsPerPage="20"
                hover
                sorter
                striped
                :loading="loading"
                fixed
                bordered
                :columnFilterValue.sync="filters"
                @update:column-filter-value="getCandidateList(0)"
              >
              </v-simple-table>
            </material-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

const loginAttemptFields = [
  { key: "additionalInfo", label: "Login Device" },
  { key: "loginAt", label: "Login Date And Time" },
  {
    key: "isTimeLocked",
    label: "Status",
    _style: "width:20%",
    sorter: false,
    filter: false,
  },
];
const fields = [
  { key: "name", _style: "width:20%" },
  { key: "email", _style: "width:20%", _classes: "word-breaker" },
  { key: "mobile", _style: "width:20%" },
  { key: "createdAt", _style: "width:20%" },
  {
    key: "actions",
    _style: "width:30%",
    label: "",
    sorter: false,
    filter: false,
  },
];
export default {
  name: "CandidateList",
  mixins: [ajaxCallMixin, localDb],
  created() {
    this.getCandidateList();
  },
  data() {
    return {
      fields,
      details: [],
      showCandidateList: false,
      courseName: "",
      collapseDuration: 0,
      companyId: this.get("userCompanyId"),
      dialog: false,
      companyList: [],
      candidateList: [],
      username: "",
      name: "",
      password: "",
      mobile: "",
      email: "",
      candidateId: "",
      candidateModal: false,
      candidateUploadModal: false,
      blockModal: false,
      disabled: false,
      blockTill: "",
      candidateCount: 0,
      fixedToasts: 0,
      message: "",
      hasError: false,
      modelTitle: "",
      pages: 1,
      page: 1,
      filters: {},
      loading: true,
      loading2: true,
      index: 0,
      loginAttemptList: [],
      loginAttemptFields,
      timeblockedMap,
    };
  },
  methods: {
    generateCandidateList(apiResponse) {
      if (apiResponse.error != true) {
        let candidateList = apiResponse.data.candidateList;
        this.showCandidateList = true;
        this.candidateList = candidateList;
        this.candidateCount = apiResponse.data.candidateCount;
        this.pages = Math.ceil(apiResponse.data.candidateCount / 30);
        this.loading = false;
      }
    },
    getCandidateList(offset = 0) {
      this.candidateList = [];
      this.loading = true;
      let param = {};
      let data = {};
      data.offset = offset;
      data.limit = 30;
      data.companyId = this.get("userCompanyId");
      data.filters = this.filters;
      let url = "company/company/getCompanyCandidates";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateCandidateList);
    },
    pageChanged() {
      let offset = 30 * (this.page - 1);
      this.getCandidateList(offset);
    },

    addEditCandidate() {
      this.disabled = true;
      this.candidateModal = false;
      let param = {};
      let data = {};
      data.username = this.username;
      data.password = this.password;
      data.name = this.name;
      data.companyId = this.get("userCompanyId");
      data.email = this.email;
      data.mobile = this.mobile;
      data.candidateId = this.candidateId;
      let url = "candidate/candidate/candidateSignUp";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.reloadCandidates);
    },

    editCandidateModal(item, index) {
      this.modelTitle = "Edit Candidate";
      this.disabled = false;
      this.username = item.username;
      this.name = item.name;
      this.password = item.password;
      this.mobile = item.mobile;

      this.email = item.email;
      this.candidateId = item.candidateId;
      this.index = index;
      this.candidateModal = true;
    },
    showAddCandidateModal() {
      this.modelTitle = "Add Candidate";
      this.disabled = false;
      this.username = "";
      this.name = "";
      this.password = "";
      this.index = 0;
      this.mobile = "";
      this.email = "";
      this.candidateId = 0;
      this.candidateModal = true;
    },
    showUploadCandidateModal() {
      this.fields = [];
      this.candidateUploadModal = true;
    },
    reloadCandidates() {
      this.save("candidateCount", 0, "session");
      this.getCandidateList();
    },
    blockCandidateModal(item) {
      this.candidateId = item.candidateId;
      this.blockTill = item.lastLoginAt;
      this.blockModal = true;
      this.getCandidateLoginAttempt(item.candidateId);
    },
    blockCandidate() {
      let param = {};
      let data = {};
      data.candidateId = this.candidateId;
      data.blockedTill = this.blockTill;
      let url = "misc/misc/blockCandidate";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.callBackBlock);
    },
    callBackBlock(apiResponse) {
      if (apiResponse !== true) {
        this.hasError = false;
        this.message = "Candidate Blocked Successfully";
      } else {
        this.message = "Error occured";
        this.hasError = true;
      }
      this.blockModal = false;
      this.fixedToasts++;
    },
    uploadCandidateExcel() {
      let param = {};
      let data = {};
      data.companyId = this.get("userCompanyId");
      let url = "company/company/uploadCandidateExcel";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.callbackUploadCandidateExcel, this.fields);
    },
    callbackUploadCandidateExcel(apiResponse) {
      if (apiResponse !== true) {
        this.hasError = false;
        this.message = apiResponse.message;
      } else {
        this.message = "Error occured";
        this.hasError = true;
      }
      this.candidateUploadModal = false;
      this.fixedToasts++;
    },
    showPurchases(item) {
      this.$router.push(
        "/candidatePurchases/" +
          item.candidateId +
          "/" +
          this.get("userCompanyId")
      );
    },

    showDues(item) {
      this.$router.push("/candidatePayment/" + item.candidateId);
    },
    getCandidateLoginAttempt(candidateId) {
      var param = {};
      var data = {};
      data.limit = 0;
      this.loading2 = true;
      data.candidateId = candidateId;
      var url = "misc/misc/getCandidateLoginAttempts";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.populateCandidateLoginAttempt);
    },
    populateCandidateLoginAttempt(apiResponse) {
      if (apiResponse.error != true) {
        this.loginAttemptList = apiResponse.data.loginAttempts;
        this.loading2 = false;
      }
    },
  },
};
</script>

<style scoped>
.cardcom {
  max-height: 500px;

  height: 250px;
}
/* .insidespan1{
display: grid;
justify-content: center;
}
.span1{
padding-left:45px;
position: absolute; */

/* } */
</style>