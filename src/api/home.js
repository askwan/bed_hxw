import request from '@/utils/request'

const homeApi = {
  resourceVal: '/oms/homepage/resource-amount',
  news: '/oms/homepage/news/pagination',
  contribution: '/portalsystem/homepage/contributions/pagination',
  suggestion: '/oms/homepage/suggestions/pagination',
  production: '/oms/homepage/products/pagination',
  // production: '/oms/homepage/products',
  topsuggestion: '/oms/suggestion/suggestions/self',
  statisticPageView: '/portalsystem/omsPersonalStatistic/statisticPageView'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function resourceList() {
  return request({
    url: homeApi.resourceVal,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function newsList(parameter) {
  return request({
    url: homeApi.news,
    method: 'post',
    data: parameter
  })
}
export function contribution(parameter) {
  return request({
    url: homeApi.contribution,
    method: 'post',
    data: parameter
  })
}
export function suggestion(parameter) {
  return request({
    url: homeApi.suggestion,
    method: 'post',
    data: parameter
  })
}
// export function production() {
//   return request({
//     url: homeApi.production,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
export function production(parameter) {
  return request({
    url: homeApi.production,
    method: 'post',
    data: parameter
  })
}
export function topsuggestion(parameter) {
  return request({
    url: homeApi.topsuggestion,
    method: 'post',
    data: parameter
  })
}
/**
 * 访问量相关统计
 */
export function statisticPageView() {
  return request({
    url: homeApi.statisticPageView,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
