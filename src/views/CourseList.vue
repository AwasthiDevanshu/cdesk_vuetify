<template>
  <div class="team">
    <v-card elevation="4" class="card1">
      <v-btn   large flat fab class="grey darken-2 white--text">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-card>
    <v-container class="container">
      <v-card
        v-for="item in items"
        :key="item.courseId"
        flat
        class="text-center ma-3 white"
        id="card"
      >
        <div class="card_content">
          <v-responsive class="pt-2 my-1">
            <!-- <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" /> 
            -->
            <img
              src="https://media.istockphoto.com/photos/nicelooking-young-caucasian-businesswoman-using-tablet-at-the-desk-in-picture-id1285788477?b=1&k=20&m=1285788477&s=170667a&w=0&h=lG4CjKoWrSN1r2IlriadOVUJt2p6u97uYLrOkl4vrzc="
            />
          </v-responsive>
          <v-card-text class="card-text">
            <div
              style="padding: 0px"
              class="heading6 font-weight-medium Black--text"
            >
              {{ item.courseName }}
            </div>
            <div class="black--text">
              <strong>Course Price :</strong>{{ item.price }}
            </div>
            <div class="black--text">
              <strong>Course Id :</strong> {{ item.courseId }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row class="row1">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-2" fab dark small color="#e91e63">
                    <v-icon v-bind="attrs" v-on="on" dark>
                      mdi-video-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Show Videos</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-2" fab dark small color="#4caf50">
                    <v-icon
                      click="editCandidateModal(item, index)"
                      v-bind="attrs"
                      v-on="on"
                      dark
                    >
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-2" fab dark small color="#00cae3">
                    <v-icon v-bind="attrs" v-on="on" dark>
                      mdi-table-large
                    </v-icon>
                  </v-btn>
                </template>
                <span>Time Table</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-2" fab dark small color="#ff9800">
                    <v-icon v-bind="attrs" v-on="on" dark>
                      mdi-delete-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-row>
          </v-card-actions>

          <!-- </v-card-actions> -->
        </div>
      </v-card>

      <!-- </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

const items = [{}];
const fields = [
  { key: "courseId", _style: "width:20%" },
  { key: "courseName", _style: "width:20% " },
  { key: "price", _style: "width:15% " },
  {
    key: "actions",
    label: "",
    _style: "width:25%",
    sorter: false,
    filter: false,
  },
];
export default {
  name: "CourseList",
  mixins: [ajaxCallMixin, localDb],

  data() {
    return {
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      courseName: "",
      collapseDuration: 0,
      showCourseList: false,
      companyList: [],
      companyId: this.get("userCompanyId"),
      embedSrc: "",
      youtubeVideoId: "",
      componentKey: 0,
      deleteModal: false,
      disabled: "disabled",
      courseId: 0,

      items: [
        "Online Course",
        "Offline Course",
        "Individual Course",
        "Complete Course",
        "Crash Course",
        "Marathon Course",
      ],
      items2: ["Normal", "New", "Popular", "Top 10", "Recommended"],
    };
  },
  created() {
    this.getCourseList();
  },
  methods: {
    generateCompanyList(apiResponse) {
      if (apiResponse.error !== true) {
        const companyList = apiResponse.data.companyList;
        apiResponse = "";
        this.companyList = this.changeListToSelect(
          companyList,
          "companyId",
          "companyName"
        );
      }
    },
    getCompanyList() {
      const param = {};
      const data = {};
      const url = "company/company/getCompanyList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateCompanyList);
    },
    generateCourseList(apiResponse) {
      if (apiResponse.error !== true) {
        const courseList = apiResponse.data.courseList;
        this.items = courseList;

        this.youtubeVideoId = apiResponse.data.videoId;

        // this.embedSrc = "https://www.youtube.com/embed/live_stream?channel="+apiResponse.data.channelId;
      }
    },
    imagePreview(item) {},
    getCourseList() {
      const param = {};
      const data = {};
      data.limit = 0;
      data.companyId = this.get("userCompanyId");
      const url = "course/course/getVideoCourseList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateCourseList);
      this.showCourseList = true;
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    showCourseVideoList(item) {
      this.$router.replace("/courseVideos/" + item.courseId);
    },

    editCourseList(item) {
      this.$router.replace("/EditCourse/" + item.courseId);
    },

    showtimeTable(item) {
      this.$router.replace("/timeTable/" + item.courseId);
    },

    deleteCourse() {
      const param = {};
      const data = {};
      data.courseId = this.courseId;
      const url = "course/course/deleteVideoCourse";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.getCourseList);
      this.stop();
    },
    showDeleteModal(item) {
      this.deleteModal = true;
      this.courseId = item.courseId;
    },

    stop() {
      this.deleteModal = false;
    },

    showNotesList(item) {
      this.$router.replace("/gnotes/" + item.courseId);
    },
  },
};
</script>
<style scoped>
img {
  width: 14rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  height: 10rem;
  margin-left: 1rem;
  margin-right: 1rem;
  align-content: center;
}
/* .table td {
  padding-top: 1.5rem;
} */
.row1 {
  display: flex;
  justify-content: center;
  /* padding: 5px;*/
  margin-bottom: 2px;
}
#card {
  width: 18rem;
  height: 20.5rem;
  border-radius: 0.5rem;
}
.container {
  display: grid;

  grid-template-columns: 300px 300px 300px;
  column-gap: 25px;
  row-gap: 20px;
}
.card-text {
  margin-top: -22px;
  /* padding:20px; */
}
.card-content {
  margin: 4px 2px;
}
.card1 {
  width: 58.5rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 90rem;
  max-height: 100px;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  background-color: rgba(250, 247, 243, 0.212);

  /* border-color: solid rgb(230, 40, 40);
  border-width: 10px; */
}
</style>
