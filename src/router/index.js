import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index.vue'

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
