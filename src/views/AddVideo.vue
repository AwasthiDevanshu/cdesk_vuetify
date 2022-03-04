<template>
  <v-form
    ref="addVideoForm"
    @submit.prevent="addCourseVideo()"
    wasValidated
    style="padding: 25px"
  >
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
          label="Video Title"
          v-model="title"
          :rules="rules"
          hide-details="auto"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6" v-if="this.hostedAt == 1">
        <v-text-field
          label="Video ID"
          v-model="youtubeVideoId"
          placeholder="Enter Video Key"
          :rules="rules"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
          v-if="this.hostedAt == 3"
          placeholder="Enter url"
          label="Url"
          v-model="url"
          :rules="rules"
          hide-details="auto" /></v-col
    ></v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-select
          :options="courseList"
          :allow-empty="false"
          :searchable="true"
          :internal-search="true"
          :hide-selected="true"
          :multiple="true"
          track-by="courseId"
          v-model="courseId"
          placeholder="Select Course"
          label="Course"
      /></v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ inputValue, inputEvents }">
            <v-text-field
              v-model="date"
              label="Class Time"
              placeholder="Enter Class Duration"
              readonly
              v-bind="inputValue"
              v-on="inputEvents"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu></v-col
      ></v-row
    >
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-text-field
          label="Duration"
          type="number"
          :rules="rules"
          hide-details="auto"
      /></v-col>

      <v-col cols="12" sm="12" md="6" lg="6">
        <v-select
          label="Category"
          :value.sync="videoCategory"
          :options="videoCategoryList"
          @update:value="getSubCategoryList()"
          placeholder="Select Category" /></v-col
    ></v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-select
          :value.sync="subCatId"
          :options="subCatList"
          :disabled="subCatDisable"
          label=" Sub-Category"
          placeholder="Select Sub-Category"
      /></v-col>

      <v-col cols="12" sm="12" md="6" lg="6">
        <v-file-input
        ref="fileUpload"
          prepend-icon=""
          accept="image/*"
          @change="handleFileUpload($event, 'thumbnail')"
          label="Thumbnail" /></v-col
    ></v-row>

    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-file-input prepend-icon="" multiple ref="fileUpload"
              @change="handleFileUpload($event, 'pdf')"
              placeholder="Select pdf"  label="pdf" />
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4">
        <v-checkbox
          v-model="ex4"
          label="Enable Chat"
          value="red"
          hide-details
          :checked.sync="chatEnabled"
        />
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4">
        <v-checkbox label="Paid Video" :checked.sync="isPaid" value="red" hide-details />
      </v-col>
    </v-row>

    <div id="submit" style="margin-top: 3rem" class="text-center">
      <v-btn color="grey lighten-4" text--white click="resetValidation">
        Submit
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

export default {
  name: "AddVideo",
  mixins: [ajaxCallMixin, localDb],
  created() {
    this.getToken();
    this.getVideoCategoryList();
    this.getCourseList();
  },
  data: () => ({
    videoList: [],
    title: "",
    hostedAt: this.$route.params.hostedAt,
    url: "",
    isPaid: false,
    chatEnabled: false,
    duration: 60,
    password: "",
    details: [],
    fields: [],
    collapseDuration: 0,
    videoModal: false,
    videoModal3: false,
    eventDateTime: "",
    disabled: false,
    videoId: 0,
    youtubeVideoId: "",
    modalTitle: "Add Video",
    fixedToasts: 0,
    message: "",
    videoCategory: 40,
    videoCategoryList: [],
    videoCount: 0,
    pages: 1,
    page: 1,
    filters: {},
    loading: true,
    index: 0,
    subCatId: 0,
    subCatList: [],
    subCatDisable: true,
    pdfModal: false,
    pdfUrl: null,
    courseList: [],
    courseId: [],
    courseId1: [],
    successModal: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  methods: {
    getVideoCategoryList() {
      let param = {};
      let data = {};
      let url = "course/misc/getVideoCategoryList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateVideoCategoryList);
    },
    generateVideoCategoryList(apiResponse) {
      if (apiResponse.error != true) {
        const categoryList = apiResponse.data.categoryList;

        this.videoCategoryList = this.changeListToSelect(
          categoryList,
          "id",
          "categoryName"
        );
      }
    },
    getSubCategoryList() {
      this.subCatDisable = true;
      let param = {};
      let data = {};
      data.catId = this.videoCategory;
      this.subCatId = this.videoCategory;
      let url = "course/misc/getSubCatList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateSubCategoryList);
    },
    generateSubCategoryList(apiResponse) {
      if (apiResponse.error != true) {
        const subCatList = apiResponse.data.subCatList;
        this.subCatList = this.changeListToSelect(
          subCatList,
          "id",
          "subCategory"
        );
      }
      this.subCatDisable = false;
    },
    addCourseVideo() {
      this.disabled = true;
      let param = {};
      let data = {};
      data.courseId = this.arrayColumn(this.courseId, "courseId");
      data.videoId = this.videoId;
      data.title = this.title;
      data.hostedAt = this.hostedAt;
      if (data.hostedAt == 3) {
        data.url = this.url;
      } else {
        data.url = `https://www.youtube.com/watch?v=${this.youtubeVideoId}`;
      }
      data.isPaid = this.isPaid;
      data.chatEnabled = this.chatEnabled;
      data.duration = this.duration;
      data.password = this.password;
      data.videoCategory = this.videoCategory;
      data.subCatId = this.subCatId;
      data.eventDateTime = this.eventDateTime;
      let url = "course/course/addVideoToCourse";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.addVideoCallBack, this.fields);
    },
    addVideoCallBack() {
      // this.fixedToasts++;
      // this.message = "Video added, Successfully";
      // this.alertColor = "success";
      this.disabled = false;
      this.successModal = true;
    },
    resetForm() {
      window.location.reload();
    },
    generateCourseList(apiResponse) {
      if (apiResponse.error != true) {
        this.courseList = apiResponse.data.courseList;
      }
    },
    getCourseList() {
      let param = {};
      let data = {};
      data.limit = 0;
      data.companyId = this.get("userCompanyId");

      let url = "course/course/getVideoCourseList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateCourseList);
    },
  },
};
</script>
