// common/request.js
import config from './config.js';

const request = (options) => {
	return new Promise((resolve, reject) => {
		// 1. 获取本地存储的 Token
		const token = uni.getStorageSync('token');

		// 2. 组装 Header
		let header = {
			...options.header
		};
		
		// 如果有 Token，自动加到 Header 里 (对应后端 auth.py 的验证逻辑)
		if (token) {
			header['Authorization'] = 'Bearer ' + token;
		}

		// 3. 发起请求
		uni.request({
			url: config.BASE_URL + options.url, // 自动拼接 http://192.168...
			method: options.method || 'GET',
			data: options.data || {},
			header: header,
			success: (res) => {
				// 4. 统一处理状态码
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data);
				} else if (res.statusCode === 401) {
					// 401 代表 Token 过期或未登录
					uni.removeStorageSync('token');
					uni.showToast({ title: '登录已过期', icon: 'none' });
					setTimeout(() => {
						uni.reLaunch({ url: '/pages/login/login' });
					}, 1500);
					reject(res);
				} else {
					uni.showToast({ title: res.data.detail || '请求失败', icon: 'none' });
					reject(res);
				}
			},
			fail: (err) => {
				uni.showToast({ title: '无法连接服务器', icon: 'none' });
				reject(err);
			}
		});
	});
}

export default request;