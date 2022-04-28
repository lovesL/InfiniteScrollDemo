import { defineConfig } from 'umi';
import pxToRem from 'postcss-px2rem';

const SERVER_URL = 'http://eawcs-sit.yunget.com'//测试服务

export default defineConfig({
  // chainWebpack(config,{webpack}) {
  //   const plg= new webpack.ProvidePlugin({
  //     process: 'process/browser.js',
  //   });
  //   config.plugin('record').use(plg);
  // },
  extraPostCSSPlugins:[
    pxToRem({
      remUnit: 75, // 换算的基数
      // selectorBlackList: ["am"],
      exclude: /node_modules/i,
      propList: ['*'],
      minPixelValue:1,
    })
  ],
  antd:{
    mobile:false
  },
  antdMobile: {
    hd: true
  },
  fastRefresh: {},
  hash: false,
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  proxy:{
    '/api': {
      target: SERVER_URL,
      changeOrigin: true,
    },
    '/eawcs': {
      target: SERVER_URL,
      changeOrigin: true,
    },
    '/login': {
      target: SERVER_URL,
      changeOrigin: true,
    },
    '/imageCaptcha': {
      "target": SERVER_URL,
      "changeOrigin": true
    },
  }
});
