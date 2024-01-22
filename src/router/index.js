import Vue from 'vue'
import VueRouter from 'vue-router'
import { Layout } from '@/config/constants'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
  },
]

export default new VueRouter({
  // mode: 'history', // 需要服务器支持
  mode: 'hash',
  routes,
})
