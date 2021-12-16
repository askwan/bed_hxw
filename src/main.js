import './public-path'
// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'

import * as echarts from 'echarts'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import './registerServiceWorker'
// import * as echarts from 'echarts'
//import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import Initializer from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import './assets/style.less'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.prototype.$echarts = echarts
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('DragModal', () => import('./components/DragModal/DragModal'))

// YS, 接收主应用数据组件
import common from './common/index'

window.umi_plugin_ant_themeVar = themePluginConfig.theme

let instance = null
function render(props = {}) {
  const { container } = props
  // eslint-disable-next-line
  console.log(__webpack_public_path__)
  instance = new Vue({
    router,
    store,
    i18n,
    // init localstorage, vuex
    created: Initializer,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap(props) {
  common.setCommonData(props)
}
export async function mount(props) {
  common.initGlobalState(props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
  common.setCommonData(props)
  common.initGlobalState(props)
}
