import request from '../../utils/request'

// 获取自己所属别人实验室的用户
export const getLabUser = () => {
  return request({
    url: '/portalsystem/laboratory/otherListUser'
  })
}
