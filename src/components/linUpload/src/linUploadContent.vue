<template>
	<div class="linUploadContent" @click="handleClick">
		<slot></slot>
		<input
			ref="inputRef"
			class="inputEl"
			:multiple="multiple"
			:webkitdirectory="webkitdirectory"
			type="file"
			:accept="accept"
			@change="handleChange"
			@click.stop
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UploadCallBacks, UploadRawFile } from "../types/index";
import { getFileId } from "./linUpload";
import { useFileUpload } from "../hooks/useUploadFiles";
import { UploadContentPropsDefault } from "./linUploadContent";
import { convertArrayToObject, FolderFile } from "@/utils/convertArrayToObject";
import { createFolder } from "@/api";

import appStore from "@/store";

const props = withDefaults(
	defineProps<{
		url?: string;
		method?: string;
		multiple?: boolean;
		webkitdirectory?: boolean;
		accept?: string;
		limit?: number;
		cut?: boolean;
		headers?: Record<string, any>;
		onExceed?: UploadCallBacks["onExceed"];
		onBeforeHash?: UploadCallBacks["onBeforeHash"];
		onStart?: UploadCallBacks["onStart"];
		onProgress?: UploadCallBacks["onProgress"];
		onSuccess?: UploadCallBacks["onSuccess"];
		onError?: UploadCallBacks["onError"];
	}>(),
	{
		...UploadContentPropsDefault,
	}
);

const inputRef = ref<HTMLInputElement>();

const { uploadSingle, getFileHASH, getAlready, sliceFile, uploadChunk } = useFileUpload(props);

const indexStore = appStore.indexStore;

const handleClick = () => {
	// 重置选择内容并调用点击
	inputRef.value!.value = "";
	inputRef.value!.click();
};

const handleChange = (e: Event) => {
	const files = (e.target as HTMLInputElement).files;
	// narrow
	if (!files) return;
	// 调用文件上传文件夹函数
	if (props.webkitdirectory) {
		return uploadFolder(convertArrayToObject(files));
	}
	// 调用文件上传函数
	uploadFiles(Array.from(files));
};

const uploadFolder = async (fileArr: FolderFile[]) => {
	const { cut, limit, onExceed, onBeforeHash, onStart } = props;
	console.log(limit);

	const navHeaderStore = appStore.navHeaderStore;
	// 获取当前所在的文件夹id,若本身传入则直接使用
	const curFolderId = navHeaderStore.folderId;
	function getLen(fileArr: FolderFile[]) {
		let total = 0;
		total += fileArr.length;
		fileArr.forEach((item) => {
			if (item.children.length != 0) {
				total += getLen(item.children);
			}
		});
		return total;
	}
	const filesLength = getLen(fileArr);
	if (limit && filesLength > limit) {
		onExceed!(fileArr);
		return;
	}
	async function uploadFileIntoFolder(fileArr: FolderFile[], destFolderId: number) {
		for (const file of fileArr) {
			// 若该文件children的长度不为0则代表该当前项目为文件夹
			if (file.children.length != 0) {
				// 创建当前文件夹在目前document所处的文件夹下
				let { folderId } = (await createFolder(file.title, destFolderId)) as any;
				uploadFileIntoFolder(file.children, folderId);
			} else {
				const rawFile = file.rawFile as UploadRawFile;
				console.log(rawFile);
				rawFile.uid = getFileId();
				if (cut) {
					// 先将文件加入队列展示
					onBeforeHash!(rawFile);
					// 获取文件HASH和后缀
					/**
					 * @TODO 此处获取hash时间过长，400MB预计4s，待优化
					 */
					const { HASH, suffix } = await getFileHASH(rawFile);
					// 调用onStart将HASH赋给文件
					onStart!(rawFile, HASH, suffix);
					// 开始上传文件
					upload(rawFile, HASH, suffix, destFolderId);
				} else {
					rawFile.uid = getFileId();
					onStart!(rawFile, "", "");
					upload(rawFile);
				}
			}
		}
	}
	console.log(curFolderId);
	uploadFileIntoFolder(fileArr, curFolderId);

	setTimeout(() => {
		indexStore.reloadApp();
	}, 300);
};

const uploadFiles = async (files: File[]) => {
	if (files.length === 0) return;
	// 限制上传个数
	const { cut, limit, multiple, onExceed, onBeforeHash, onStart } = props;
	if (limit && files.length > limit) {
		onExceed!(files);
		return;
	}

	if (!multiple) {
		files = files.slice(0, 1);
	}

	for (const file of files) {
		const rawFile = file as UploadRawFile;
		// 为每个文件赋uid
		rawFile.uid = getFileId();
		if (cut) {
			// 先将文件加入队列展示
			onBeforeHash!(rawFile);
			// 获取文件HASH和后缀
			/**
			 * @TODO 此处获取hash时间过长，400MB预计4s，待优化
			 */
			const { HASH, suffix } = await getFileHASH(rawFile);
			// 调用onStart将HASH赋给文件
			onStart!(rawFile, HASH, suffix);
			// 开始上传文件
			upload(rawFile, HASH, suffix);
		} else {
			rawFile.uid = getFileId();
			onStart!(rawFile, "", "");
			upload(rawFile);
		}
	}
	setTimeout(() => {
		indexStore.reloadApp();
	}, 300);
};

const upload = async (
	rawFile: UploadRawFile,
	HASH?: string,
	suffix?: string,
	folderId?: number
) => {
	const { cut } = props;
	// 是否需要切片
	if (!cut) {
		const data = await uploadSingle(rawFile);
	} else {
		const navHeaderStore = appStore.navHeaderStore;
		// 获取当前所在的文件夹id,若本身传入则直接使用
		const curFolderId = folderId || navHeaderStore.folderId;
		// 获取已经上传成功的chunks
		const { isComplete, fileList } = await getAlready(HASH!, suffix!, curFolderId);
		// 若已存在则秒传
		if (isComplete) {
			uploadChunk(true, [], [], rawFile, "");
			return;
		}
		// 已经上传成功的chunks数组
		const alreadyList = fileList;
		// 切片好的chunks
		const chunks = await sliceFile(HASH!, suffix!, rawFile);
		// 上传chunks

		const data = await uploadChunk(false, chunks, alreadyList, rawFile, HASH!, curFolderId);

		// console.log(buffer, HASH, suffix, filename);
	}
};
</script>
<style lang="scss" scoped>
.inputEl {
	display: none;
}
</style>
