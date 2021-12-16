import Vue from 'vue'
import Store from '@/store'
/**
 * 接受主应用的传参
 * @param props 主应用穿的公共数据
 */
function setCommonData(props) {
  Store.commit('global/setGlobalState', props)
}

/**
 * 设置微应用全局状态
 * @param props 主应用穿的公共数据
 */
function initGlobalState(props) {
  console.log('父应用传的值', props)
  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.setGlobalState
  // 设置通讯
  // eslint-disable-next-line
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    alert('子应用监听到主应用改变啦')
  })
}
export default {
  setCommonData,
  initGlobalState: initGlobalState
}
