import Vue from 'vue'
import App from './App.vue'
import router from './guard.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from './axios-config/axios-config.js'
import index from './components/index'
Vue.use(index)
Vue.prototype.$axios = axios // 把axios变成vue的原型
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
