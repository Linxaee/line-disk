import { LinResponse } from "../requests/types";
/**
 * @interface 跟文件操作有关的后台接口
 */
export interface filesApis {
	// 获取文件列表
	getFileList: () => Promise<LinResponse>;
	// 获取某文件夹文件列表
	getFolderFileList: (folderId: number) => Promise<LinResponse>;
	// 获取文件列表
	getRecycleFileList: () => Promise<LinResponse>;
	// 创建文件夹
	createFolder: (foldername: string, folderId: number) => Promise<LinResponse>;
	// 文件送入回收站
	fileIntoRecycle: (idList: number[], headers?: Record<string, any>) => Promise<LinResponse>;
	// 文件移出回收站
	fileOutRecycle: (idList: number[], headers?: Record<string, any>) => Promise<LinResponse>;
	// 彻底删除文件
	deleteFile: (idList: number[], headers?: Record<string, any>) => Promise<LinResponse>;
}
