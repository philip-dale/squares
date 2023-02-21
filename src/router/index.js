import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/PlayGame.vue'

const routes = [
  {
    path: '/',
    name: 'Play',
    component: HomeView
  },
  {
    path: '/instructions',
    name: 'Instructions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutGame.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/GameSettings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
