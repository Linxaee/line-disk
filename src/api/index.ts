import Request from "./requests/request";
import { BASE_URL, TIME_OUT } from "./requests/config";

const LinRequest = new Request({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		// 实例拦截器携带token
		reqInterceptor(config) {
			// 携带token
			const token = localStorage.getItem("token");
			if (token) {
				config.headers!.Authorization = `Bearer ${token}`;
			}
			return config;
		},
	},
});

export default LinRequest;
