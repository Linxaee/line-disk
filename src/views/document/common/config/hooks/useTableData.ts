import appStore from "@/store";
import LinTable from "@/components/linTable";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { getFileList } from "@/api";
import { LinFileItem } from "@/api/requests/types";

export function useTableData() {
	// 取到table实例对象,
	const linTableRef = ref<InstanceType<typeof LinTable>>();
	// 取出documentStore
	const documentStore = appStore.documentStore;

	/**
	 * @description 选择数组改变后储存到store中
	 * @param files 被选择的文件
	 */
	const handleSelectionChange = (files: LinFileItem[]) => {
		documentStore.selectedFileList = files;
	};

	// mounted时ref(table实例对象)才有值，才能进行赋值
	onMounted(async () => {
		// 将linTable上的清除选项方法存入store中
		documentStore.clearSelectedFileList = linTableRef.value?.clearSelection as any;
		// 获取现有文件列表
		const data = await getFileList();
		// 现有文件列表存入store
		documentStore.displayedFileList = (data as any).fileList;
	});

	onBeforeUnmount(() => {
		// 重置已选项
		documentStore.selectedFileList = [];
	});

	return { documentStore, linTableRef, handleSelectionChange };
}
