import { getFolderFileList } from "@/api";
import appStore from "@/store";
import { useRouter } from "vue-router";
export function useRowClick() {
	const router = useRouter();
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
		pushIntoCrumbs(row);
		// 取出documentStore
		const documentStore = appStore.documentStore;
		// 取出当前行文件id
		const folderId = row.fileId;
		// 获取该文件夹下对应的文件列表
		const data = await getFolderFileList(folderId);
		// 现有文件列表存入store
		documentStore.displayedFileList = (data as any).fileList;
		router.push({
			name: "folder",
			// 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
			params: { folderId },
		});
	};
	/**
	 * @description 其它文件双击事件
	 * @TODO 处理不同类型文件的双击事件
	 */
	const pushIntoCrumbs = (row: any) => {
		const navHeaderStore = appStore.navHeaderStore;
		const crumb = {
			title: row.fileName,
			...row,
		};
		navHeaderStore.pushCrumb(crumb);
	};
	const otherDbClick = (row: any, column: any, event: any) => {
		console.log("其它文件被双击");
	};
	return { handleRowDbClick };
}
