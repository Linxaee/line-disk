import { NOOP } from "@/global";
import { UploadCallBacks } from "../types";
import { UploadBaseProps } from "./linUpload";
import { InferDefaults } from "@/utils";
import type UploadContent from "./linUploadContent.vue";
export interface UploadContentProps extends UploadBaseProps {
	onExceed?: UploadCallBacks["onExceed"];
	onStart?: UploadCallBacks["onStart"];
	onProgress?: UploadCallBacks["onProgress"];
	onSuccess?: UploadCallBacks["onSuccess"];
	onError?: UploadCallBacks["onError"];
}
export const UploadContentPropsDefault: InferDefaults<UploadContentProps> = {
	onExceed: () => NOOP,
	onStart: () => NOOP,
	onProgress: () => NOOP,
	onSuccess: () => NOOP,
	onError: () => NOOP,
};
export type UploadContentInstance = InstanceType<typeof UploadContent>;
