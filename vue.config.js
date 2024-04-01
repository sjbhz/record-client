/* eslint-disable */

const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const DIST_ROOT = process.env.dist_folder || 'dist'
const BASE_URL = '/'
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
}
const cdn = {
  dev: {
    css: [
      // 'https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css'
    ],
    js: [
    ]
  },
  build: {
    css: [
      // 'https://unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      // 'https://cdn.jsdelivr.net/npm/vue-router@3.0.3/dist/vue-router.min.js',
      // 'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      // 'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
      // 'https://unpkg.com/element-ui@2.12.0/lib/index.js'
    ]
  }
}
module.exports = {
  publicPath: BASE_URL,
  outputDir: DIST_ROOT + BASE_URL,
  productionSourceMap: false,
  configureWebpack: (config) => {
    const myConfig = {}
    myConfig.plugins = []
    return myConfig
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('_c', resolve('./src/components'))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.plugins
      .delete('prefetch')
    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  },
  devServer: {
    port: 8089,
    proxy: {
      '/lwh': {
        // target: 'http://172.20.46.31:8080',
        target: 'https://100.76.10.7:8443',
        changeOrigin: true,
        pathRewrite: {
          '^/lwh': '/'
        }
      }
    }
  }
}
