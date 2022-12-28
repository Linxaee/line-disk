import { fileIntoRecycle } from "@/api";
import appStore from "@/store";
const indexStore = appStore.indexStore;
export function useToolBarClick() {
	const documentStore = appStore.documentStore;
	/**
	 * @description 清除多选
	 */
	const handleCancelSelect = () => {
		documentStore.clearSelectedFileList();
	};

	const handleIntoRecycle = async () => {
		ElMessageBox.confirm("删除的文件可在10天内找回", "删除文件", {
			confirmButtonText: "删除文件",
			confirmButtonClass: "BtnDelete",
			cancelButtonText: "取消",
			type: "warning",
		}).then(async () => {
			const idList: number[] = [];
			documentStore.selectedFileList.forEach((item) => {
				idList.push(item.fileId);
			});
			const res = await fileIntoRecycle(idList);
			if (res.code === 0) {
				documentStore.clearSelectedFileList();
				ElMessage({
					type: "success",
					message: res.message,
				});
			} else {
				documentStore.clearSelectedFileList();
				ElMessage({
					type: "error",
					message: res.message,
				});
			}
			setTimeout(() => {
				indexStore.reloadApp();
			}, 300);
		});
	};

	return { handleCancelSelect, handleIntoRecycle };
}
