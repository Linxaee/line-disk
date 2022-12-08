import { AxiosRequestConfig, AxiosResponse } from "axios";
// 响应拦截器默认采用AxiosResponse类型，如传入
export interface LinInterceptors<T = AxiosResponse> {
	reqInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	reqInterceptorCatch?: (error: any) => any;
	resInterceptor?: (res: T) => T;
	resInterceptorCatch?: (error: any) => any;
}
export interface LinReqConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: LinInterceptors<T>;
}
