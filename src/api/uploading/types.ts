import { LinResponse } from "../requests/types";
/**
 * @description 文件状态
 */
export enum FileStatus {
	uploading = 0,
	fail = 1,
	common = 2,
	recycling = 3,
	oss = 4,
}
/**
 * @description 文件类型
 */
export enum FileType {
	folder = 0,
	other = 1,
}
/**
 * @interface 需上传的文件信息
 */
export interface FileInfo {
	filename: string;
	fileExt: string;
	fileMD5: string;
	fileSize: number;
	fileType: FileType;
	fileStatus: FileStatus;
}
/**
 * @interface 跟文件操作有关的后台接口
 */
export interface uploadingApis {
	// 获取已上传的切片
	getAlreadyChunks: (
		HASH: string,
		suffix: string,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<LinResponse>;
	// 上传切片
	uploadChunks: (
		formData: FormData,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<LinResponse>;
	// 合并文件
	uploadMerge: (
		count: number,
		HASH: string,
		fileInfo: FileInfo,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<LinResponse>;
	// 获取文件列表
	getFileList: () => Promise<LinResponse>;
	// 获取文件列表
	getRecycleFileList: () => Promise<LinResponse>;
	// 文件送入回收站
	fileIntoRecycle: (idList: number[], headers?: Record<string, any>) => Promise<LinResponse>;
	// 彻底删除文件
	deleteFile: (idList: number[], headers?: Record<string, any>) => Promise<LinResponse>;
}
