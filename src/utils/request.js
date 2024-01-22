import axios from 'axios'
import NProgress from 'nprogress'
import { useEnv } from '@/hooks/useEnv'

NProgress.configure({ showSpinner: false })

const { VITE_BASE_API, VITE_REQUEST_TIMEOUT } = useEnv() // 解构环境变量

// 通用请求配置
const request = axios.create({
  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL
  baseURL: VITE_BASE_API,
  // timeout 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 timeout 的时间，请求将被中断
  timeout: VITE_REQUEST_TIMEOUT * 1000,
})

// 添加一个请求拦截器
request.interceptors.request.use(
  (config) => {
    // 1、请求发送之前的时候做点儿什么
    NProgress.start()
    if (config.method?.toUpperCase() === 'GET') {
      config.params = Object.assign(config.params || {}, { timestamp: Date.now() }) // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    }
    return config
  },
  (error) => {
    // 2、请求发送失败的时候做点儿什么
    NProgress.done()
    Promise.reject(error)
  },
)

// 添加一个响应拦截器
request.interceptors.response.use(
  (response) => {
    // 1、服务器响应成功的时候做点儿什么
    NProgress.done()
    return response.data
  },
  (error) => {
    // 2、服务器响应失败的时候做点儿什么
    NProgress.done()
    return Promise.reject(error)
  },
)

export default request
