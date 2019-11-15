import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'category/create',
        name: 'create',
        component: () => import('@/views/category/edit')
      },
      {
        path: 'category/list',
        name: 'list',
        component: () => import('@/views/category/list')
      },
      {
        path: 'category/edit/:id',
        name: 'edit',
        component: () => import('@/views/category/edit'),
        props: true
      },
      {
        path: 'item/create',
        name: 'create',
        component: () => import('@/views/Items/edit')
      },
      {
        path: 'item/list',
        name: 'list',
        component: () => import('@/views/Items/list')
      },
      {
        path: 'item/edit/:id',
        name: 'edit',
        component: () => import('@/views/Items/edit'),
        props: true
      }
    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
