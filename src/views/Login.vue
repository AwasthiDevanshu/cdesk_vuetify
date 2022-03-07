<template>
  <div>
    <v-text-field
      v-model="username"
      label="Username"
      :rules="rules"
      hide-details="auto"
    />
    <v-text-field
      v-model="password"
      label="Password"
    />
    <v-btn
      color="primary"
      elevation="2"
      rounded
      x-large
      @click="loginUser"
    >
      Login
    </v-btn>
  </div>
</template>

<script>
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'
  export default {
    name: 'Login',
    mixins: [ajaxCallMixin, localDb],
    data () {
      return {
        currentAlertCounter: 0,
      }
    },
    methods: {
      loginUser: function () {
        const data = { username: this.username, password: this.password }
        const url = 'authenticator/auth/loginUser'
        const param = {}
        param.data = data
        this.ajaxCall(url, param, this.saveLoginUser)
      },
      forgetPassword: function () {
        const data = { username: this.username, password: this.password }
        const url = 'authenticator/auth/loginUser'
        const param = {}
        param.data = data
        this.ajaxCall(url, param)
      },
      saveLoginUser: function (apiResponse) {
        if (apiResponse.error !== true && apiResponse.data.roleData.roleId === 1) {
          this.currentAlertCounter = 0
          this.save('loginUser', apiResponse.data.userData)
          this.save('userCompanyId', apiResponse.data.userData.companyId)
          this.save('token', apiResponse.data.userToken)
          this.save('tokenExpiry', apiResponse.data.expiryTime)
          this.getCompanyFeatures()
          this.$router.push({ name: 'Course List', path: '/courseList' })
        } else {
          this.currentAlertCounter = 3
        }
      },
      getCompanyFeatures () {
        const param = {}
        const companyId = this.get('userCompanyId')
        const data = { companyId: companyId }
        const url = 'company/company/getCompanyFeatures'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateFeatureList)
      },
      generateFeatureList (apiResponse) {
        if (apiResponse.error !== true) {
          const featureList = []
          apiResponse.data.companyFeatures.forEach((feature) => {
            if (feature.enabled === '1') {
              featureList.push(feature.featureKey)
            }
          })
          localStorage.setItem('featureList', featureList)
        }
      },
    },
  }
</script>
