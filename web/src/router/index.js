import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index')
      },
      // 文章详情页
      {
        path: '/article/:id',
        name: 'articles',
        component: () => import('@/views/Home/Article'),
        props: true        
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
