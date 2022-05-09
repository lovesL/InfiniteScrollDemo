import { defineConfig } from 'umi';
import pxToRem from 'postcss-px2rem';
import routes from './router';
import proxy from './proxy';

export default defineConfig({
  // chainWebpack(config,{webpack}) {
  //   const plg= new webpack.ProvidePlugin({
  //     process: 'process/browser.js',
  //   });
  //   config.plugin('record').use(plg);
  // },
  extraPostCSSPlugins: [
    pxToRem({
      remUnit: 75, // 换算的基数
      // selectorBlackList: ["am"],
      exclude: /node_modules/i,
      propList: ['*'],
      minPixelValue: 2,
    }),
  ],
  antd: {
    mobile: false,
  },
  antdMobile: {
    hd: true,
  },
  fastRefresh: {},
  hash: false,
  routes: routes,
  proxy: proxy,
});
