import { useVModel } from "@vueuse/core";
import { UploadFile, UploadFiles, UploadRawFile } from "../types";
import { UploadContentProps, UploadContentInstance } from "../src/linUploadContent";
import { getFileId, UploadProps } from "../src/linUpload";
import { AxiosProgressEvent } from "axios";
import { Ref, ShallowRef, ref } from "vue";
export function useUploadHandler(
	props: UploadProps,
	uploadRef: ShallowRef<UploadContentInstance | undefined>
) {
	// const uploadFiles = useVModel(
	// 	props as Omit<UploadProps, "fileList"> & { fileList: UploadFiles },
	// 	"fileList",
	// 	undefined,
	// 	{ passive: true }
	// );
	const uploadFiles: Ref<UploadFiles> = ref([]);

	const getFile = (rawFile: UploadRawFile) => {
		return uploadFiles.value.find((file) => file.uid === rawFile.uid);
	};

	const handleStart: UploadContentProps["onStart"] = (file) => {
		file.uid = getFileId();
		const uploadFile: UploadFile = {
			name: file.name,
			percentage: 0,
			status: "ready",
			size: file.size,
			raw: file,
			uid: file.uid,
		};
		uploadFiles.value.push(uploadFile);
	};

	const handleProgress: UploadContentProps["onProgress"] = (evt, rawFile) => {
		const file = getFile(rawFile!);

		if (!file) return;

		file.status = "uploading";
		file.percentage = Math.round(evt.progress! * 100);
		// console.log(`file:${file.uid}:进行了${file.percentage}%`);
		props.onProgress!(evt, file, uploadFiles.value);
	};
	const handleSuccess: UploadContentProps["onSuccess"] = (response, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;

		file.status = "success";
		file.response = response;
		props.onSuccess!(response, file, uploadFiles.value);
		// props.onChange(file, uploadFiles.value);
	};
	const handleError: UploadContentProps["onError"] = (err, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;

		console.error(err);
		file.status = "fail";
		uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
		props.onError!(err, file, uploadFiles.value);
		// props.onChange(file, uploadFiles.value);
	};
	return { handleStart, handleProgress, handleSuccess, handleError, uploadFiles };
}
