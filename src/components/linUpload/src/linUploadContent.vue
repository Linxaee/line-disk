<template>
	<div class="linUploadContent" @click="handleClick">
		<slot></slot>
		<input
			ref="inputRef"
			class="inputEl"
			:multiple="multiple"
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
const props = withDefaults(
	defineProps<{
		url?: string;
		method?: string;
		multiple?: boolean;
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

const handleClick = () => {
	// 重置选择内容并调用点击
	inputRef.value!.value = "";
	inputRef.value!.click();
};

const handleChange = (e: Event) => {
	const files = (e.target as HTMLInputElement).files;
	// narrow
	if (!files) return;
	// 调用文件上传函数
	uploadFiles(Array.from(files));
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
			console.log(suffix);
			onStart!(rawFile, HASH, suffix);
			// 开始上传文件
			upload(rawFile, HASH, suffix);
		} else {
			rawFile.uid = getFileId();
			onStart!(rawFile, "", "");
			upload(rawFile);
		}
	}
};

const upload = async (rawFile: UploadRawFile, HASH?: string, suffix?: string) => {
	const { cut } = props;
	// 是否需要切片
	if (!cut) {
		const data = await uploadSingle(rawFile);
	} else {
		// 获取已经上传成功的chunks
		const { isComplete, fileList } = await getAlready(HASH!, suffix!);
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
		const data = await uploadChunk(false, chunks, alreadyList, rawFile, HASH!);

		// console.log(buffer, HASH, suffix, filename);
	}
};
</script>
<style lang="scss" scoped>
.inputEl {
	display: none;
}
</style>
