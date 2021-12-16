import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// eslint-disable-next-line
const isProd = process.env.NODE_ENV === 'production'
const baseUrl = process.env.VUE_APP_BASE_URL

export default new Router({
  // base: window.__POWERED_BY_QIANKUN__ ? baseUrl : '/child/' + baseUrl.split('/sub/')[1],
  base: baseUrl,
  mode: 'history',
  routes: constantRouterMap,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    // 滚动条滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
