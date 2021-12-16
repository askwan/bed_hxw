import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

import cloudServer from './modules/Product/cloudServer'
import ipConfig from './modules/Product/ipConfig'
import lab from './modules/lab'
import global from './modules/global'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    cloudServer,
    ipConfig,
    lab,
    global
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
