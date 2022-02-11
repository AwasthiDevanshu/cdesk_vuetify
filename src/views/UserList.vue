<template>
  <div>
    <v-btn>hello</v-btn>
    <!-- <CToaster :autohide="3000" position="bottom-center">
      <template v-for="toast in fixedToasts">
        <CToast
          :key="'toast' + toast"
          :show="true"
          class="text-white"
          :class="{ 'bg-success': !hasError, 'bg-danger': hasError }"
          >{{ message }}
        </CToast>
      </template>
    </CToaster>

    <CRow v-show="showUserList">
      <CCol col="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol
                col="3"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                "
              >
                <CButton color="success" @click="showUserModal()">
                  Add User
                </CButton>
              </CCol>
              <CCol sm="2" lg="4">
                <CCallout color="info">
                  <small class="text-muted">Total Users</small><br />
                  <strong class="h4"> {{ userCount }}</strong>
                </CCallout>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              :items="userList"
              :fields="fields"
              :columnFilter="{ external: true }"
              :items-per-page="30"
              hover
              sorter
              striped
              :loading="loading"
              fixed
              bordered
              :columnFilterValue.sync="filters"
              @update:column-filter-value="showUserList(0)"
            >
              <template #actions="{ item, index }">
                <td>
                  <CButton
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="editUserModal(item, index)"
                    >Edit</CButton
                  >
                </td></template
              >
            </CDataTable>
            <CPagination
              :activePage.sync="page"
              :pages="pages"
              size="md"
              @update:activePage="pageChanged()"
              align="start"
            />
          </CCardBody> </CCard></CCol
    ></CRow>

    <CModal :title="modelTitle" centered size="lg" :show.sync="userModal">
      <CForm @submit.prevent="addEditUser()" wasValidated>
        <CRow>
          <CCol col="6">
            <CInput
              required
              label="Username"
              v-model="username"
              horizontal
              placeholder="Enter Username"
            />
          </CCol>
          <CCol col="6">
            <CInput
              label="Password"
              required
              v-model="password"
              horizontal
              placeholder="Enter password"
            />
          </CCol>
          <CCol col="6">
            <CInput
              label="Name"
              required
              v-model="name"
              horizontal
              placeholder="Enter Name"
            />
          </CCol>
          <CCol col="6">
            <CInput
              type="email"
              label="Email"
              required
              v-model="email"
              horizontal
              placeholder="Enter email"
            />
          </CCol>
          <CCol col="6">
            <CInput
              label="Mobile"
              required
              v-model="mobile"
              horizontal
              placeholder="Enter mobile"
            />
          </CCol>

          <CCol col="6">
            <CSelect
              label="role"
              required
              horizontal
              :value.sync="roleId"
              :options="[
                { value: '1', label: 'Admin' },
                { value: '2', label: 'Class operator' },
                { value: '3', label: 'Admission' },
              ]"
              placeholder="Select Role"
          /></CCol>

          <CCol col="12" align="center">
            <CButton type="submit" :disabled="disabled" color="success"
              >Update</CButton
            >
          </CCol>
        </CRow>
      </CForm>
      <div slot="footer-wrapper"></div>
    </CModal> -->
  </div>
</template>

<script>
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'

  const fields = [
    { key: 'name', _style: 'width:20%' },
    { key: 'email', _style: 'width:20%' },
    { key: 'mobile', _style: 'width:20%' },
    {
      key: 'actions',
      _style: 'width:30%',
      label: '',
      sorter: false,
      filter: false,
    },
  ]

  export default {
    name: 'UserList',
    mixins: [ajaxCallMixin, localDb],

    data () {
      return {
        fields,
        details: [],
        showuserList: true,
        collapseDuration: 0,
        companyId: this.get('userCompanyId'),
        companyList: [],
        userList: [],
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        userId: 0,
        userModal: false,
        userCount: 0,
        hasError: false,
        modelTitle: '',
        pages: 1,
        page: 1,
        filters: {},
        index: 1,
      }
    },
    created () {
      this.showUserList()
    },
    methods: {
      generateUserList (apiResponse) {
        this.userList = apiResponse.data.userList
        this.userModal = false
        this.userCount = apiResponse.data.userCount
      },

      showUserList () {
        this.disabled = false
        const param = {}
        const data = {}

        data.companyId = this.get('userCompanyId')
        const url = 'userManagement/user/getUserList'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateUserList)
      },
      showUserModal () {
        this.modelTitle = 'Add User'
        this.disabled = false
        this.username = ''
        this.name = ''
        this.password = ''
        this.index = 0
        this.mobile = ''
        this.email = ''
        this.userId = 0
        this.userModal = true
      },
      editUserModal (item, index) {
        this.modelTitle = 'Edit'
        this.disabled = false
        this.username = item.userName
        this.name = item.name
        this.roleId = item.roleId
        this.password = item.password
        this.mobile = item.mobile
        this.email = item.email
        this.userId = item.userId
        this.index = index
        this.userModal = true
      },

      pageChanged () {
        const offset = 30 * (this.page - 1)
        this.showUserList(offset)
      },

      addEditUser () {
        this.disabled = true
        const param = {}
        const data = {}
        data.companyId = this.get('userCompanyId')
        data.userName = this.username
        data.mobile = this.mobile
        data.password = this.password
        data.name = this.name
        data.email = this.email
        data.userId = this.userId
        data.roleId = this.roleId
        const url = 'userManagement/user/addEditUser'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.addEditCallBack)
      },

      addEditCallBack () {
        // put alert here
        this.showUserList()
      },
    },
  }
</script>

<style></style>
