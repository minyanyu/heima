import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home'
import Login from './views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
