import appStore from "@/store";
import LinTable from "@/components/linTable";
import { onMounted, ref } from "vue";
import { getFileList } from "@/api";
import { LinFileItem } from "@/api/requests/types";

export function useTableData() {
	const linTableRef = ref<InstanceType<typeof LinTable>>();
	// 取出documentStore
	const documentStore = appStore.documentStore;
	// 表格数据来源
	let tableData = ref<LinFileItem[]>([]);

	/**
	 * @description 选择数组改变后储存到store中
	 */
	const handleSelectionChange = (files: LinFileItem[]) => {
		documentStore.selectedFileList = files;
	};

	// mounted时ref才有值，才能进行赋值
	onMounted(async () => {
		// 将linTable上的清除选项方法存入store中
		documentStore.clearSelectedFileList = linTableRef.value?.clearSelection as any;
		const data = await getFileList();
		documentStore.displayedFileList = (data as any).fileList;
		tableData.value = (data as any).fileList;
	});

	return { tableData, documentStore, linTableRef, handleSelectionChange };
}
