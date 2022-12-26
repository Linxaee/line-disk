import { UploadFile } from "@/components/linUpload";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
interface UploadingFile extends UploadFile {
	isPause: boolean;
}
const initData: Record<string, UploadingFile> = {
	"1": {
		name: "哦哦哦.excel",
		percentage: 20,
		size: 45874110,
		uid: 1,
		status: "uploading",
		isPause: false,
	},
	"2": {
		name: "啊啊啊.zip",
		percentage: 30,
		size: 45874110,
		uid: 2,
		status: "uploading",
		isPause: true,
	},
};
export const useUploadStore = defineStore("upload", () => {
	const fileList = ref<Record<string, UploadingFile>>({});
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
	const addFile = (file: UploadingFile) => {
		fileList.value[file.uid] = file;
	};

	return { fileList, arrFileList, addFile, deleteFile, getFile, clearFile };
});
