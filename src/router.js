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
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/home/comment', // 评论列表
          component: () => import('./views/commont') // 按需加载的写法
        },
        {
          path: '/home/material', // 评论列表
          component: () => import('./views/material') // 按需加载的写法
        }
      ]
    }

  ]
})
