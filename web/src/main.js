import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/scss/reset.scss'

// 全局过滤器
import * as filters from './util/common'
Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter])
})

//引入 swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 接口配置
import API_CONFIG from './util/api'
Vue.prototype.API_CONFIG = API_CONFIG

import axios from 'axios'
Vue.prototype.$ = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || '/web/api'
})

import utils from './util/common'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
