import appStore from "@/store";
import LinTable from "@/components/linTable";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { getFolderFileList } from "@/api";
import { LinFileItem } from "@/api/requests/types";
import { useRoute } from "vue-router";

export function useTableData() {
	// 取出route对象
	const route = useRoute();

	// 取出table实例对象,
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

	const getData = async () => {
		const { folderId } = route.params;
		// 将linTable上的清除选项方法存入store中
		documentStore.clearSelectedFileList = linTableRef.value?.clearSelection as any;
		// 获取该文件夹下对应的文件列表
		const data = await getFolderFileList(parseInt(folderId as string));
		// 现有文件列表存入store
		documentStore.displayedFileList = (data as any).fileList;
	};
	// mounted时ref(table实例对象)才有值，才能进行赋值
	onMounted(async () => {
		getData();
	});

	onBeforeUnmount(() => {
		// 重置已选项
		documentStore.selectedFileList = [];
	});

	// 监测路由，进入文件夹则重新请求数据
	watch(
		() => route,
		() => {
			getData();
		},
		{
			deep: true,
		}
	);
	return { documentStore, linTableRef, handleSelectionChange };
}
