import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
]

const router = new VueRouter({
  routes
})

export default router
