const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const { name } = require('./package')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// eslint-disable-next-line
const isProd = process.env.NODE_ENV === 'production'
const baseUrl = process.env.VUE_APP_BASE_URL
// const publicPath = '/child/' + baseUrl.split('/sub/')[1]
// const baseUrl = '/'

// const assetsCDN = {
//   // webpack build externals
//   externals: {
//     vue: 'Vue',
//     'vue-router': 'VueRouter',
//     vuex: 'Vuex',
//     axios: 'axios'
//   },
//   css: [],
//   // https://unpkg.com/browse/vue@2.6.11/
//   js: [
//     '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
//     '//cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
//     '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
//     '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
//   ]
// }

const port = 6062
// vue.config.js
const vueConfig = {
  outputDir: '../temp/dist' + baseUrl,
  // publicPath: isProd ? baseUrl : '/',
  publicPath: baseUrl,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
    ],
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {},
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[bed1]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

    // YS，不能开启js cdn，qiankun框架在cdn部署情况下现在有bug
    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          'primary-color': '#33b0ed',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port,
    proxy: {
      // ===================================智能核心网===================
      '/api/restconf': {
        target: 'http://192.168.107.2:30088/api/restconf',
        changeOrigin: true,
        pathRewrite: {
          '^/api/restconf': ''
        }
      },
      // ===================================智能核心网===================
      '/api': {
        // target: 'http://172.16.31.11',
        target: 'http://192.168.107.2:30170',
        ws: false,
        changeOrigin: true
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig