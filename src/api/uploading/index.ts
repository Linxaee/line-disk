import LinRequest from "..";
import { uploadingApis, FileInfo } from "./types";
export * from "./types";
/**
 * @description 获取已上传切片
 * @param HASH 文件HASH值
 * @param suffix 文件后缀
 * @param headers 请求头
 * @returns
 */
export const getAlreadyChunks: uploadingApis["getAlreadyChunks"] = (
	HASH: string,
	suffix: string,
	headers?: Record<string, any>,
	options?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/uploadAlready",
		method: "get",
		headers,
		params: {
			HASH,
			suffix,
		},
		...options,
	});
};

/**
 * @description 上传切片
 * @param formData 包含切片的formData
 * @param headers 请求头
 * @returns
 */
export const uploadChunks: uploadingApis["uploadChunks"] = (
	formData: FormData,
	headers?: Record<string, any>,
	options?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/uploadChunks",
		method: "post",
		headers: headers,
		data: formData,
		...options,
	});
};

/**
 * @description 合并请求
 * @param count 要合并的切片数量
 * @param HASH 文件HASH
 * @param headers 请求头
 * @returns
 */
export const uploadMerge: uploadingApis["uploadMerge"] = (
	count: number,
	HASH: string,
	fileInfo: FileInfo,
	headers?: Record<string, any>,
	options?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/uploadMerge",
		method: "post",
		headers: headers,
		data: { count, HASH, ...fileInfo },
		...options,
	});
};

/**
 * @description 获取现有文件列表
 * @returns
 */
export const getFileList: uploadingApis["getFileList"] = () => {
	return LinRequest.request({
		url: "/files/getFileList",
		method: "get",
	});
};

/**
 * @description 获取回收站文件列表
 * @returns
 */
export const getRecycleFileList: uploadingApis["getRecycleFileList"] = () => {
	return LinRequest.request({
		url: "/files/getRecycleFileList",
		method: "get",
	});
};

/**
 * @description 创建文件夹
 * @returns
 */
export const createFolder: uploadingApis["createFolder"] = (foldername: string) => {
	return LinRequest.request({
		url: "/files/createFolder",
		method: "post",
		params: { foldername },
	});
};

/**
 * @description 文件收入回收站
 * @returns
 */
export const fileIntoRecycle: uploadingApis["fileIntoRecycle"] = (
	idList: number[],
	headers?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/fileIntoRecycle",
		method: "post",
		headers,
		params: { idList },
	});
};

/**
 * @description 文件移出回收站
 * @returns
 */
export const fileOutRecycle: uploadingApis["fileOutRecycle"] = (
	idList: number[],
	headers?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/fileOutRecycle",
		method: "post",
		headers,
		params: { idList },
	});
};

/**
 * @description 文件彻底删除
 * @returns
 */
export const deleteFile: uploadingApis["deleteFile"] = (
	idList: number[],
	headers?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/deleteFile",
		method: "post",
		headers,
		params: { idList },
	});
};
