import appStore from "@/store";
import LinTable from "@/components/linTable";
import { onMounted, ref } from "vue";
import { getRecycleFileList } from "@/api";
import { LinFileItem } from "@/api/requests/types";

export function useTableData() {
	const isEmpty = ref(true);
	// 取到table实例对象,
	const linTableRef = ref<InstanceType<typeof LinTable>>();
	// 取出documentStore
	const subDocumentStore = appStore.subDocumentStore;
	// table数据来源
	let tableData = ref<LinFileItem[]>([]);

	/**
	 * @description 选择数组改变后储存到store中
	 * @param files 被选择的文件
	 */
	const handleSelectionChange = (files: LinFileItem[]) => {
		subDocumentStore.selectedRecycleList = files;
	};

	// mounted时ref(table实例对象)才有值，才能进行赋值
	onMounted(async () => {
		// 将linTable上的清除选项方法存入store中
		subDocumentStore.clearSelectedFileList = linTableRef.value?.clearSelection as any;
		// 获取现有文件列表
		const data = await getRecycleFileList();
		// 现有文件列表存入store
		subDocumentStore.recycleFileList = (data as any).fileList;
		// 现有文件列表存入tableData
		tableData.value = (data as any).fileList;
	});

	return { isEmpty, tableData, linTableRef, handleSelectionChange };
}
