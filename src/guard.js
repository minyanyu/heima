import router from './router'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let res = window.localStorage.getItem('user-info')
    if (res) {
      let token = JSON.parse(res).token
      if (token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
