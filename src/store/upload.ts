import { UploadFile } from "@/components/linUpload";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useUploadStore = defineStore("upload", () => {
	const fileList = ref<Record<string, UploadFile>>({});

	const deleteFile = (uid: number) => {
		delete fileList.value[uid];
	};
	const getFile = (uid: number) => {
		return fileList.value[uid];
	};
	const clearFile = () => {
		fileList.value = {};
	};
	const addFile = (file: UploadFile) => {
		fileList.value[file.uid] = file;
	};

	return { fileList, addFile, deleteFile, getFile, clearFile };
});
