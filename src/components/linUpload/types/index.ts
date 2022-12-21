export type UploadStatus = "ready" | "uploading" | "success" | "fail";
export type UploadFiles = UploadFile[];
export interface UploadRawFile extends File {
	uid: number;
}
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
export interface uploadCallBacks {
	onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
	onError: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
	onExceed: (files: File[]) => void;
}
