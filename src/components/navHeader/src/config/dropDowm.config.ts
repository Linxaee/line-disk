import { IDropDownConfig } from "@/components/linDropDown";
import appStore from "@/store";
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
			uploaded: true,
			uploadConfig: {
				limit: 10,
				cut: false,
				url: "/files/uploadSingle",
				onStart(file) {
					appStore.uploadStore.addFile(file);
				},
				onProgress: (evt, file) => {
					const curFile = appStore.uploadStore.getFile(file.uid);
					curFile.status = "uploading";
					curFile.percentage = Math.round(evt.progress! * 100);
					console.log(`${curFile.name}下了${curFile.percentage}%了`);
				},
				onSuccess(response, uploadFile, uploadFiles) {
					console.log(`${uploadFile.name}下了完了`);
					appStore.uploadStore.deleteFile(uploadFile.uid);
					// console.log(response);
					// console.log(uploadFile);
					// console.log(uploadFiles);
				},
			},
		},
		{
			icon: "FolderAdd",
			context: "上传文件夹",
			type: 1,
			uploaded: true,
		},
		{
			icon: "Folder",
			context: "新建文件夹",
			type: 1,
			uploaded: true,
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
			uploaded: true,
		},
		{
			icon: "FolderAdd",
			context: "上传照片文件夹",
			type: 1,
			uploaded: true,
		},
	],
};
