import moment from 'moment'

// 格式化时间
export const fromNow = timeStr => {
  if (!timeStr) throw new Error('日期格式不正确')
  const date = new Date(timeStr)
  return moment(date)
    .add(-60, 'seconds')
    .fromNow()
}
