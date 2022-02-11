<template>
  <div class="team">
    <v-container class="my-5">
      <v-row class="row-wrap">
        <v-col
         
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
             v-for="item in items"
          :key="item.courseId"
            flat
            class="text-center ma-3"
          >
            <v-responsive class="pt-4">
              <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
            </v-responsive>
            <v-card-text>
              <div class="subheading">
                {{ item.courseName }}
              </div>
              <div class="grey--text">
                {{ item.price }}
              </div>
              <div class="grey--text">
                {{ item.courseId }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                color="pink"
              >
                <!-- <v-icon small left>Message</v-icon> -->
                <span>Show Videos</span>
              </v-btn>
              <v-btn
                flat
                color="pink"
              >
                <!-- <v-icon small left>Message</v-icon> -->
                <span>Edit</span>
              </v-btn>
              <v-btn
                xs
                flat
                color="pink"
              >
                <!-- <v-icon small left>Message</v-icon> -->
                <span>Timetable</span>
              </v-btn>
              <v-btn
                flat
                color="pink"
              >
                <!-- <v-icon small left>Message</v-icon> -->
                <span>Delete</span>
              </v-btn>
            </v-card-actions>

            <!-- <v-card-title>Tonight's availability</v-card-title> -->

            <!-- <v-card-text>

    </v-card-text> -->

            <!-- <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="showCourseVideoList(item)">
        Show Videos
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="editCourseList(item)">
        Edit
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="showtimeTable(item)">
        Timetable
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="showDeleteModal(item)">
       Delete
      </v-btn> -->

            <!-- </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { ajaxCallMixin } from '../components/HttpCommon'
  import { localDb } from '../components/localDb'

  const items = [{}]
  const fields = [
    { key: 'courseId', _style: 'width:20%' },
    { key: 'courseName', _style: 'width:20% ' },
    { key: 'price', _style: 'width:15% ' },
    {
      key: 'actions',
      label: '',
      _style: 'width:25%',
      sorter: false,
      filter: false,
    },
  ]
  export default {
    name: 'CourseList',
    mixins: [ajaxCallMixin, localDb],

    data () {
      return {
        items: items.map((item, id) => {
          return { ...item, id }
        }),
        fields,
        details: [],
        courseName: '',
        collapseDuration: 0,
        showCourseList: false,
        companyList: [],
        companyId: this.get('userCompanyId'),
        embedSrc: '',
        youtubeVideoId: '',
        componentKey: 0,
        deleteModal: false,
        disabled: 'disabled',
        courseId: 0,
      }
    },
    created () {
      this.getCourseList()
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
      generateCourseList (apiResponse) {
        if (apiResponse.error !== true) {
          const courseList = apiResponse.data.courseList
          this.items = courseList

         
          this.youtubeVideoId = apiResponse.data.videoId

        // this.embedSrc = "https://www.youtube.com/embed/live_stream?channel="+apiResponse.data.channelId;
        }
      },
      imagePreview (item) {},
      getCourseList () {
        const param = {}
        const data = {}
        data.limit = 0
        data.companyId = this.get('userCompanyId')
        const url = 'course/course/getVideoCourseList'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.generateCourseList)
        this.showCourseList = true
      },
      toggleDetails (item) {
        this.$set(this.items[item.id], '_toggled', !item._toggled)
        this.collapseDuration = 300
        this.$nextTick(() => {
          this.collapseDuration = 0
        })
      },
      showCourseVideoList (item) {
        this.$router.push('/courseVideos/' + item.courseId)
      },

      editCourseList (item) {
        this.$router.push('/editCourse/' + item.courseId)
      },

      showtimeTable (item) {
        this.$router.push('/timeTable/' + item.courseId)
      },

      deleteCourse () {
        const param = {}
        const data = {}
        data.courseId = this.courseId
        const url = 'course/course/deleteVideoCourse'
        param.data = data
        param.token = this.getToken()
        this.ajaxCall(url, param, this.getCourseList)
        this.stop()
      },
      showDeleteModal (item) {
        this.deleteModal = true
        this.courseId = item.courseId
      },

      stop () {
        this.deleteModal = false
      },

      showNotesList (item) {
        this.$router.push('/gnotes/' + item.courseId)
      },
    },
  }
</script>
<style scoped>
img {
  width: 12rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  height: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
  align-content: center;
}
/* .table td {
  padding-top: 1.5rem;
} */
</style>
