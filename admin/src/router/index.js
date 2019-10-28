import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main'),
    children: [
      {
        path: 'category/create',
        name: 'create',
        component: () => import('@/views/category/create')
      },
      {
        path: 'category/list',
        name: 'list',
        component: () => import('@/views/category/list')
      }
    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
