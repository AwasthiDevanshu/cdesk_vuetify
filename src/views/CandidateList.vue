<template>
  <div class="text-center">
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="loader = 'loading'"
    >
      Accept Terms
    </v-btn>

    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Upload

      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>

    <v-btn
      class="ma-2"
      :loading="loading2"
      :disabled="loading2"
      color="success"
      @click="loader = 'loading2'"
    >
      Custom Loader
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>

    <v-btn
      class="ma-2"
      :loading="loading4"
      :disabled="loading4"
      color="info"
      @click="loader = 'loading4'"
    >
      Icon Loader
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light> mdi-cached </v-icon>
        </span>
      </template>
    </v-btn>

    <v-btn
      :loading="loading5"
      :disabled="loading5"
      color="blue-grey"
      class="ma-2 white--text"
      fab
      @click="loader = 'loading5'"
    >
      <v-icon dark>
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
  const loginAttemptFields = [
    { key: 'additionalInfo', label: 'Login Device' },
    { key: 'loginAt', label: 'Login Date And Time' },
    {
      key: 'isTimeLocked',
      label: 'Status',
      _style: 'width:20%',
      sorter: false,
      filter: false,
    },
  ]
  const fields = [
    { key: 'name', _style: 'width:20%' },
    { key: 'email', _style: 'width:20%', _classes: 'word-breaker' },
    { key: 'mobile', _style: 'width:20%' },
    { key: 'createdAt', _style: 'width:20%' },
    {
      key: 'actions',
      _style: 'width:30%',
      label: '',
      sorter: false,
      filter: false,
    },
  ]
  const timeblockedMap = ['Success', 'Blocked']
  export default {
    name: 'CandidateList',
    mixins: [ajaxCallMixin, localDb],

    data () {
      return {
        fields,
        details: [],
        showCandidateList: false,
        courseName: '',
        collapseDuration: 0,
        companyId: this.get('userCompanyId'),
        companyList: [],
        candidateList: [],
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        candidateId: '',
        candidateModal: false,
        candidateUploadModal: false,
        blockModal: false,
        disabled: false,
        blockTill: '',
        candidateCount: 0,
        fixedToasts: 0,
        message: '',
        hasError: false,
        modelTitle: '',
        pages: 1,
        page: 1,
        filters: {},
        // loading: true,
        loading2: true,
        index: 0,
        loginAttemptList: [],
        loginAttemptFields,
        timeblockedMap,
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
      }
    },
    created () {
      this.getCandidateList()
    },

    methods: {
      getBadge (isTimeLocked) {
        switch (isTimeLocked) {
          case '0':
            return 'success'
          case '1':
            return 'secondary'
          default:
            'primary'
        }
      },
      generateCandidateList (apiResponse) {
        if (apiResponse.error != true) {
          const candidateList = apiResponse.data.candidateList
          this.showCandidateList = true
          this.candidateList = candidateList
          this.candidateCount = apiResponse.data.candidateCount
          this.pages = Math.ceil(apiResponse.data.candidateCount / 30)
          this.loading = false
        }
      },
      getCandidateList (offset = 0) {
        this.candidateList = []
        this.loading = true
        const param = {}
        const data = {}
        data.offset = offset
        data.limit = 30
        data.companyId = this.get('userCompanyId')
        data.filters = this.filters
        const url = 'company/company/getCompanyCandidates'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateCandidateList)
      },
      pageChanged () {
        const offset = 30 * (this.page - 1)
        this.getCandidateList(offset)
      },

      addEditCandidate () {
        this.disabled = true
        this.candidateModal = false
        const param = {}
        const data = {}
        data.username = this.username
        data.password = this.password
        data.name = this.name
        data.companyId = this.get('userCompanyId')
        data.email = this.email
        data.mobile = this.mobile
        data.candidateId = this.candidateId
        const url = 'candidate/candidate/candidateSignUp'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.reloadCandidates)
      },

      editCandidateModal (item, index) {
        this.modelTitle = 'Edit Candidate'
        this.disabled = false
        this.username = item.username
        this.name = item.name
        this.password = item.password
        this.mobile = item.mobile

        this.email = item.email
        this.candidateId = item.candidateId
        this.index = index
        this.candidateModal = true
      },
      showAddCandidateModal () {
        this.modelTitle = 'Add Candidate'
        this.disabled = false
        this.username = ''
        this.name = ''
        this.password = ''
        this.index = 0
        this.mobile = ''
        this.email = ''
        this.candidateId = 0
        this.candidateModal = true
      },
      showUploadCandidateModal () {
        this.fields = []
        this.candidateUploadModal = true
      },
      reloadCandidates () {
        this.save('candidateCount', 0, 'session')
        this.getCandidateList()
      },
      blockCandidateModal (item) {
        this.candidateId = item.candidateId
        this.blockTill = item.lastLoginAt
        this.blockModal = true
        this.getCandidateLoginAttempt(item.candidateId)
      },
      blockCandidate () {
        const param = {}
        const data = {}
        data.candidateId = this.candidateId
        data.blockedTill = this.blockTill
        const url = 'misc/misc/blockCandidate'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.callBackBlock)
      },
      callBackBlock (apiResponse) {
        if (apiResponse !== true) {
          this.hasError = false
          this.message = 'Candidate Blocked Successfully'
        } else {
          this.message = 'Error occured'
          this.hasError = true
        }
        this.blockModal = false
        this.fixedToasts++
      },
      uploadCandidateExcel () {
        const param = {}
        const data = {}
        data.companyId = this.get('userCompanyId')
        const url = 'company/company/uploadCandidateExcel'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.callbackUploadCandidateExcel, this.fields)
      },
      callbackUploadCandidateExcel (apiResponse) {
        if (apiResponse !== true) {
          this.hasError = false
          this.message = apiResponse.message
        } else {
          this.message = 'Error occured'
          this.hasError = true
        }
        this.candidateUploadModal = false
        this.fixedToasts++
      },
      showPurchases (item) {
        this.$router.push(
          '/candidatePurchases/' +
            item.candidateId +
            '/' +
            this.get('userCompanyId'),
        )
      },

      showDues (item) {
        this.$router.push('/candidatePayment/' + item.candidateId)
      },
      getCandidateLoginAttempt (candidateId) {
        var param = {}
        var data = {}
        data.limit = 0
        this.loading2 = true
        data.candidateId = candidateId
        var url = 'misc/misc/getCandidateLoginAttempts'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.populateCandidateLoginAttempt)
      },
      populateCandidateLoginAttempt (apiResponse) {
        if (apiResponse.error != true) {
          this.loginAttemptList = apiResponse.data.loginAttempts
          this.loading2 = false
        }
      },
    },
  }
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.word-breaker {
  word-break: break-all;
}
</style>
