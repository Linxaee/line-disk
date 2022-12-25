import { defineStore } from "pinia";
import { ref } from "vue";
import { LinFileItem } from "@/api/requests/types";

const tableData: LinFileItem[] = [
	{
		fileName: "开卷",
		createTime: "1671340297",
		fileSize: "",
		type: 1,
	},
	{
		fileName: "ggggg.txt",
		createTime: "1671340587",
		fileSize: "45874",
		type: 2,
	},
	{
		fileName: "我的妈呀.mp3",
		createTime: "1671345441",
		fileSize: "45874",
		type: 2,
	},
	{
		fileName: "离散数学.pdf",
		createTime: "1671345441",
		fileSize: "45874",
		type: 2,
	},
	{
		fileName: "大数据.mp4",
		createTime: "1671345441",
		fileSize: "458755",
		type: 2,
	},
];
export const useDocumentStore = defineStore("document", () => {
	/**
	 * @description 当前展示的文件列表
	 * @TODO 从后端获取真实数据(服务端还没写)(做无限加载)                                                                                                                                  )
	 */
	const displayedFileList = ref(tableData);
	/**
	 * @description 选中的文件数组
	 */
	const selectedFileList = ref<LinFileItem[]>([]);

	/**
	 * @description 保存elForm上的clearSelection方法
	 */
	const clearSelectedFileList = () => {};

	return {
		displayedFileList,
		selectedFileList,
		clearSelectedFileList,
	};
});
