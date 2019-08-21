import comAside from './home/aside'
import Header from './home/header'
export default {
  install (Vue) {
    Vue.component('com-aside', comAside)
    Vue.component('com-header', Header)
  }
}
