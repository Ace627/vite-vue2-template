import axios from 'axios'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

// 通用请求配置
const request = axios.create({
  // baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 6 * 1000,
})

// 添加一个请求拦截器
request.interceptors.request.use(
  config => {
    // 1、请求发送之前的时候做点儿什么
    NProgress.start()
    return config
  },
  error => {
    // 2、请求发送失败的时候做点儿什么
    NProgress.done()
    Promise.reject(error)
  },
)

// 添加一个响应拦截器
request.interceptors.response.use(
  response => {
    // 1、服务器响应成功的时候做点儿什么
    NProgress.done()
    return response.data
  },
  error => {
    // 2、服务器响应失败的时候做点儿什么
    NProgress.done()
    return Promise.reject(error)
  },
)

export default request
