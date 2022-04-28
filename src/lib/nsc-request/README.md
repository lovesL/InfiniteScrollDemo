# 使用

## 配置

.webpackrc.js 新增 lib 配置
```js
alias: {
  'lib': path.resolve(__dirname, './src/lib'),
}
```

将 nsc-request 项目除 node_modules 之外，copy 到 对应项目中 src/lib 下，使其有 src/lib/nsc-request 目录

## 初始化

在项目最开始执行下面代码

```js
import axios from 'axios'
import nscRequest from 'lib/nsc-request' // 该引用依赖上述配置

nscRequest.init({
  // sysId, is required
  sysId: 'frmc',

  // global axios or an axios instance
  httpInstance: axios, 

  // required. pass any channel identifier of your client
  channel: 'web', 

  // skip request outside of this origin in axios interceptor
  // 默认值为 window.location.origin
  origin: 'https://frmc.yunget.com', 

  // default as true. If it's true, will inject xhr prototype to handle file upload
  handleUpload: true,

  // if you are using different http lib, you may need to give an headersSetter and an interceptorSetter function
  headersSetter: ({ headers, key, value }) => headers[key] = value,
  interceptorSetter: ({ instance, interceptor }) => instance.interceptors.request.use(interceptor)
})
```

## 使用

像往常一样，使用上述传的 axios 实例即可


# 签名算法

具体参考 `src/sign.js` 文件。

## 组装签名对象

```js
const obj = {
  timestamp: Date.now(),
  nonce: uuid.v1(), // 这里可以使用任何的唯一字符串都行，示例中使用 uuid
  ...requestQuery,
  ...requestBody
}
```

签名对象有 timestamp, nonce，请求中的 get 参数（query），和 body 共同组成。
其中 query 需要排除掉值为 null 和 undefined 的参数，其他类型均转为字符串；
其中 body 对象需要 `JSON.parse(JSON.stringify(body || {}))` 处理，避免 body 中非基础类型的值存在，比如 moment 实例；

## 签名对象装字符串

1. 对签名对象中排除掉 undefined 的属性（注意 null 值不需要排除）；
2. 对对象进行按属性名称字典排序
3. 将签名对象转成类 query 字符串 sortedParamsStr：`a=1&b=2&c=3`；
3. 排序后按照 `${method.toLowerCase()}:${requestPath}?${sortedParamsStr}`
4. 得到 objString

## 对字符串进行 md5 签名

`const signature = md5(objString)`