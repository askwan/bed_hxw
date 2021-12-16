// eslint-disable-next-line
// import { } from '@/api/Product/cloudServer'

const ipConfig = {
  state: {
    productId: null, // 产品id
    productName: null // 产品名称
  },

  mutations: {
    SET_IPProductInfo: (state, data) => {
      state.productId = data.productId !== undefined && data.productId !== null ? Number(data.productId) : null
      state.productName = data.productName
    }
  },

  actions: {
    // 更新产品信息
    updateIPProductInfo({ commit }, obj) {
      commit('SET_IPProductInfo', obj)
    }
  }
}

export default ipConfig
