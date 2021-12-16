import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'super', 'admin1']
// 强硬要求 ant.design 相同密码
// const password = ['8914de686ab28dc22f30d3d8e107ff6c', '21232f297a57a5a743894a0e4a801fc3'] // admin, ant.design
const password = ['admin', 'ant.design']

const login = options => {
  const body = getBody(options)
  const lpassword = body.password
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(lpassword)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  let data = null
  data = builder(
    {
      username: 'admin',
      id: 'admin1',
      name: '鹤岗站',
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      last_login_ip: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      accessToken: '4291d7da9005377ec9aec4a71ea8222'
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )

  return data
}

const loginMobile = options => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder(
    {
      username: 'admin',
      id: 'admin1',
      name: '鹤岗站',
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      last_login_ip: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      accessToken: '4291d7da9005377ec9aec4a71ea8222'
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const sysCaptcha = () => {
  return builder({ captcha: '', uuid: '234235' }, '获取系统验证码')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

const CheckPhoneCaptcha = () => {
  return builder({})
}

const CheckMoblieCaptcha = options => {
  const body = getBody(options)
  console.log('mock: body', body)
  return builder({})
}

const SavePassword = () => {
  return builder({})
}

const RegisterUser = () => {
  return builder(
    {
      id: '43y5yu67i86',
      accessToken: '4291d7da9005377ec9aec4a71ea8222'
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}
// Mock.mock(/\/auth\/login/, 'post', login)
// 账号密码登陆
Mock.mock(/\/auth\/jwt\/token/, 'post', login)
// 手机号登陆
Mock.mock(/\/auth\/jwt\/loginMobile/, 'post', loginMobile)
// 手机验证码
Mock.mock(/\/system\/controller\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/logout/, 'post', logout)
// 系统验证码
Mock.mock(/\/auth\/captcha/, 'get', sysCaptcha)
// 忘记密码-手机号和验证码
Mock.mock(/\/system\/controller\/checkPhoneCaptcha/, 'post', CheckPhoneCaptcha)
// 忘记密码-手机验证码
Mock.mock(/\/system\/controller\/checkMoblieCaptcha/, 'post', CheckMoblieCaptcha)
// 重置密码的密码保存
Mock.mock(/\/system\/controller\/savePassword/, 'post', SavePassword)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
// 注册
Mock.mock(/\/auth\/jwt\/register/, 'post', RegisterUser)
