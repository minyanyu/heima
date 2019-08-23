import comAside from './home/aside'
import Header from './home/header'
import Main from '../views/Home/main'
import breakS from './common/break'
export default {
  install (Vue) {
    Vue.component('com-aside', comAside)
    Vue.component('com-header', Header)
    Vue.component('Main', Main)
    Vue.component('break-c', breakS)
  }
}
