<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col>
        <v-row>
          <v-col class="adnot">
            <material-card
              icon="mdi-account-details"
              icon-small
              title="User List"
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
                          Add User
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add User</span>
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
                                <v-text-field
                                  type="password"
                                  label="Password*"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
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
                            </v-row>

                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  label="Mobile*"
                                  type="text"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-select
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  :items="items"
                                  label="Role"
                                ></v-select>
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
                            @click="dialog = false"
                          >
                            Save
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

<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

const fields = [
  { key: "name", _style: "width:20%" },
  { key: "email", _style: "width:20%" },
  { key: "mobile", _style: "width:20%" },
  {
    key: "actions",
    _style: "width:30%",
    label: "",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "UserList",
  mixins: [ajaxCallMixin, localDb],

  data() {
    return {
      fields,
      details: [],
      showuserList: true,
      collapseDuration: 0,
      companyId: this.get("userCompanyId"),
      companyList: [],
      userList: [],
      username: "",
      name: "",
      password: "",
      mobile: "",
      email: "",
      userId: 0,
      userModal: false,
      userCount: 0,
      hasError: false,
      modelTitle: "",
      pages: 1,
      page: 1,
      filters: {},
      index: 1,
      items: ["Admin", "Class Operator", "Admission"],
    };
  },
  created() {
    this.showUserList();
  },
  methods: {
    generateUserList(apiResponse) {
      this.userList = apiResponse.data.userList;
      this.userModal = false;
      this.userCount = apiResponse.data.userCount;
    },

    showUserList() {
      this.disabled = false;
      const param = {};
      const data = {};

      data.companyId = this.get("userCompanyId");
      const url = "userManagement/user/getUserList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateUserList);
    },
    showUserModal() {
      this.modelTitle = "Add User";
      this.disabled = false;
      this.username = "";
      this.name = "";
      this.password = "";
      this.index = 0;
      this.mobile = "";
      this.email = "";
      this.userId = 0;
      this.userModal = true;
    },
    editUserModal(item, index) {
      this.modelTitle = "Edit";
      this.disabled = false;
      this.username = item.userName;
      this.name = item.name;
      this.roleId = item.roleId;
      this.password = item.password;
      this.mobile = item.mobile;
      this.email = item.email;
      this.userId = item.userId;
      this.index = index;
      this.userModal = true;
    },

    pageChanged() {
      const offset = 30 * (this.page - 1);
      this.showUserList(offset);
    },

    addEditUser() {
      this.disabled = true;
      const param = {};
      const data = {};
      data.companyId = this.get("userCompanyId");
      data.userName = this.username;
      data.mobile = this.mobile;
      data.password = this.password;
      data.name = this.name;
      data.email = this.email;
      data.userId = this.userId;
      data.roleId = this.roleId;
      const url = "userManagement/user/addEditUser";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.addEditCallBack);
    },

    addEditCallBack() {
      // put alert here
      this.showUserList();
    },
  },
};
</script>

<style></style>
