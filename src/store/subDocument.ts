import { defineStore } from "pinia";
import { ref } from "vue";
import { LinFileItem } from "@/api/requests/types";

export const useSubDocumentStore = defineStore("subDocument", () => {
	/**
	 * @description 当前展示的文件列表
	 * @TODO (做无限加载)                                                                                                                                  )
	 */
	const recycleFileList = ref([]);
	/**
	 * @description 选中的文件数组
	 */
	const selectedRecycleList = ref<LinFileItem[]>([]);

	/**
	 * @description 保存elForm上的clearSelection方法
	 */
	const clearSelectedFileList = () => {};

	return {
		recycleFileList,
		selectedRecycleList,
		clearSelectedFileList,
	};
});
