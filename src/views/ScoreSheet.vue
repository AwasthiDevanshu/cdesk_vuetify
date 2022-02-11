<template>
  <div>
    <v-btn> hello </v-btn>
  </div>
</template>

<script>
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'
  const items = [{}]
  const fields = [{ key: 'companyName', _style: 'width:40%' }]
  export default {
    name: 'ScoreSheet',
    mixins: [ajaxCallMixin, localDb],
    data () {
      return {
        items: items.map((item, id) => {
          return { ...item, id }
        }),
        fields,
        companyId: 0,
        testSeriesId: 0,
        testId: 0,
        companyList: [],
        testSeriesList: [],
        testList: [],
        details: [],
        currentAlertCounter: 0,
        collapseDuration: 0,

        disabled: false,
        displayTestSeries: false,
        displayTestList: false,
        fixedToasts: 0,
      }
    },
    created () {
      this.getCompanyList()
    },
    methods: {
      generateCompanyList (apiResponse) {
        if (apiResponse.error !== true) {
          const companyList = apiResponse.data.companyList
          apiResponse = ''
          this.companyList = this.changeListToSelect(
            companyList,
            'companyId',
            'companyName',
          )
        }
      },
      getCompanyList () {
        const param = {}
        const data = {}
        const url = 'company/company/getCompanyList'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateCompanyList)
      },
      getCompanyTestSeries () {
        this.displayTestSeries = false
        this.companyTestSeries = {}
        const param = {}
        const data = {}
        data.limit = 0
        data.companyId = this.companyId
        const url = 'company/company/getCompanyTestSeries'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateTestSeriesList)
      },
      generateTestSeriesList (apiResponse) {
        if (apiResponse.error !== true) {
          const testSeriesList = apiResponse.data.testSeriesList
          apiResponse = ''
          this.testSeriesList = this.changeListToSelect(
            testSeriesList,
            'testSeriesId',
            'title',
          )
        }
        this.displayTestSeries = true
      },
      getTestList () {
        this.displayTestList = false
        this.companyTestSeries = {}
        const param = {}
        const data = {}
        data.limit = 0
        data.testSeriesId = this.testSeriesId
        const url = 'testSeries/testSeries/getTestList'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateTestList)
      },
      generateTestList (apiResponse) {
        if (apiResponse.error !== true) {
          const testList = apiResponse.data.testList
          apiResponse = ''
          this.testList = this.changeListToSelect(testList, 'testId', 'testName')
        }
        this.displayTestList = true
      },
      downloadResult () {
        const url = 'company/Result/getResultDetails'
        const param = {}
        const data = {}
        data.limit = 0
        data.companyId = this.companyId
        data.testId = this.testId
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.downloadExcel)
      },
      downloadExcel (apiResponse) {
        if (apiResponse.error !== true) {
          const fileUrl = apiResponse.data.fileUrl
          window.open(fileUrl, '_blank')
        }
      },
    },
  }
</script>
