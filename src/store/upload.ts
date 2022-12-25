import { UploadFile } from "@/components/linUpload";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
const initData: Record<string, UploadFile> = {
	"1": {
		name: "哦哦哦.excel",
		percentage: 20,
		size: 45874110,
		uid: 1,
		status: "uploading",
	},
	"2": {
		name: "啊啊啊.zip",
		percentage: 30,
		size: 45874110,
		uid: 2,
		status: "uploading",
	},
};
export const useUploadStore = defineStore("upload", () => {
	const fileList = ref<Record<string, UploadFile>>(initData);
	const arrFileList = computed(() => {
		return Object.values(fileList.value);
	});
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

	return { fileList, arrFileList, addFile, deleteFile, getFile, clearFile };
});
