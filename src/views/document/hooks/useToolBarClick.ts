import appStore from "@/store";
export function useToolBarClick() {
	const documentStore = appStore.documentStore;
	/**
	 * @desc 清除多选
	 */
	const handleCancelSelect = () => {
		documentStore.selectedFileList = [];
		documentStore.clearSelectedFileList();
	};

	return { handleCancelSelect };
}
