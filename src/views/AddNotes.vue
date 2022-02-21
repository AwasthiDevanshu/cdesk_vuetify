<template>
  <div>
    <template>
      <v-form  ref="form" v-model="valid" lazy-validation>
          <v-flex style="display:flex">
          <v-col cols="6" sm="6">
        <v-text-field
           
          v-model="title"
          :counter="10"
          :rules="nameRules"
          label="Title"
          placeholder="Enter Title"
          required
          
        ></v-text-field></v-col>

        <v-col cols="6" sm="12">
        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Category"
          placeholder="Select Category"
          required
          cols="6"
        ></v-select></v-col></v-flex>

        <v-flex style="display:flex">
        <v-col cols="6" md="6" sm="12">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Url"
          placeholder="Enter Url"
          required
          cols="6"
        ></v-text-field></v-col>

        <v-col cols="6" sm="12">
        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Course"
          placeholder="Select Course"
          required
          cols="6"
        ></v-select></v-col>
        </v-flex>

        <v-flex text-center align-center>
          <v-btn   class="white--text" color="pink" @click="resetValidation">
            Submit
          </v-btn>
        </v-flex>
      </v-form>
    </template>
  </div>
</template>
  </div>
</template>

<script>
import { ajaxCallMixin } from "../components/HttpCommon";
import { localDb } from "../components/localDb";

const tableFields = [
  { key: "title", _style: "width:20%" },
  { key: "category", _style: "width:20%" },
  { key: "url", _style: "width:20%" },
  {
    key: "actions",
    _style: "width:20%;",
    sorter: false,
    filter: false,
    label: "Actions",
  },
];
import Multiselect from "vue-multiselect";
export default {
  name: "AddNotes",
  mixins: [ajaxCallMixin, localDb],
  created() {
    this.getToken();
    this.getVideoCategoryList();
    this.getGNotesList();
    this.getCourseList();
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      notesList: [],
      videoCategoryList: [],
      companyId: this.get("userCompanyId"),
      companyList: [],
      tableFields,
      videoCategory: 40,
      url: "",
      title: "",
      fixedToasts: 0,
      videoCatMap: {},
      message: "",
      disabled: false,
      courseList: [],
      courseId: [],
      courseId1: [],
    };
  },
  methods: {
    getVideoCategoryList() {
      let param = {};
      let courseId = this.$route.params.courseId;
      let data = { courseId: courseId };
      let url = "course/misc/getVideoCategoryList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateVideoCategoryList);
    },
    generateVideoCategoryList(apiResponse) {
      if (apiResponse.error != true) {
        let categoryList = apiResponse.data.categoryList;
        this.videoCategoryList = this.changeListToSelect(
          categoryList,
          "id",
          "categoryName"
        );
        this.videoCatMap = this.arrayColumn(categoryList, "categoryName", "id");
      }
    },
    getGNotesList() {
      let param = {};
      let data = {};
      data["companyId"] = this.get("userCompanyId"); //thid

      let url = "course/misc/getCourseNotesList";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.generateGList);
    },
    generateGList(apiResponse) {
      if (apiResponse.error != true) {
        this.notesList = apiResponse.data.notesList;
      }
    },
    addGNote() {
      let param = {};
      let data = {};
      data.courseId = this.arrayColumn(this.courseId, "courseId");
      data.catId = this.videoCategory;
      data.title = this.title;
      data.url = this.url;
      data["companyId"] = this.get("userCompanyId");
      let url = "course/misc/addEditCourseNotes";
      param.data = data;
      param.token = this.getToken();
      this.disabled = true;
      this.ajaxCall(url, param, this.addGNoteCallback);
    },
    addGNoteCallback() {
      this.fixedToasts++;
      this.message = "Notes added, Successfully";
      this.alertColor = "success";
      this.disabled = false;
      this.getGNotesList();
    },
    deleteGnotes(item) {
      let param = {};
      let data = { notesId: item.notesId };
      let url = "course/misc/deleteCourseNotes";
      param.data = data;
      param.token = this.getToken();
      this.ajaxCall(url, param, this.deleteGnotesCallback);
    },
    deleteGnotesCallback(apiResponse) {
      this.fixedToasts++;
      this.message = "Notes deleted, Successfully";
      this.alertColor = "success";
      this.disabled = false;
      this.getGNotesList();
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>