import axios from 'axios'
import store from '@/store'
// import storage from 'store'
import cookies from 'js-cookie'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
let host
try {
  // eslint-disable-next-line
  const baseURL = new URL(__webpack_public_path__)
  host = baseURL.protocol + '//' + baseURL.host
  host = ''
} catch {
  host = ''
}
const request = axios.create({
  // API 请求的默认前缀
  // eslint-disable-next-line
  baseURL: host + process.env.VUE_APP_API_BASE_URL,
  timeout: 15000 // 请求超时时间，勿动  -- 2021-6-9
})

// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = cookies.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      // notification.error({
      //   message: 'Unauthorized',
      //   description: 'Authorization verification failed'
      // })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = cookies.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    // config.headers['Access-Token'] = token
    config.headers['Authorization'] = token
    // 跨域请求
    config.headers['Access-Control-Allow-Origin'] = '*'
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
