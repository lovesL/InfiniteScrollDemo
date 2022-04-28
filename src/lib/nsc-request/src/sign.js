import * as uuid from 'uuid';
import URL from 'url-parse';
import md5 from 'md5';
import stringify from 'json-stable-stringify';
import _ from 'lodash';

const _c = () => 'nsc(spe)';
const _d = 'cial';
const _e = () => {
	const t = 'stri';
	return t;
};

const normalizeObject = obj => JSON.parse(JSON.stringify(obj || {}));

// 将 query 中的 null 和 undefined 过滤掉，其他的值转成 string
const normalizeQuery = (query) => {
	if (!query) {
		return {};
	}

	const keys = Object.keys(query);
	const q = {};
	keys.forEach(key => {
		const v = query[key];
		if (!(v === null || v === undefined)) {
			if (_.isObject(v)) {
				q[key] = v;
			} else {
				q[key] = `${ v }`;
			}
		}
	});
	return normalizeObject(q);
};

const getContentString = ({
	path, query, body, method, timestamp, nonce, _file_buffer_md5,
}) => {

	const content = {
		method, path,
		timestamp: +timestamp, nonce,
		query: normalizeQuery(query),
		body,
		// _file_buffer_md5
	};
	return stringify(content);
};

export const sign = (request, options) => {
	const { method, url, body } = request;
	const { _file_buffer_md5 } = options || {};
	const parsedUrl = new URL(url, true);

	// query 参数可以通过拼接在 url 中，和通过 params 参数控制，
	// 所以这里将二者合并
	const query = {
		...(parsedUrl.query || {}),
		...(request.query || {})
	}

	const path = parsedUrl.pathname
	const timestamp = Date.now()
	const nonce = uuid.v1()

	return {
		signature: md5(`${ _c() }${ _d }(${ _e() })ng` + getContentString({
			path,
			query: normalizeQuery(query),
			body: {}, // normalizeObject(body), 暂时不对body进行处理
			method: method.toLowerCase(),
			timestamp, nonce,
			_file_buffer_md5,
		})),
		timestamp,
		nonce,
	}
}

export const signGetUrl = (url) => {
	const { signature, timestamp, nonce } = sign({ method: 'get', url });
	const parsed = new URL(url, true);
	parsed.query.__n = nonce;
	parsed.query.__t = timestamp;
	parsed.query.__s = signature;
	return parsed.toString();
};
