const ServerStatus = [
  {
    status: 0,
    name: '异常'
  },
  {
    status: 1,
    name: '运行'
  },
  {
    status: 2,
    name: '关机'
  },
  {
    status: 3,
    name: '正在创建'
  },
  {
    status: 4,
    name: '正在开机'
  },
  {
    status: 5,
    name: '正在关机'
  },
  {
    status: 6,
    name: '正在重启'
  }
]

export const getServerNameByStatus = status => {
  const result = ServerStatus.find(el => el.status === status)
  if (result) {
    return result.name
  } else {
    return ''
  }
}
export { ServerStatus }
