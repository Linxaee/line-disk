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
	// 文件id
	fileId: number;
	// 文件名
	fileName: string;
	// 文件扩展名
	fileExt: string;
	// 文件HASH
	fileMd5: string;
	// 文件大小
	fileSize: number;
	// 文件类型
	fileType: fileType;
	// 文件路径
	filePath: string;
	// 文件状态
	fileStatus: number;
	// 创建时间
	createTime: string;
	// 上传时间
	updateTime: string;
	// 删除时间
	deleteTime?: any;
	// 父亲id
	parentId?: number;
	// 是否是回收记录
	isRecycleRecord: number;
}
