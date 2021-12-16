// eslint-disable-next-line
import {
  dictionaryByType,
  gpuOfStationInfo,
  multiSiteInfo,
  stationAll,
  externalType,
  monthlyFee,
  monthlyLabFee,
  hourFee,
  hourLabFee,
  mirroringAll,
  multiSiteMirroring,
  cloudServerAdd,
  testBedAdd,
  publicServerAdd,
  npuServerAdd,
  dpuServerAdd,
  orderInfo
} from '@/api/Product/cloudServer'
import { production } from '@/api/home'

const cloudServer = {
  state: {
    // 字典表集合
    dictionary: {
      GPU_TYPE: [],
      CPU_TYPE: [],
      NETWORK_TYPE: [],
      STORAGE_TYPE: [],
      MEMORY_TYPE: [],
      OS_VERSION: [],
      OS: [],
      AI_VERSION: [],
      AI: [],
      CONTAINER_VERSION: [],
      CONTAINER: [],
      SPEC_CONFIG_ARCHITECTURE: []
    },
    HotProductList: [], // 热门产品信息保存
    AllProductList: [], // 所有产品信息保存
    loadingGpu: false, // gpu列表查询的转圈
    // 所有站点
    stationAll: [],
    gpuTabList: [], //  一个站点下gpu的tab标签集合
    cpuTabList: [],
    gpuList: [], // gpu列表
    monthlyFee: null, // 按月的费用
    hourFee: null, // 按量的费用
    mirroringAll: null,
    multiSiteMirroring: null,
    orderAdd: null, // 新增订单
    orderInfo: null, // 订单信息查询
    productId: null, // 产品id
    productName: null // 产品名称
  },

  mutations: {
    SET_dictionaryByType: (state, data) => {
      state.dictionary[data.type] = data.data
    },
    SET_ConfigureInfo: (state, data) => {
      state.configureInfo = data
    },
    SET_OrderAdd: (state, data) => {
      state.orderAdd = data
    },
    SET_LoadingGpu: (state, data) => {
      state.loadingGpu = data
    },
    SET_stationAll: (state, data) => {
      state.stationAll = data
    },
    SET_gpuTabList: (state, data) => {
      state.gpuTabList = data
    },
    SET_cpuTabList: (state, data) => {
      state.cpuTabList = data
    },
    SET_GpuList: (state, data) => {
      state.gpuList = data
    },
    SET_monthlyFee: (state, data) => {
      state.monthlyFee = data
    },
    SET_hourFee: (state, data) => {
      state.hourFee = data
    },
    SET_mirroringAll: (state, data) => {
      state.mirroringAll = data
    },
    SET_OrderInfo: (state, data) => {
      state.orderInfo = data
    },
    SET_ProductInfo: (state, data) => {
      state.productId = data.productId !== undefined && data.productId !== null ? Number(data.productId) : null
      state.productName = data.productName
    },
    // 热门产品信息保存
    SET_HotProductList: (state, data) => {
      state.HotProductList = data
    },
    // 所有产品信息保存
    SET_AllProductList: (state, data) => {
      state.AllProductList = data
    }
  },

  actions: {
    // 查询字典表获取资源类型
    dictionaryByType({ commit }) {
      const type = [
        'GPU_TYPE',
        'CPU_TYPE',
        'NETWORK_TYPE',
        'MEMORY_TYPE',
        'STORAGE_TYPE',
        'OS_VERSION',
        'OS',
        'AI_VERSION',
        'AI',
        'CONTAINER_VERSION',
        'CONTAINER',
        'SPEC_CONFIG_ARCHITECTURE'
      ]
      type.map(item => {
        return new Promise((resolve, reject) => {
          dictionaryByType({ typeCode: item })
            .then(response => {
              if (response && response.data) {
                commit('SET_dictionaryByType', { type: item, data: response.data })
              }
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
      })
    },
    // 更新订单信息
    updateOrderAdd({ commit }, obj) {
      commit('SET_OrderAdd', obj)
    },
    // 更新产品信息
    updateProductInfo({ commit }, obj) {
      commit('SET_ProductInfo', obj)
    },
    // 更新产品信息
    updateGpuTabList({ commit }, obj) {
      commit('SET_gpuTabList', obj)
    },
    // 查询所有站点数据
    getSationList({ commit }, obj) {
      return new Promise((resolve, reject) => {
        stationAll(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_stationAll', response.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查询三大热门产品
    getHotProductList({ commit }) {
      // 修改接口，目前首页的热门产品通过调用分页的，并且为在线状态的
      const obj = {
        pageSize: 3,
        currentPage: 1
      }
      return new Promise((resolve, reject) => {
        production(obj)
          .then(response => {
            if (response && response.data) {
              const tempArr = []
              for (const i of response.data.rows) {
                if (tempArr.length < 3) {
                  tempArr.push({
                    name: i.name,
                    tag: i.tag.split(';'),
                    price: i.minPrice,
                    info: i.description,
                    id: i.id
                  })
                }
              }
              commit('SET_HotProductList', tempArr)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查询所有产品
    getAllProductList({ commit }) {
      // 产品通过调用分页的，并且为在线状态的
      const obj = {
        pageSize: 10000,
        currentPage: 1
      }
      return new Promise((resolve, reject) => {
        production(obj)
          .then(response => {
            if (response && response.data) {
              const tempArr = []
              for (const i of response.data.rows) {
                tempArr.push({
                  name: i.name,
                  tag: i.tag.split(';'),
                  price: i.minPrice,
                  info: i.description,
                  id: i.id
                })
              }
              console.log('store')
              console.log(tempArr)
              console.log('store')
              commit('SET_AllProductList', tempArr)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查询产品站点对应的去重的硬件类型
    externalType({ commit }, obj) {
      return new Promise((resolve, reject) => {
        externalType(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_gpuTabList', response.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //查询站点下的架构
    cpuExternalType({ commit }, obj) {
      return new Promise((resolve, reject) => {
        externalType(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_cpuTabList', response.data)
            }
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查询出站点下有关型号的所有GPU数据
    gpuOfStationInfo({ commit }, obj) {
      commit('SET_LoadingGpu', true)
      return new Promise((resolve, reject) => {
        gpuOfStationInfo(obj)
          .then(response => {
            const data = response.data && response.data.rows ? response.data.rows : []
            if (data) {
              commit('SET_GpuList', data)
            }
            resolve(response)
            commit('SET_LoadingGpu', false)
          })
          .catch(error => {
            reject(error)
            commit('SET_LoadingGpu', false)
          })
          .finally(() => {
            commit('SET_LoadingGpu', false)
          })
      })
    },
    // 查询出站点下有关型号的所有GPU数据
    multiSiteInfo({ commit }, obj) {
      commit('SET_LoadingGpu', true)
      return new Promise((resolve, reject) => {
        multiSiteInfo(obj)
          .then(response => {
            console.log(response)
            const data = response.data && response.data.rows ? response.data.rows : []
            if (data) {
              commit('SET_GpuList', data)
            }
            resolve(response)
            commit('SET_LoadingGpu', false)
          })
          .catch(error => {
            reject(error)
            commit('SET_LoadingGpu', false)
          })
          .finally(() => {
            commit('SET_LoadingGpu', false)
          })
      })
    },
    // GPU云服务器-包年包月计费
    monthlyFee({ commit }, obj) {
      return new Promise((resolve, reject) => {
        monthlyFee(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_monthlyFee', response.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // GPU云服务器-包年包月计费
    monthlyLabFee({ commit }, obj) {
      return new Promise((resolve, reject) => {
        monthlyLabFee(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_monthlyFee', response.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // GPU服务器购买-按量计费
    hourFee({ commit }, obj) {
      return new Promise((resolve, reject) => {
        hourFee(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_hourFee', response.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // GPU服务器购买-按量计费
    hourLabFee({ commit }, obj) {
      return new Promise((resolve, reject) => {
        hourLabFee(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_hourFee', response.data)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    mirroringAll({ commit }, obj) {
      return new Promise((resolve, reject) => {
        mirroringAll(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_mirroringAll', response.data)
            } else {
              commit('SET_mirroringAll', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    multiSiteMirroring({ commit }, obj) {
      return new Promise((resolve, reject) => {
        multiSiteMirroring(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_mirroringAll', response.data)
            } else {
              commit('SET_mirroringAll', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    cloudServerAdd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        cloudServerAdd(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    testBedAdd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        testBedAdd(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    npuServerAdd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        npuServerAdd(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    dpuServerAdd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        dpuServerAdd(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    publicServerAdd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        publicServerAdd(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 查询订单信息
    orderInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        orderInfo(obj)
          .then(response => {
            if (response && response.data) {
              commit('SET_OrderAdd', response.data)
            } else {
              commit('SET_OrderAdd', null)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default cloudServer
