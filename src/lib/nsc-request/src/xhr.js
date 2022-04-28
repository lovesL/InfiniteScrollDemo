import { sign } from './sign'
import md5 from 'md5'
// 拦截 xhr。一些 upload 使用 xhr，所以只拦截 axios 是不够的
// 注1：axios 是基于 xhr 实现的，这里会考虑重复的问题
const INJECTOR_PROPERTY = '__nsc_xhr__'
const xhrPrototype = XMLHttpRequest.prototype
const isFormData = val => {
  return (typeof FormData !== 'undefined') && (val instanceof FormData)
}

export const inject = ({ sysId, channel }) => {
	if (xhrPrototype[INJECTOR_PROPERTY]) {
		
		return
	}

	const { open, send } = xhrPrototype
	
	xhrPrototype.open = function () {
		const [method, url] = arguments
		this[`${INJECTOR_PROPERTY}method`] = method
		this[`${INJECTOR_PROPERTY}url`] = url
		return open.apply(this, arguments)
	}

	xhrPrototype.send = async function () {
		const body = arguments[0]
		let uploadFile = null

		if (isFormData(body)) {
			uploadFile = Array.from(body.values()).find(v => v instanceof File)
		}

		// 这里只针对上传做处理，其他情况 axios interceptors 来处理
		if (uploadFile) {
			const arrayBuffer = await uploadFile.arrayBuffer()
			const { timestamp, nonce, signature } = sign({
				method: this[`${INJECTOR_PROPERTY}method`],
				url: this[`${INJECTOR_PROPERTY}url`],
				query: null,
				body
			}, { _file_buffer_md5: md5(arrayBuffer) })
			this.setRequestHeader('timestamp', timestamp)
			this.setRequestHeader('nonce', nonce)
			this.setRequestHeader('signature', signature)
			this.setRequestHeader('channel', channel)
			this.setRequestHeader('sysId', sysId)
		}

		return send.apply(this, arguments)
	}

	xhrPrototype[INJECTOR_PROPERTY] = true
}

