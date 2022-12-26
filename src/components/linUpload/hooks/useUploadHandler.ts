import { useVModel } from "@vueuse/core";
import { UploadFile, UploadFiles, UploadRawFile } from "../types";
import { UploadContentProps, UploadContentInstance } from "../src/linUploadContent";
import { getFileId, UploadProps } from "../src/linUpload";
import { ShallowRef, ref } from "vue";
export function useUploadHandler(
	props: UploadProps,
	uploadRef: ShallowRef<UploadContentInstance | undefined>
) {
	/**
	 * @todo 完善uploadFiles为双向绑定
	 */

	// const uploadFiles = useVModel(
	// 	props as Omit<UploadProps, "fileList"> & { fileList: UploadFiles },
	// 	"fileList",
	// 	undefined,
	// 	{ passive: true }
	// );

	const uploadFiles = ref<UploadFiles>([]);

	const getFile = (rawFile: UploadRawFile) =>
		uploadFiles.value.find((file) => file.uid === rawFile.uid);

	const handleHash: UploadContentProps["onBeforeHash"] = (rawFile: UploadRawFile) => {
		const uploadFile: UploadFile = {
			name: rawFile.name,
			percentage: 0,
			status: "ready",
			size: rawFile.size,
			raw: rawFile,
			uid: rawFile.uid,
			completeCount: 0,
			uploadCount: 0,
		};
		uploadFiles.value.push(uploadFile);
		props.onBeforeHash!(uploadFile);
	};

	/**
	 * @description 文件验证完毕可以上传后传入该函数初始化，并加入uploadFiles
	 * @param file 传入的源文件
	 */
	const handleStart: UploadContentProps["onStart"] = (rawFile, HASH: string) => {
		const file = getFile(rawFile!);
		file!.HASH = HASH;
		props.onStart!(rawFile, HASH);
	};

	/**
	 * @description 文件上传过程中的回调函数，会回调自定义传入的onProgress函数
	 * @param evt axios上传过程中事件类型
	 * @param rawFile 源文件
	 * @returns
	 */
	const handleProgress: UploadContentProps["onProgress"] = (evt, rawFile) => {
		const file = getFile(rawFile!);

		if (!file) return;

		file.status = "uploading";
		file.percentage = Math.round(evt.progress! * 100);
		// console.log(`file:${file.uid}:进行了${file.percentage}%`);
		props.onProgress!(evt, file, uploadFiles.value);
	};

	/**
	 * @description 文件上传成功后的回调函数，会回调自定义传入的onSuccess函数
	 * @param response axios成功后的response
	 * @param rawFile 源文件
	 * @returns
	 */
	const handleSuccess: UploadContentProps["onSuccess"] = (response, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;

		file.status = "success";
		file.response = response;
		props.onSuccess!(response, file, uploadFiles.value);
		// props.onChange(file, uploadFiles.value);
	};

	/**
	 * @description 文件上传失败后的回调函数，会回调自定义传入的onError函数
	 * @param err axios失败后的error
	 * @param rawFile 源文件
	 * @returns
	 */
	const handleError: UploadContentProps["onError"] = (err, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;

		console.error(err);
		file.status = "fail";
		uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
		props.onError!(err, file, uploadFiles.value);
		// props.onChange(file, uploadFiles.value);
	};
	return { handleHash, handleStart, handleProgress, handleSuccess, handleError, uploadFiles };
}
