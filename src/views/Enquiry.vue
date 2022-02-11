<template>
  <div>
    <v-btn> hello </v-btn>
  </div>
</template>
<style>
.word-breaker {
  word-break: break-all;
}
</style>
<script>
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'

  const items = [{}]
  const fields = [
    { key: 'name', _style: 'width:30%' },
    { key: 'email', _style: 'width:30%' },
    { key: 'mobile', _style: 'width:30%' },
    {
      key: 'actions',
      _style: 'width:20%',
      label: '',
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
  ]
  export default {
    name: 'EnquiryList',
    mixins: [ajaxCallMixin, localDb],
    data () {
      return {
        fields,
        details: [],
        showEnquiryList: false,
        collapseDuration: 0,
        companyId: this.get('userCompanyId'),
        companyList: [],
        enquiryList: [],
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        enquiryId: '',
        description: '',
        enquiryModal: false,
        enquiryExcelModal: false,
        blockModal: false,
        disabled: false,
        blockTill: '',
        enquiryCount: 0,
        fixedToasts: 0,
        message: '',
        status: 0,
        source: '',
        statusList: [],
        hasError: false,
      }
    },
    created () {
      this.getEnquiryList()
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
      generateEnquiryList (apiResponse) {
        if (apiResponse.error !== true) {
          const enquiryList = apiResponse.data.enquiryList
          this.showEnquiryList = true
          this.enquiryCount = apiResponse.data.enquiryCount
          this.enquiryList = enquiryList
          this.save('enquiryList', enquiryList, 'session')
          this.save('enquiryCount', apiResponse.data.enquiryCount, 'session')
        }
      },
      getEnquiryList () {
        const enquiryCount = this.get('enquiryCount', 'session')
        const enquiryList = this.get('enquiryList', 'session')
        if (enquiryCount > 0) {
          this.enquiryList = enquiryList
          this.enquiryCount = enquiryCount
          this.showEnquiryList = true
          return
        }
        this.showEnquiryList = false
        this.enquiryList = []
        const param = {}
        const data = {}
        data.limit = 0
        data.companyId = this.get('userCompanyId')
        const url = 'enquiry/enquiry/getEnquiryList'
        param.data = data
        param.token = this.getToken()
        this.statusList = [
          { label: 'open', value: '1' },
          { label: 'close', value: '2' },
        ]
        this.ajaxCall(url, param, this.generateEnquiryList)
      },
      toggleDetails (item) {
        this.$set(this.items[item.id], '_toggled', !item._toggled)
        this.collapseDuration = 300
        this.$nextTick(() => {
          this.collapseDuration = 0
        })
      },
      deleteEnquiry (item) {
        const param = {}
        const data = {}
        data.enquiryId = item.enquiryId
        const url = 'enquiry/enquiry/deleteEnquiry'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.callBackBlock)
      },
      callBackBlock (apiResponse) {
        if (apiResponse.error !== true) {
          this.hasError = false
          this.message = 'Enquiry Deleted Successfully'
          this.save('enquiryCount', 0, 'session')
          this.getEnquiryList()
        } else {
          this.message = 'Error occured'
          this.hasError = true
        }
        this.blockModal = false
        this.fixedToasts++
      },
      addEditEnquiry () {
        this.disabled = true
        this.enquiryModal = false
        const param = {}
        const data = {}
        data.companyId = this.get('userCompanyId')
        data.name = this.name
        data.email = this.email
        data.mobile = this.mobile
        data.enquiryId = this.enquiryId
        data.status = this.status
        data.description = this.description
        data.source = this.source
        const url = 'enquiry/enquiry/addEditEnquiry'
        param.data = data
        param.token = this.getToken()
        this.save('enquiryCount', 0, 'session')
        this.ajaxCall(url, param, this.getEnquiryList)
      },
      editEnquiryModal (item) {
        this.disabled = false
        this.name = item.name
        this.mobile = item.mobile
        this.email = item.email
        this.enquiryId = item.enquiryId
        this.enquiryModal = true
      },
      showEnquiryModal () {
        this.disabled = false
        this.name = ''
        this.mobile = ''
        this.email = ''
        this.enquiryId = 0
        this.enquiryModal = true
      },
      showEnquiryExcelModal () {
        this.disabled = false
        this.name = ''
        this.mobile = ''
        this.email = ''
        this.enquiryId = 0
        this.enquiryExcelModal = true
      },
      registerCandidate () {
        this.disabled = true
        this.candidateModal = false
        const param = {}
        const data = {}
        data.username = this.mobile
        data.password = this.mobile
        data.name = this.name
        data.companyId = this.get('userCompanyId')
        data.email = this.email
        data.mobile = this.mobile
        data.candidateId = 0
        const url = 'candidate/candidate/candidateSignUp'
        param.data = data

        param.token = this.getToken()
        this.ajaxCall(url, param, this.registerCallBack)
        this.addEditEnquiry()
      },
      registerCallBack (apiResponse) {
        if (apiResponse.error !== true) {
          this.$router.push(
            '/candidatePurchases/' +
              apiResponse.data.candidateId +
              '/' +
              this.get('userCompanyId'),
          )
          this.hasError = false
          this.message = 'Registration Successful'
        } else {
          this.message = 'Error occured'
          this.hasError = true
        }
        this.fixedToasts++
      },
    },
  }
</script>
