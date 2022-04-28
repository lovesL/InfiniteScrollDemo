import { inject } from './src/xhr'
import { createRequestInterceptor } from './src/http'

export const init = ({
  httpInstance,
  sysId,
  channel,
  origin = window.location.origin,
  handleUpload = true,
  headersSetter = ({ headers, key, value }) => headers[key] = value,
  interceptorSetter = ({ instance, interceptor }) => instance.interceptors.request.use(
      interceptor),
}) => {
  if (!httpInstance) {
    throw new Error('httpInstance is required')
  }

  if (!channel) {
    throw new Error('channel is required')
  }

  if (!origin) {
    throw new Error('origin is required')
  }

  if (!sysId) {
    throw new Error('sysId is required')
  }

  const reqInterceptor = createRequestInterceptor({ channel, sysId, origin, headersSetter })
  interceptorSetter({
    instance: httpInstance,
    interceptor: reqInterceptor
  })

  if (handleUpload) {
    inject({ channel, sysId })
  }
}

export default { init }
export { signGetUrl } from './src/sign';
