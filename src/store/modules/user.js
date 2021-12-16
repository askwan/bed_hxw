import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { roleObj } from '@/utils/roleObj'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const globalInfo = store.state.global
        const result = {}
        // 如果主应用没传权限参数或者是单应用测试，就加载静态全部权限
        result.role = globalInfo.routers ? globalInfo.routers : roleObj

        if (result.role && result.role.permissions.length > 0) {
          const role = result.role
          role.permissions = result.role.permissions
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map(action => {
                return action.action
              })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => {
            return permission.permissionId
          })
          commit('SET_ROLES', result.role)
          commit('SET_INFO', globalInfo.userInfo)

          resolve({data: result})
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }

      })
    },

    // 第三方登录设置token
    SetToken({ commit }, accessToken) {
      return new Promise(resolve => {
        storage.set(ACCESS_TOKEN, accessToken, 24 * 60 * 60 * 1000)
        commit('SET_TOKEN', accessToken)
        resolve()
      })
    },

    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_INFO', null)
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        resolve()
      })
    },
  }
}

export default user
