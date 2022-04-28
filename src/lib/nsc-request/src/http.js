import { sign } from './sign'

export const createRequestInterceptor = ({ sysId, origin, channel, headersSetter }) => {
  return (url,config) => {
    config.url = url;
    // 如果调用的不是本系统的接口，则跳过
    if (
        !config.url.startsWith('/') &&
        !config.url.startsWith(origin)
    ) {
      return config;
    }

    // 一些情况 axios 中和 xhr 会重复签名，这里提供一个机会在 axios 中不做签名
    // 只要 headers 中带了 X-Ignore-Req-Sign
    if (config.headers['X-Ignore-Req-Sign']) {
      return config;
    }

    const { signature, timestamp, nonce } = sign({
      method: config.method,
      url: config.url,
      query: config.params,
      body: config.data,
    });

    const headers = {
      timestamp, nonce, signature, channel, sysId,
    }

    Object.keys(headers).forEach(key => {
      headersSetter({
        headers: config.headers,
        key,
        value: headers[key]
      })
    })

    return config
  }
}

export const createResponseInterceptor = () => {
  // TODO 处理自定义返回，自动做短信授权弹框
}
