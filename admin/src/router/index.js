import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      //分类管理
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

      //物品管理
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

      //英雄管理
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

      //文章管理
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

      //首页轮播图管理
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

      //管理员管理
      {
        path: 'admin/create',
        name: 'adminCreate',
        component: () => import('@/views/Admin/edit')
      },
      {
        path: 'admin/list',
        name: 'adminList',
        component: () => import('@/views/Admin/list')
      },
      {
        path: 'admin/edit/:id',
        name: 'adminCreate',
        component: () => import('@/views/Admin/edit'),
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
