import LinRequest from "..";
import { filesApis } from "./types";
export * from "./types";
/**
 * @description 获取现有文件列表
 * @returns
 */
export const getFileList: filesApis["getFileList"] = () => {
	return LinRequest.request({
		url: "/files/getFileList",
		method: "get",
	});
};

/**
 * @description 获取某文件夹现有文件列表
 * @returns
 */
export const getFolderFileList: filesApis["getFolderFileList"] = (folderId) => {
	return LinRequest.request({
		url: "/files/getFolderFileList",
		method: "get",
		params: { folderId },
	});
};

/**
 * @description 获取回收站文件列表
 * @returns
 */
export const getRecycleFileList: filesApis["getRecycleFileList"] = () => {
	return LinRequest.request({
		url: "/files/getRecycleFileList",
		method: "get",
	});
};

/**
 * @description 创建文件夹
 * @returns
 */
export const createFolder: filesApis["createFolder"] = (foldername: string, folderId: number) => {
	return LinRequest.request({
		url: "/files/createFolder",
		method: "post",
		params: { foldername, folderId },
	});
};

/**
 * @description 文件收入回收站
 * @returns
 */
export const fileIntoRecycle: filesApis["fileIntoRecycle"] = (
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
export const fileOutRecycle: filesApis["fileOutRecycle"] = (
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
export const deleteFile: filesApis["deleteFile"] = (
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
