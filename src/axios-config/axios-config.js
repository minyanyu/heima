import axios from 'axios'
import { Message } from 'element-ui' // 引入message模块
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {} // 处理大数字
}]
axios.interceptors.request.use(function (config) {
  //   console.log(config)
  // 在发起请求请做一些业务处理
  let userInfo = window.localStorage.getItem('user-info')
  let token = userInfo ? JSON.parse(userInfo).token : null
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  let code = error.response ? error.response.status : ''
  let message = ''
  switch (code) {
    case 400 :
      message = '请求参数错误'
      break
    case 401 :
      message = 'token过期或未传'
      window.localStorage.clear() // 只清除本项目的缓存
      window.location.hash = '#/login' // 跳转到登录页
      break
    case 404:
      message = '手机号不正确'
      break
    case 507 :
      message = '服务器数据库异常'
      break
    default :
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise()
})
export default axios
