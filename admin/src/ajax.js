import { Message } from 'element-ui'
import router from './router'
import axios from 'axios'

const http = axios.create({
  // 加了斜杠，前缀默认为域名地址  
  baseURL: process.env.VUE_APP_BASE_URL || '/admin/api/'
})

http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${localStorage.token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use((res) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  const { code } = res.data

  if (code !== 1) {
    const { msg } = res.data

    if (msg) {
      Message.error(msg)
    }

    if (code === 110) {
      router.push('/login')
    }
  }

  return res;
}, (err) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(err);
});

export default http