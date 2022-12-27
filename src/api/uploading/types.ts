export enum FileStatus {
	uploading = 0,
	fail = 1,
	common = 2,
	recycling = 3,
	oss = 4,
}
export enum FileType {
	folder = 0,
	other = 1,
}
export interface FileInfo {
	filename: string;
	fileExt: string;
	fileMD5: string;
	fileSize: number;
	fileType: FileType;
	fileStatus: FileStatus;
}
export interface uploadingApis {
	getAlreadyChunks: (
		HASH: string,
		suffix: string,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
	uploadChunks: (
		formData: FormData,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
	uploadMerge: (
		count: number,
		HASH: string,
		fileInfo: FileInfo,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
	getFileList: () => Promise<unknown>;
}
