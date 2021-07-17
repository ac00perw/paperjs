import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/string',
    name: 'String',
    component: () => import(/* webpackChunkName: "about" */ '../views/String.vue')
  },
  {
    path: '/lava',
    name: 'Lava',
    component: () => import(/* webpackChunkName: "about" */ '../views/Lava.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import(/* webpackChunkName: "about" */ '../views/Scroll.vue')
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
