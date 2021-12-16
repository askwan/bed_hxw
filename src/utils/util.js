export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function() {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
      console.log(event)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = s => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 千级单位转换
 * @param num 输入的数量g
 * @param unit 输入单位GB、C，输出单位TB、C
 */
export function gigabitConvert(num, unit) {
  const numtemp = parseFloat(num) || 0
  let result = numtemp
  let str = ''
  if (numtemp >= 1024) {
    result = (numtemp / 1024).toFixed(1)
  }
  let unittemp = unit
  if (result !== numtemp) {
    switch (unittemp) {
      case 'GB':
        unittemp = 'TB'
        break
      case 'C':
        unittemp = 'GC'
        break
    }
  }
  str = result + ' ' + unittemp
  return str
}

/**
 * 参数说明：
 * number：要格式化的数字
 * decimals：保留几位小数
 * decPoint：小数点符号
 * thousandsSep：千分位符号
 */
export function numberFormat(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number

  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''
  const toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec)
    return '' + Math.floor(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  console.log(s)
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * formatNumber(num)
 * 功能：数字按千位逗号分割
 * 返回：返回格式化后的数值字符串.
 */
export function formatNumber(num) {
  let result = ''
  const numArr = (num + '').split('.')
  let int = numArr[0]
  const decmial = numArr[1] ? '.' + numArr[1] : ''
  while (int.length > 3) {
    result = ',' + int.slice(-3) + result
    int = int.slice(0, int.length - 3)
  }
  if (int) {
    result = int + result
  }
  return result + decmial
}

/**
 * 参数说明：
 * separator：分割符号
 */
export function getUUID(separator = '-') {
  var guidGenerator = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    guidGenerator() +
    guidGenerator() +
    separator +
    guidGenerator() +
    guidGenerator() +
    separator +
    guidGenerator() +
    guidGenerator() +
    separator +
    guidGenerator() +
    guidGenerator()
  )
}
