// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: true,
  mini: false,
  items: [
    // {
    //   title: 'Dashboard',
    //   icon: 'mdi-view-dashboard',
    //   to: '/',
    // },
    // {
    //   title: 'User Profile',
    //   icon: 'mdi-account',
    //   to: '/components/profile/',
    // },
    // {
    //   title: 'Regular Tables',
    //   icon: 'mdi-clipboard-outline',
    //   to: '/tables/regular/',
    // },
    // {
    //   title: 'Typography',
    //   icon: 'mdi-format-font',
    //   to: '/components/typography/',
    // },
    // {
    //   title: 'Icons',
    //   icon: 'mdi-chart-bubble',
    //   to: '/components/icons/',
    // },
    // {
    //   title: 'Google Maps',
    //   icon: 'mdi-map-marker',
    //   to: '/maps/google/',
    // },
    
    {
      title: 'Course List',
      icon: 'mdi-format-list-numbered',
      to: '/views/CourseList/',
    },
    // {
    //   title: 'Add Videos',
    //   icon: 'mdi-map-marker',
    //   to: '/views/AddVideo/',
    // },
    {
      title: 'Add Course',
      icon: 'mdi-folder-multiple-plus',
      to: '/views/AddCourse/',
    },
    {
      title: 'Add Video',
      icon: 'mdi-youtube',
      to: '/views/AddVideo/',
    },
    // {
    //   title: 'Candidate List',
    //   icon: 'mdi-clipboard-list-outline',
    //   to: '/views/CandidateList/',
    // },
    {
      title: 'Candidate List',
      icon: 'mdi-clipboard-list-outline',
      to: '/views/CandList/',
    },
    {
      title: 'Add Notes',
      icon: 'mdi-note-outline',
      to: '/views/AddNotes/',
    },
    
    {
      title: 'Banners',
      icon: 'mdi-chart-bubble',
      to: '/views/BannerList/',
    },
    {
      title: 'Add Notification',
      icon: 'mdi-bell-ring',
      to: '/views/Notification/',
    },

    

    {
      title: 'Score Sheet',
      icon: 'mdi-newspaper-variant-outline',
      to: '/views/ScoreSheet/',
    },
    {
      title: 'Enquiries',
      icon: 'mdi-check-all',
      to: '/views/EnquiryPage/',
    },
    {
      title: 'User Management',
      icon: 'mdi-account-details',
      to: '/views/UserList/',
    },
    {
      title: 'Add Test Series',
      icon: 'mdi-chart-box-plus-outline',
      to: '/views/addtestseries/',
    },
    {
      title: 'Edit Course',
      icon: 'mdi-pencil',
      to: '/views/editcourse/',
    },
    {
      title: 'Add Time Table',
      icon: 'mdi-table',
      to: '/views/timetable/',
    },
  ],

}

const mutations = make.mutations(state)

const actions = {
  ...make.actions(state),
  init: async ({ dispatch }) => {
    //
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
