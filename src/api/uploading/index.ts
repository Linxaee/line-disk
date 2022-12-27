import LinRequest from "..";
import { uploadingApis } from "./types";

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
	headers?: Record<string, any>,
	options?: Record<string, any>
) => {
	return LinRequest.request({
		url: "/files/uploadMerge",
		method: "post",
		headers: headers,
		data: { count, HASH },
		...options,
	});
};
