import comAside from './home/aside'
import Header from './home/header'
import Main from '../views/Home/main'
export default {
  install (Vue) {
    Vue.component('com-aside', comAside)
    Vue.component('com-header', Header)
    Vue.component('Main', Main)
  }
}
