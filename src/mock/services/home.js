import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const suggestions = options => {
  const body = getBody(options)

  console.log('mock: body', body)
  const result = []
  for (let i = 1; i <= parseInt(body.pageSize); i++) {
    const status = Math.floor(Math.random() * 15) > 5 ? Mock.mock('@integer(0, 5)').toString() : (11).toString()
    result.push({
      userId: Mock.mock('@word(32)'),
      name: '管理*****员',
      title: '排版有问题',
      content: Mock.mock('@cparagraph(1, 3)'),
      status: status,
      createTime: Mock.mock('@datetime'),
      reply:
        status === '11'
          ? '您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。'
          : Math.floor(Math.random() * 15) > 7 && status !== '11'
          ? '您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。您的建议我们会在XX版本中进行优化，感谢您的宝贵建议。'
          : null,
      customerServiceName: '客服大蓝鲸',
      replyTime: Mock.mock('@datetime'),
      rewardAmount: Mock.mock('@integer(1000, 25000)')
    })
  }
  return builder(result)
}

// 账号密码登陆
Mock.mock(/\/oms\/homepage\/suggestions\/pagination/, 'post', suggestions)
