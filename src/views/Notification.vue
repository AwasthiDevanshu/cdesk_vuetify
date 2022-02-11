<template>
  <div>
   
    <!-- <CRow>
      <CCol>
        <CAlert color="success" :show.sync="currentAlertCounter" closeButton>
          {{ message }}
          <CProgress
            :max="10"
            :value="currentAlertCounter"
            height="3px"
            color="success"
            animate
          />
        </CAlert>
      </CCol>
    </CRow>
    <CRow>
      <CCol col="12">
        <CCard>
          <CCardBody>
            <CForm @submit.prevent="addNotification()" wasValidated>
              <h1 class="text-center">Add Notification</h1>
              <p class="text-muted text-center">
                Kindly verify all details before submitting
              </p>
              <CRow>
                <CCol sm="10" lg="4">
                  <CInput
                    label="Title"
                    required
                    v-model="title"
                    placeholder="Enter Title"
                  />
                </CCol>

                <CCol sm="10" lg="4">
                  <CInputFile
                    label="Thumbnail"
                    @change="handleFileUpload($event, 'thumbnail')"
                    placeholder="Enter Thumbnail"
                  ></CInputFile>
                </CCol>
              </CRow>

              <CRow>
                <CCol col="3">
                  <CInputCheckbox :checked.sync="sendNow" label="Send Now" />
                </CCol>
                <CCol col="3">
                  <CInputCheckbox
                    :checked.sync="isRepeated"
                    label="isRepeated"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol col="3" v-show="isRepeated">
                  <CInput
                    type="number"
                    :required="isRepeated"
                    v-model="repeatCount"
                    label="Repeat Count"
                    min="0"
                  />
                </CCol>
                <CCol col="3" v-show="isRepeated">
                  <CInput
                    type="number"
                    :required="isRepeated"
                    v-model="repeatAfter"
                    label="Repeat After"
                    min="0"
                  />
                </CCol>
                <CCol col="3" v-show="!sendNow">
                  <CInput
                    label="Notification Time"
                    type="datetime-local"
                    :required="!sendNow"
                    v-model="notificationTime"
                    placeholder="Notification Time"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CTextarea
                    type="text"
                    required
                    v-model="body"
                    label="Message"
                  />
                </CCol>
              </CRow>

              <CRow>
                <CCol col="12" class="text-center p-4">
                  <CButton type="submit" :disabled="disabled" color="success"
                    >Save</CButton
                  >
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow> -->
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'

  // You can also register Quill modules in the component
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'
  export default {
    name: 'Notification',
    components: {
      // quillEditor,
    },
    mixins: [ajaxCallMixin, localDb],
    data () {
      return {
        disabled: false,
        title: '',
        companyId: this.get('userCompanyId'),
        body: '',
        sendNow: true,
        isRepeated: false,
        notificationTime: '',
        repeatCount: 0,
        repeatAfter: 0,
        currentAlertCounter: 0,
        fields: [],
        editorOption: {
          placeholder: 'Enter Body',
          theme: 'snow',
          name: 'notification',
        },
        message: '',
      }
    },
    computed: {
      token: function () {
        return this.getToken()
      },
    },
    beforeMount () {
      this.getCompanyDropDown()
    },
    methods: {
      addNotification () {
        this.disabled = true
        const param = {}
        const data = {}
        data.sendNow = this.sendNow
        data.title = this.title
        data.message = this.body
        data.notificationTime = this.notificationTime
        data.isRepeated = this.isRepeated
        data.repeatCount = this.repeatCount
        data.repeatAfter = this.repeatAfter
        data.companyId = this.companyId
        const url = 'notification/notify/schedulePushNotification'
        param.data = data
        param.token = this.token
        this.ajaxCall(url, param, this.callBackAddEditCourse, this.fields)
      },
      callBackAddEditCourse (apiResponse) {
        this.currentAlertCounter = 10
        this.message = 'Notification sent'
        this.alertColor = 'success'
        this.disabled = false
      },
      // getCompanyDropDown () {
      //   const param = {}
      //   const assessorId = this.$route.params.assessorId
      //   const url = 'company/company/getCompanyList'

      //   param.data = {}
      //   param.token = this.token
      //   this.ajaxCall(url, param, this.populateList)
      // },
      populateList (apiResponse) {
        if (apiResponse.error !== true) {
          this.companyList = this.changeListToSelect(
            apiResponse.data.companyList,
            'companyId',
            'companyName',
          )
        }
      },
    },
  }
</script>
