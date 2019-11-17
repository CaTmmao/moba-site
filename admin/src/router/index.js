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
        name: 'categoryCreate',
        component: () => import('@/views/Categories/edit')
      },
      {
        path: 'category/list',
        name: 'categoryList',
        component: () => import('@/views/Categories/list')
      },
      {
        path: 'category/edit/:id',
        name: 'categoryCreate',
        component: () => import('@/views/Categories/edit'),
        props: true
      },

      {
        path: 'item/create',
        name: 'itemCreate',
        component: () => import('@/views/Items/edit')
      },
      {
        path: 'item/list',
        name: 'itemList',
        component: () => import('@/views/Items/list')
      },
      {
        path: 'item/edit/:id',
        name: 'itemCreate',
        component: () => import('@/views/Items/edit'),
        props: true
      },

      {
        path: 'hero/create',
        name: 'heroCreate',
        component: () => import('@/views/Heros/edit')
      },
      {
        path: 'hero/list',
        name: 'heroList',
        component: () => import('@/views/Heros/list')
      },
      {
        path: 'hero/edit/:id',
        name: 'heroCreate',
        component: () => import('@/views/Heros/edit'),
        props: true
      },

      {
        path: 'article/create',
        name: 'articleCreate',
        component: () => import('@/views/Articles/edit')
      },
      {
        path: 'article/list',
        name: 'articleList',
        component: () => import('@/views/Articles/list')
      },
      {
        path: 'article/edit/:id',
        name: 'articleCreate',
        component: () => import('@/views/Articles/edit'),
        props: true
      },
      
      {
        path: 'carousel/create',
        name: 'carouselCreate',
        component: () => import('@/views/Carousel/edit')
      },
      {
        path: 'carousel/list',
        name: 'carouselList',
        component: () => import('@/views/Carousel/list')
      },
      {
        path: 'carousel/edit/:id',
        name: 'carouselCreate',
        component: () => import('@/views/Carousel/edit'),
        props: true
      },
    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
