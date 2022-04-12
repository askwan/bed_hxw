import request from '@/utils/request'

const homeApi = {
  production: '/oms/homepage/products/pagination',
}

export function production(parameter) {
  return request({
    url: homeApi.production,
    method: 'post',
    data: parameter
  })
}
