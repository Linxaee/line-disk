import { IDropDownConfig } from "@/components/linDropDown";
export const dropDownConfig: IDropDownConfig = {
	trigger: "click",
	size: "large",
	placement: "auto-start",
	dropDownItemList: [
		{
			icon: "",
			context: "添加到文件",
			type: 2,
		},
		{
			icon: "DocumentAdd",
			context: "上传文件",
			type: 1,
		},
		{
			icon: "FolderAdd",
			context: "上传文件夹",
			type: 1,
		},
		{
			icon: "Folder",
			context: "新建文件夹",
			type: 1,
		},
		{
			icon: "",
			context: "添加到相簿",
			type: 2,
		},
		{
			icon: "Picture",
			context: "上传照片/视频",
			type: 1,
		},
		{
			icon: "FolderAdd",
			context: "上传照片文件夹",
			type: 1,
		},
	],
};
