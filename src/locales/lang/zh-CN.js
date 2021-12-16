import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  message: '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',

  'layouts.usermenu.dialog.title': '提示',
  'layouts.usermenu.dialog.content': '您想要退出吗？',

  'app.setting.pagestyle': '页面样式设置',
  'app.setting.pagestyle.light': '光亮风格',
  'app.setting.pagestyle.dark': '暗黑风格',
  'app.setting.pagestyle.realdark': 'RealDark style',
  'app.setting.themecolor': '主题颜色',
  'app.setting.navigationmode': '导航栏模式',
  'app.setting.content-width': '内容宽度',
  'app.setting.fixedheader': '固定头部',
  'app.setting.fixedsidebar': '固定边注栏',
  'app.setting.sidemenu': '侧边栏菜单布局',
  'app.setting.topmenu': '顶部栏菜单布局',
  'app.setting.content-width.fixed': '固定',
  'app.setting.content-width.fluid': '适应',
  'app.setting.othersettings': '其他设置',
  'app.setting.weakmode': 'Weak Mode',
  'app.setting.copy': 'Copy Setting',
  'app.setting.loading': 'Loading theme',
  'app.setting.copyinfo': 'copy success，please replace defaultSettings in src/models/setting.js',
  'app.setting.production.hint': 'Setting panel shows in development environment only, please manually modify'
}

export default {
  ...components,
  ...locale
}
