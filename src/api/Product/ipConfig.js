import request from '@/utils/request'

const userApi = {
  ipConfigAdd: '/portalsystem/order/elasticIP/add'
}

/**
 * @param parameter
 * @returns {*}
 */
export function ipConfigAdd(parameter) {
  return request({
    url: userApi.ipConfigAdd,
    method: 'post',
    data: parameter
  })
}
