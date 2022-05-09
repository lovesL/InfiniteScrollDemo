const SERVER_URL = ''; //测试服务

export default {
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
    target: SERVER_URL,
    changeOrigin: true,
  },
};
