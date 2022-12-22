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

/**
 * @type 文件类型，1为文件夹，2为普通文件
 */
type fileType = 1 | 2;
/**
 * @interface 请求到的文件类型接口
 */
export interface LinFileItem {
	/**
	 * @description 文件名
	 */
	fileName: string;
	/**
	 * @description 文件类型
	 */
	type: fileType;
	/**
	 * @description 文件大小
	 */
	fileSize: string | number;
	/**
	 * @description 创建时间
	 */
	createTime: string;
	/**
	 * @description 文件后缀
	 */
	suffix: string;
}
