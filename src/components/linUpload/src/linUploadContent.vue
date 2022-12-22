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
import { UploadContentProps, UploadContentPropsDefault } from "./linUploadContent";
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

const { uploadSingle } = useFileUpload(props);

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

const uploadFiles = (files: File[]) => {
	if (files.length === 0) return;

	// 限制上传个数
	const { limit, multiple, onExceed, onStart } = props;
	if (limit && files.length > limit) {
		// onExceed(files);
		return;
	}

	if (!multiple) {
		files = files.slice(0, 1);
	}

	for (const file of files) {
		const rawFile = file as UploadRawFile;
		// 为每个文件赋uid
		rawFile.uid = getFileId();
		onStart!(rawFile);
		upload(rawFile);
	}

	// onReady(files);
};

const upload = async (rawFile: UploadRawFile) => {
	const { cut } = props;
	// console.log(url);
	if (!cut) {
		const data = await uploadSingle(rawFile);
		// console.log(data);
	}
};
</script>
<style lang="scss" scoped>
.inputEl {
	display: none;
}
</style>
