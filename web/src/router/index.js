import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Main/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Main/Home/index')
      },
      // 文章详情页
      {
        path: '/article/:id',
        name: 'articles',
        component: () => import('@/views/Main/Article/index'),
        props: true
      }
    ]
  },
  // 英雄详情页
  {
    path: '/heroes/:id',
    name: 'heroes',
    component: () => import('@/views/Hero/index'),
    props: true
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
