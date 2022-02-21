// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { trailingSlash } from '@/util/helpers'
import { layout, route } from '@/util/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    layout('Default', [
      route('Dashboard'),

      // Pages
      route('UserProfile', null, 'components/profile'),
      //
      route('Icons', null, 'components/icons'),
      route('Typography', null, 'components/typography'),

      // Tables
      route('Regular Tables', null, 'tables/regular'),

      // Maps
      route('Google Maps', null, 'maps/google'),

      route('Login', null, 'views/login'),

      route('CourseList', null, 'views/courselist'),

      // route('AddVideo', null, 'views/addvideo'),

      route('AddCourse', null, 'views/addcourse'),

      route('AddVideo', null, 'views/addvideo'),

      route('CandidateList', null, 'views/candidatelist'),

      route('AddNotes', null, 'views/addnotes'),

      route('BannerList', null, 'views/Banners'),

      route('Notification', null, 'views/notification'),

      route('EnquiryList', null, 'views/enquiry'),

      route('UserList', null, 'views/userlist'),

      route('ScoreSheet', null, 'views/scoresheet'),

    ]),
  ],
})
router.beforeEach((to, from, next) => {
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})
export default router
