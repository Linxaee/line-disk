import { defineStore } from "pinia";
import { ref } from "vue";
import { LinFileItem } from "@/api/requests/types";

export const useDocumentStore = defineStore("document", () => {
	/**
	 * @description 当前展示的文件列表
	 * @TODO (做无限加载)                                                                                                                                  )
	 */
	const displayedFileList = ref([]);
	/**
	 * @description 选中的文件数组
	 */
	const selectedFileList = ref<LinFileItem[]>([]);

	/**
	 * @description 保存elForm上的clearSelection方法
	 */
	const clearSelectedFileList = () => {};

	return {
		displayedFileList,
		selectedFileList,
		clearSelectedFileList,
	};
});
