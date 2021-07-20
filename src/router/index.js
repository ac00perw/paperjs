import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Draw on canvas',
    component: Home
  },
  {
    path: '/shapes',
    name: 'Shapes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Shapes.vue')
  },
  {
    path: '/time-shapes',
    name: 'Time Shapes',
    component: () => import(/* webpackChunkName: "about" */ '../views/TimeShapes.vue')
  },
    {
    path: '/time-scroll-shapes',
    name: 'Time Scroll Shapes',
    component: () => import(/* webpackChunkName: "about" */ '../views/TimeScrollShapes.vue')
  },
  {
    path: '/string',
    name: 'String',
    component: () => import(/* webpackChunkName: "about" */ '../views/String.vue')
  },
  {
    path: '/lava',
    name: 'Lava Lamp/Waves',
    component: () => import(/* webpackChunkName: "about" */ '../views/Lava.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import(/* webpackChunkName: "about" */ '../views/Scroll.vue')
  },
  {
    path: '/scroll-2',
    name: 'Scroll2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Scroll2.vue')
  },
    {
    path: '/random',
    name: 'Random Blob',
    component: () => import(/* webpackChunkName: "about" */ '../views/Random.vue')
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
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
  }
})

export default router
