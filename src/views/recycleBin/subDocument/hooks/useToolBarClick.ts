import { fileIntoRecycle } from "@/api";
import appStore from "@/store";
const indexStore = appStore.indexStore;
export function useToolBarClick() {
	const documentStore = appStore.documentStore;
	/**
	 * @description 清除多选
	 */
	const handleCancelSelect = () => {
		documentStore.selectedFileList = [];
		documentStore.clearSelectedFileList();
	};

	const handleDelete = async () => {
		ElMessageBox.confirm("删除的文件可在10天内在回收站内找回。", "删除文件", {
			confirmButtonText: "确定删除",
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
				ElMessage({
					type: "success",
					message: res.message,
				});
			} else {
				ElMessage({
					type: "error",
					message: res.message,
				});
			}
			indexStore.reloadApp();
		});
	};
	return { handleCancelSelect, handleDelete };
}
