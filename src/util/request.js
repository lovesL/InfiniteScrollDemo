import { extend } from 'umi-request';
import nscRequest from '@/lib/nsc-request';
import { Toast } from 'antd-mobile';
import { history } from 'umi';

const request = extend({
  timeout: 5000,
  timeoutMessage: '响应超时，请检查网络',
  errorHandler: (error) => {
    // 集中处理错误
    console.log(error);
  },
});

nscRequest.init({
  // sysId, is required
  sysId: 'eawcs',

  // global axios or an axios instance
  httpInstance: request,

  // required. pass any channel identifier of your client
  channel: 'web',

  // skip request outside of this origin in axios interceptor
  // 默认值为 window.location.origin
  // origin: 'https://frmc.yunget.com',

  // default as true. If it's true, will inject xhr prototype to handle file upload
  handleUpload: true,

  // if you are using different http lib, you may need to give an headersSetter and an interceptorSetter function
  headersSetter: ({ headers, key, value }) => (headers[key] = value),
  interceptorSetter: ({ instance, interceptor }) =>
    instance.interceptors.request.use(interceptor),
});

request.interceptors.request.use((url, options) => {
  return {
    ...options,
  };
});

let lock = true;
request.interceptors.response.use(async (response, options) => {
  if (response && response.status === 200) {
    if (response.headers.get('content-type') === 'image/svg+xml') {
      return response.clone().text();
    }
    const result = await response.clone().json();
    if (result.statusCode === -2) {
      if (lock) {
        lock = false;
        Toast.show({
          content: '用户凭证过期,请重新登陆!',
        });
        localStorage.clear();
        history.replace('/');
      }
    } else if (result.statusCode === -1) {
      Toast.show({
        icon: 'fail',
        content: '系统错误',
        duration: 6000,
      });
    }
  }
  return response;
});

export default request;
