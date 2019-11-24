import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Main/Home/index')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
