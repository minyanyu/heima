import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/login'
import Main from './views/Home/main'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
