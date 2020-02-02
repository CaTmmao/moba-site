import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from './ajax'
Vue.prototype.$ = axios

// api 配置
import API_CONFIG from './api/index'
Vue.prototype.API_CONFIG = API_CONFIG

//所有组件都应用
Vue.mixin({
  computed: {
    uploadUrl() {
      return `${this.$.defaults.baseURL}upload`
    }
  },
  methods: {
    getAuthorization() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

//公用scss
import '@/assets/scss/common.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
