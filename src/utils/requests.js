import axios from 'axios';
import createEmitter from './emitter';

const request = (url, options = {}) => {
	const { method = 'GET' } = options;
	options.url = url;
	options.method = method;
	return request.axiosInstance.request(options);
};

// 事件总线
const events = createEmitter();
// 两种基本事件：请求前，响应后
const onBeforeRequest = (fn, scope) => events.on('onBeforeRequest', fn, scope);
const offBeforeRequest = (fn) => events.off('onBeforeRequest', fn);
const onAfterResponse = (fn, scope) => events.on('onAfterResponse', fn, scope);
const offAfterResponse = (fn) => events.off('onAfterResponse', fn);
const onHttpError = (fn, scope) => events.on('onHttpError', fn, scope);
const offHttpError = (fn) => events.off('onHttpError', fn);
// 常见 HTTP status code 和 消息
const HttpErrorMessage = {
	0: '无法连接服务',
	403: '资源拒绝访问',
	401: '未验证用户',
	504: '代理访问错误',
	500: '服务运行错误',
	404: '服务资源不存在',
	302: '登录过期'
};

const createRequest = (config) => {
	const http = axios.create(config);
	request.axiosInstance = http;
	// 对请求进行拦截
	http.interceptors.request.use(function (config) {
		// 设置token start
		let accessToken = localStorage.getItem('accessToken');
		if (accessToken && accessToken !== '') {
			config.headers['Authori-zation'] = 'Bearer ' + accessToken;
		}
		// 2xx 范围内的状态码都会触发该函数。
		events.emit('onBeforeRequest', config);
		return config;
	});
	// 对响应进行拦截
	http.interceptors.response.use(
		function (response) {
			if (response.data.errors) {
				events.emit('onHttpError', {
					status: 0,
					message: '服务器出错，请稍后再试'
				});
			}
			// 回设置token start
			// let accessToken = response.headers['authorization'];
			// if (accessToken && accessToken !== '') {
			// 	localStorage.setItem('accessToken', accessToken);
			// }
			// 2xx 范围内的状态码都会触发该函数。
			events.emit('onAfterResponse', response);
			return response;
		},
		function (error) {
			// 超出 2xx 范围的状态码都会触发该函数。
			if (error.response) {
				const { status, data } = error.response;
				if (status in HttpErrorMessage) {
					events.emit('onHttpError', {
						status,
						message: HttpErrorMessage[status],
						data
					});
				}
				return Promise.resolve(error.response);
			} else if (error.code === 'ECONNABORTED') {
				events.emit('onHttpError', {
					status: 0,
					message: '服务器连接被拒绝'
				});
			}
			return Promise.reject(error);
		}
	);
};

createRequest({ timeout: 1000 });
export {
	createRequest,
	onBeforeRequest,
	onAfterResponse,
	offBeforeRequest,
	offAfterResponse,
	onHttpError,
	offHttpError
};
export default request;
