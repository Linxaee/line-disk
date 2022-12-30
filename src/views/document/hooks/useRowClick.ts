import { getFolderFileList } from "@/api";
import appStore from "@/store";
export function useRowClick() {
	/**
	 * @description 处理某行双击事件
	 * @param row 该行信息
	 * @param column 该列信息
	 * @param event 点击事件
	 */
	const handleRowDbClick = (row: any, column: any, event: any) => {
		return row.fileType === 1
			? folderDbClick(row, column, event)
			: otherDbClick(row, column, event);
	};
	/**
	 * @description 文件夹双击事件
	 */
	const folderDbClick = async (row: any, column: any, event: any) => {
		// 取出documentStore
		const documentStore = appStore.documentStore;
		// 取出当前行文件id
		const folderId = row.fileId;
		// 获取该文件夹下对应的文件列表
		const data = await getFolderFileList(folderId);
		// 现有文件列表存入store
		documentStore.displayedFileList = (data as any).fileList;
	};
	/**
	 * @description 其它文件双击事件
	 * @TODO 处理不同类型文件的双击事件
	 */
	const otherDbClick = (row: any, column: any, event: any) => {
		console.log("其它文件被双击");
	};
	return { handleRowDbClick };
}
