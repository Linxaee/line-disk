import { AxiosProgressEvent } from "axios";
export type UploadStatus = "ready" | "uploading" | "success" | "fail";
export type UploadFiles = UploadFile[];
/**
 * @interface 源文件接口，继承自File，新增uid作为标识
 */
export interface UploadRawFile extends File {
	uid: number;
}
/**
 * @interface 上传进度事件接口，继承自AxiosProgressEvent，新增percent进度标识
 */
// export interface UploadProgressEvent extends AxiosProgressEvent {
// 	percent: number;
// }
export interface UploadFile {
	name: string;
	percentage?: number;
	status: UploadStatus;
	size?: number;
	response?: unknown;
	uid: number;
	url?: string;
	raw?: UploadRawFile;
}
/**
 * @interface 上传过程中钩子回调函数接口
 */
export interface UploadCallBacks {
	onExceed: (files: File[]) => void;
	onStart: (file: UploadRawFile) => void;
	onProgress?: (evt: AxiosProgressEvent, uploadFile: UploadRawFile) => void;
	onSuccess: (response: any, uploadFile: UploadRawFile) => void;
	onError: (error: Error, uploadFile: UploadRawFile) => void;
}
