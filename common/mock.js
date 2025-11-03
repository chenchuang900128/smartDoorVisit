// 轻量 Mock 层：在后端未就绪时拦截 uni.request 返回模拟数据

import ALLURL from '@/common/allUrl.js'

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function matchPath(url) {
	// 统一处理为不带域名的路径匹配
	try {
		const u = new URL(url, ALLURL.baseURL);
		return u.pathname;
	} catch (e) {
		return url;
	}
}

export function installMock() {
	if (!ALLURL.MOCK) return;
	if (installMock._installed) return;
	installMock._installed = true;

	const originalRequest = uni.request;

	uni.request = function(options) {
		const path = matchPath(options.url || '');

		const respond = (payload) => {
			if (typeof options.success === 'function') {
				options.success({ data: payload, statusCode: 200 });
			}
			if (typeof options.complete === 'function') {
				options.complete({ data: payload, statusCode: 200 });
			}
		};

		const respondFail = () => {
			if (typeof options.fail === 'function') {
				options.fail({ errMsg: 'mock network error' });
			}
			if (typeof options.complete === 'function') {
				options.complete({ errMsg: 'mock network error' });
			}
		};

		// 合同查询（个人）
		if (path === '/zjzl/a/info/zjLogin/GIHSSContQuery') {
			return (async () => {
				await delay(300);
				respond({ code: 0, msg: 'ok', data: { fyid: 'FYID-MOCK-001' } });
			})();
		}

		// 合同查询（单位兜底）
		if (path === '/zjzl/SK/json/Z027') {
			return (async () => {
				await delay(300);
				respond({ code: 0, msg: 'ok', data: { fycode: 'FYCODE-MOCK-001' } });
			})();
		}

		// 添加访客
		if (path === ALLURL.KTradeid_addVisit) {
			return (async () => {
				await delay(400);
				// 返回二维码文本
				respond({ code: 0, msg: 'ok', data: 'MOCK_QR_CODE_123456' });
			})();
		}

		// 访客记录列表
		if (path === ALLURL.KTradeid_visitList) {
			return (async () => {
				await delay(350);
				const now = new Date();
				const format = (d) => {
					const y = d.getFullYear();
					const m = String(d.getMonth() + 1).padStart(2, '0');
					const day = String(d.getDate()).padStart(2, '0');
					return `${y}-${m}-${day} 00:00:00`;
				};
				const data = [
					{ visitorId: 'V' + Date.now(), name: '张三', phone: '13800000001', visitingNum: '1', visitingReason: '送货上门', visitingTime: format(now) },
					{ visitorId: 'V' + (Date.now() - 1), name: '李四', phone: '13800000002', visitingNum: '2', visitingReason: '朋友来访', visitingTime: format(new Date(now.getTime() + 86400000)) },
				];
				respond({ code: 0, msg: 'ok', data });
			})();
		}

		// 其他未知请求走原逻辑
		return originalRequest.call(uni, options);
	};
}


