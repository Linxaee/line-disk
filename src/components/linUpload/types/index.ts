import { AxiosProgressEvent } from "axios";
export type UploadStatus = "ready" | "uploading" | "success" | "fail";
export type UploadFiles = UploadFile[];
/**
 * @interface 源文件接口，继承自File，新增uid作为唯一标识
 */
export interface UploadRawFile extends File {
	uid: number;
}
/**
 * @interface 自定义上传文件类型接口
 */
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
 * @interface 传入uploadContent的回调函数类型接口
 */
export interface UploadCallBacks {
	onExceed: (files: File[]) => void;
	onStart: (file: UploadRawFile) => void;
	onProgress?: (evt: AxiosProgressEvent, uploadFile: UploadRawFile) => void;
	onSuccess: (response: any, uploadFile: UploadRawFile) => void;
	onError: (error: Error, uploadFile: UploadRawFile) => void;
}
