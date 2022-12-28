import appStore from "@/store";
import LinTable from "@/components/linTable";
import { onMounted, onBeforeMount, ref } from "vue";
import { getRecycleFileList } from "@/api";
import { LinFileItem } from "@/api/requests/types";

export function useTableData() {
	// 取到table实例对象,
	const linTableRef = ref<InstanceType<typeof LinTable>>();
	// 取出documentStore
	const documentStore = appStore.documentStore;
	// table数据来源
	let tableData = ref<LinFileItem[]>([]);

	/**
	 * @description 选择数组改变后储存到store中
	 * @param files 被选择的文件
	 */
	const handleSelectionChange = (files: LinFileItem[]) => {
		documentStore.selectedFileList = files;
	};

	// mounted时ref(table实例对象)才有值，才能进行赋值
	onBeforeMount(async () => {
		// 将linTable上的清除选项方法存入store中
		documentStore.clearSelectedFileList = linTableRef.value?.clearSelection as any;
		// 获取现有文件列表
		const data = await getRecycleFileList();
		// 现有文件列表存入store
		documentStore.selectedFileList = (data as any).fileList;
		console.log((data as any).fileList, documentStore.selectedFileList.length);

		// 现有文件列表存入tableData
		tableData.value = (data as any).fileList;
	});

	return { documentStore, tableData, linTableRef, handleSelectionChange };
}
