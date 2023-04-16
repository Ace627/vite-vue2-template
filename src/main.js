import Vue from 'vue'
import App from './App.vue'

import './styles/index.scss' // 全局样式

import router from './router'
import store from './store'

Vue.config.productionTip = false // 设置为 false 以阻止 Vue 在启动时生成生产提示

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this // 启用全局事件总线功能
  },
  el: '#app',
  router,
  store,
  render: h => h(App),
})
