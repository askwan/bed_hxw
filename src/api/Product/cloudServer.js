import request from '@/utils/request'

const userApi = {
  dictionaryByType: '/oms/dictionary/list/item',
  stationAll: '/oms/station/list',
  externalType: '/oms/resourcepool/list/external-type',
  gpuOfStationInfo: '/oms/specConfig/all',
  multiSiteInfo: '/oms/specConfig/multiSite/same',
  specConfigId: '/oms/resourcepool/specConfigId',
  monthlyFee: '/oms/charge/monthly/fee',
  monthlyLabFee: '/oms/charge/monthly/distributeLabFee',
  hourFee: '/oms/charge/hour/fee',
  hourLabFee: '/oms/charge/hourly/distributeLabFee',
  mirroringAll: '/oms/mirroring/all',
  multiSiteMirroring: '/oms/mirroring/multiSite/same',
  availableMirror: '/oms/mirroring/multiSite/available',
  cloudServerAdd: '/portalsystem/order/cloudServer/GPU/add',
  testBedAdd: '/portalsystem/order/distributedLaboratoryBed/add',
  publicServerAdd: '/portalsystem/order/cloudServer/add',
  npuServerAdd: '/portalsystem/order/cloudServer/NPU/add',
  dpuServerAdd: '/portalsystem/order/cloudServer/DPU/add',
  orderInfo: '/portalsystem/order',
  orderPay: '/portalsystem/order/pay'
}

export function dictionaryByType(parameter) {
  return request({
    url: userApi.dictionaryByType,
    method: 'get',
    params: parameter
  })
}

export function stationAll(parameter) {
  return request({
    url: userApi.stationAll,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

/**
 * @param parameter
 * tabKeyId 计费方式
 * stationTabKeyId	站点ID
 * gpuTabKeyId	gPU类型
 * gpuName 模糊查询gPU名称
 * @returns {*}
 */
export function gpuOfStationInfo(parameter) {
  return request({
    url: userApi.gpuOfStationInfo,
    method: 'post',
    data: parameter
  })
}
/**
 * @param parameter
 * tabKeyId 计费方式
 * stationTabKeyId	站点ID
 * gpuTabKeyId	gPU类型
 * gpuName 模糊查询gPU名称
 * @returns {*}
 */
export function multiSiteInfo(parameter) {
  return request({
    url: userApi.multiSiteInfo,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * 查询产品站点对应的去重的硬件类型
 * stationId 站点id
 * status	资源池状态
 * type		资源池类型
 * productId 产品id
 * externalType  硬件类型 GPU;NETWORK;MEMORY;CPU；STORAGE
 * @returns {*}
 */
export function externalType(parameter) {
  return request({
    url: userApi.externalType,
    method: 'get',
    params: parameter
  })
}

/**
 * @param parameter
 * 根据规格id获取资源池
 * specConfigId 规格id
 * @returns {*}
 */
export function specConfigId(parameter) {
  return request({
    url: userApi.specConfigId,
    method: 'get',
    params: parameter
  })
}

/**
 * @param parameter
 * stationId	是	string	站点id
 * specConfigId	是	string	规格id
 * storageSize	是	int	存储大小 G
 * bandwidth	否	int	带宽 M
 * monthNum	是	int	月份数量
 * serverNum	是	int	服务器数量
 * publicIP	是	boolean	是否选了公网IP
 * @returns {*}
 */
export function monthlyFee(parameter) {
  return request({
    url: userApi.monthlyFee,
    method: 'post',
    data: parameter
  })
}
/**
 * @param parameter
 * stationId	是	string	站点id
 * specConfigId	是	string	规格id
 * storageSize	是	int	存储大小 G
 * bandwidth	否	int	带宽 M
 * monthNum	是	int	月份数量
 * serverNum	是	int	服务器数量
 * publicIP	是	boolean	是否选了公网IP
 * @returns {*}
 */
export function monthlyLabFee(parameter) {
  return request({
    url: userApi.monthlyLabFee,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * stationId	是	string	站点id
 * specConfigId	是	string	规格id
 * storageSize	是	int	存储大小 G
 * bandwidth	否	int	带宽 M
 * serverNum	是	int	服务器数量
 * publicIP	是	boolean	是否选了公网IP
 * @returns {*}
 */
export function hourFee(parameter) {
  return request({
    url: userApi.hourFee,
    method: 'post',
    data: parameter
  })
}
/**
 * @param parameter
 * stationId	是	string	站点id
 * specConfigId	是	string	规格id
 * storageSize	是	int	存储大小 G
 * bandwidth	否	int	带宽 M
 * serverNum	是	int	服务器数量
 * publicIP	是	boolean	是否选了公网IP
 * @returns {*}
 */
export function hourLabFee(parameter) {
  return request({
    url: userApi.hourLabFee,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function mirroringAll(parameter) {
  return request({
    url: userApi.mirroringAll,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function multiSiteMirroring(parameter) {
  return request({
    url: userApi.multiSiteMirroring,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function availableMirror(parameter) {
  return request({
    url: userApi.availableMirror,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function cloudServerAdd(parameter) {
  return request({
    url: userApi.cloudServerAdd,
    method: 'post',
    data: parameter
  })
}
/**
 * @param parameter
 * @returns {*}
 */
export function testBedAdd(parameter) {
  return request({
    url: userApi.testBedAdd,
    method: 'post',
    data: parameter
  })
}
/**
 * @param parameter
 * @returns {*}
 */
export function publicServerAdd(parameter) {
  return request({
    url: userApi.publicServerAdd,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function dpuServerAdd(parameter) {
  return request({
    url: userApi.dpuServerAdd,
    method: 'post',
    data: parameter
  })
}

/**
 * @param parameter
 * @returns {*}
 */
export function npuServerAdd(parameter) {
  return request({
    url: userApi.npuServerAdd,
    method: 'post',
    data: parameter
  })
}

// 查询订单
export function orderInfo(parameter) {
  return request({
    url: userApi.orderInfo + '/' + parameter,
    method: 'get'
  })
}

export function orderPay(parameter) {
  return request({
    url: userApi.orderPay,
    method: 'post',
    data: parameter
  })
}
