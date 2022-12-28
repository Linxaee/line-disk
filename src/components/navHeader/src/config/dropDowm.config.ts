import { IDropDownConfig } from "@/components/linDropDown";
import appStore from "@/store";
import { useItemClick } from "../hooks/useItemClick";
const { handleCreateNewFolder } = useItemClick();
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
				cut: true,
				url: "/files/uploadSingle",
				onBeforeHash(file) {
					appStore.uploadStore.addFile({ isPause: false, ...file });
				},
				onStart(file, HASH, suffix) {
					const uploadFile = appStore.uploadStore.getFile(file.uid);
					uploadFile.HASH = HASH;
					uploadFile.suffix = suffix;
				},
				onProgress: (evt, file) => {
					const curFile = appStore.uploadStore.getFile(file.uid);
					curFile.status = "uploading";
					curFile.percentage = Math.round(evt.progress! * 100);
					console.log(`${curFile.name}下了${curFile.percentage}%了`);
				},
				onSuccess(response, uploadFile, uploadFiles) {
					console.log(`${uploadFile.name}下了完了`);
					ElNotification({
						type: "success",
						message: `${uploadFile.name} 已完成传输`,
						position: "bottom-right",
						duration: 2000,
					});
					setTimeout(() => {
						appStore.uploadStore.deleteFile(uploadFile.uid);
					}, 2000);

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
		},
		{
			icon: "Folder",
			context: "新建文件夹",
			type: 1,
			clickCb: handleCreateNewFolder,
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
