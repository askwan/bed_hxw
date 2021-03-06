import router from './router'
import store from './store'
// import storage from 'store'
import cookies from 'js-cookie'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = [
  'login',
  'register',
  'registerResult',
  'forgetPassword',
  'access_token'
  // 'home',
  // 'app',
  // 'news',
  // 'help',
  // 'community',
  // 'about',
  // 'ip-detail',
  // 'cloud-detail',
  // 'public-serve'
] // no redirect allowList
const setTokenPath = '/access_token'
const defaultRoutePath = '/home'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  /* has token */

  let hasToken = store.getters.token
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    hasToken = sessionStorage.getItem(ACCESS_TOKEN)
  } else if (cookies.get(ACCESS_TOKEN)) {
    hasToken = cookies.get(ACCESS_TOKEN)
    store.commit('SET_TOKEN', hasToken)
  }
  // if (storage.get(ACCESS_TOKEN)) {
  //   hasToken = storage.get(ACCESS_TOKEN)
  // } else if (cookies.get(ACCESS_TOKEN)) {
  //   hasToken = cookies.get(ACCESS_TOKEN)
  //   store.commit('SET_TOKEN', hasToken)
  // }
  if (hasToken === 'undefined') {
    hasToken = ''
  }


  if (hasToken) {
    if (to.path === setTokenPath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // check login user.roles is null
      if (store.getters.roles.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            const result = res.data || res.result || {}
            const roles = result && result.role
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // debugger
              // ??????roles?????????????????????????????????
              // ??????????????????????????????
              router.addRoutes(store.getters.addRouters)
              // ???????????? redirect ????????????????????????????????????????????????
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // ?????????????????????
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            // notification.error({
            //   message: '??????',
            //   description: '????????????????????????????????????'
            // })
            // ????????????????????????????????????????????????????????????????????????????????????
            store.dispatch('Logout').then(() => {
              next({ path: setTokenPath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // ?????????????????????????????????
      next()
    } else {
      next({ path: setTokenPath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
