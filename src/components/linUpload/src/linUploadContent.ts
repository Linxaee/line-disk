import { NOOP } from "@/global";
import { UploadCallBacks } from "../types";
import { UploadBaseProps } from "./linUpload";
import { InferDefaults } from "@/utils";
import type UploadContent from "./linUploadContent.vue";

/**
 * @interface 传入uploadContent组件的props类型接口
 */
export interface UploadContentProps extends UploadBaseProps {
	onExceed?: UploadCallBacks["onExceed"];
	onStart?: UploadCallBacks["onStart"];
	onProgress?: UploadCallBacks["onProgress"];
	onSuccess?: UploadCallBacks["onSuccess"];
	onError?: UploadCallBacks["onError"];
}
/**
 * @description 传入uploadContent组件的props的默认值
 */
export const UploadContentPropsDefault: InferDefaults<UploadContentProps> = {
	onExceed: () => NOOP,
	onStart: () => NOOP,
	onProgress: () => NOOP,
	onSuccess: () => NOOP,
	onError: () => NOOP,
};
// uploadContent组件实例类型
export type UploadContentInstance = InstanceType<typeof UploadContent>;
