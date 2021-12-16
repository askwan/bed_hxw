const global = {
  namespaced: true,
  state: {},
  mutations: {
    setGlobalState(state, payload) {
      state = Object.assign(state, payload)
    },
  },
  actions: {
  }
}

export default global
