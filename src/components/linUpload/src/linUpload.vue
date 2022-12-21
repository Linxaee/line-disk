<template>
	<div class="linUpload" @click="handleClick">
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
import { uploadCallBacks } from "../types";
import { NOOP } from "@/global";
const props = withDefaults(
	defineProps<{
		multiple?: boolean;
		accept?: string;
		limit?: number;
		onSuccess?: uploadCallBacks["onSuccess"];
		onError?: uploadCallBacks["onError"];
		onExceed?: uploadCallBacks["onExceed"];
	}>(),
	{
		multiple: true,
		accept: "",
		limit: 3,
		onSuccess: () => NOOP,
		onError: () => NOOP,
		onExceed: () => NOOP,
	}
);

const requests = ref<Record<string, Promise<unknown>>>({});
const inputRef = ref<HTMLInputElement>();

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
	const { limit, onExceed } = props;
	if (limit && files.length > limit) {
		onExceed(files);
		return;
	}
	//
	console.log(files);
};
</script>
<style lang="scss" scoped>
.inputEl {
	display: none;
}
</style>
