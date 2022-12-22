import { InferDefaults } from "@/utils";
import { UploadCallBacks, UploadFile, UploadFiles, UploadRawFile } from "../types";
import { AxiosProgressEvent } from "axios";
import { NOOP } from "@/global";
let fileId = 1;
export const getFileId = () => Date.now() + fileId++;

export interface UploadBaseProps {
	url?: string;
	method?: string;
	multiple?: boolean;
	accept?: string;
	limit?: number;
	cut?: boolean;
	headers?: Record<string, any>;
}
export const UploadBasePropsDefault: InferDefaults<UploadBaseProps> = {
	url: "#",
	method: "post",
	multiple: true,
	accept: "",
	limit: 3,
	cut: false,
	headers: () => ({ "Content-Type": "application/x-www-form-urlencoded" }),
};

export interface UploadProps extends UploadBaseProps {
	onExceed?: UploadCallBacks["onExceed"];
	onProgress?: (
		evt: AxiosProgressEvent,
		uploadFile: UploadFile,
		uploadFiles: UploadFiles
	) => void;
	onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => unknown;
	onError?: (err: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
}
export const UploadPropsDefault: InferDefaults<UploadProps> = {
	...UploadBasePropsDefault,
	onExceed: () => NOOP,
	onProgress: () => NOOP,
	onSuccess: () => NOOP,
	onError: () => NOOP,
};
