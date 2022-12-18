import { defineStore } from "pinia";
import { ref } from "vue";
import { LinFileItem } from "@/api/requests/types";

const tableData: LinFileItem[] = [
	{
		fileName: "开卷",
		createTime: "1671340297",
		fileSize: "",
		type: 1,
		suffix: "folder",
	},
	{
		fileName: "ggggg.txt",
		createTime: "1671340587",
		fileSize: "45874",
		type: 2,
		suffix: "txt",
	},
	{
		fileName: "我的妈呀.mp3",
		createTime: "1671345441",
		fileSize: "45874",
		type: 2,
		suffix: "mp3",
	},
	{
		fileName: "离散数学.pdf",
		createTime: "1671345441",
		fileSize: "45874",
		type: 2,
		suffix: "pdf",
	},
	{
		fileName: "大数据.mp4",
		createTime: "1671345441",
		fileSize: "458755",
		type: 2,
		suffix: "mp4",
	},
];
export const useDocumentStore = defineStore("document", () => {
	const displayedFileList = ref(tableData);
	const selectedFileList = ref<LinFileItem[]>([]);

	return {
		displayedFileList,
		selectedFileList,
	};
});
