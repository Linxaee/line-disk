import { deleteFile, fileOutRecycle } from "@/api";
import appStore from "@/store";
const indexStore = appStore.indexStore;
export function useToolBarClick() {
	const subDocumentStore = appStore.subDocumentStore;
	/**
	 * @description 清除多选
	 */
	const handleCancelSelect = () => {
		subDocumentStore.clearSelectedFileList();
	};

	const handleDelete = async () => {
		ElMessageBox.confirm("彻底删除的文件不支持找回，是否彻底删除？", "彻底删除文件", {
			confirmButtonText: "彻底删除",
			confirmButtonClass: "BtnDelete",
			cancelButtonText: "取消",
			type: "warning",
		}).then(async () => {
			const idList: number[] = [];
			subDocumentStore.selectedRecycleList.forEach((item) => {
				idList.push(item.fileId);
			});
			const res = await deleteFile(idList);
			if (res.code === 0) {
				subDocumentStore.clearSelectedFileList();
				ElMessage({
					type: "success",
					message: res.message,
				});
			} else {
				subDocumentStore.clearSelectedFileList();
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

	const handleRecover = async () => {
		ElMessageBox.confirm("是否恢复文件？", "恢复文件", {
			confirmButtonText: "恢复",
			cancelButtonText: "取消",
			type: "warning",
		}).then(async () => {
			const idList: number[] = [];
			subDocumentStore.selectedRecycleList.forEach((item) => {
				idList.push(item.fileId);
			});
			const res = await fileOutRecycle(idList);
			if (res.code === 0) {
				subDocumentStore.clearSelectedFileList();
				ElMessage({
					type: "success",
					message: res.message,
				});
			} else {
				subDocumentStore.clearSelectedFileList();
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
	return { handleCancelSelect, handleDelete, handleRecover };
}
