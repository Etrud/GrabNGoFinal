import Vue from 'vue'
import VueRouter from 'vue-router'
import Launch from '../views/Launch.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Punch from '../views/Punch.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Schedule from '../views/Schedule.vue'
import ContactBook from '../views/ContactBook.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Launch',
    component: Launch
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/punch',
    name: 'Punch',
    component: Punch
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/contact',
    name: 'ContactBook',
    component: ContactBook
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
