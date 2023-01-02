<template>
	<div class="linUpload">
		<LinUploadContent v-bind="uploadContentProps">
			<slot></slot>
		</LinUploadContent>
	</div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from "vue";
import LinUploadContent from "./linUploadContent.vue";
import { UploadEvent, UploadPropsDefault } from "./linUpload";
import { UploadContentProps, UploadContentInstance } from "./linUploadContent";
import { useUploadHandler } from "../hooks/useUploadHandler";
import { UploadCallBacks, UploadFile, UploadFiles } from "../types";
import { UploadRawFile } from "../types/index";

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
		onBeforeHash?: (file: UploadFile) => void;
		onStart?: (file: UploadRawFile, HASH: string, suffix: string) => void;
		onProgress?: (evt: UploadEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
		onSuccess?: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => unknown;
		onError?: (err: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
	}>(),
	{
		...UploadPropsDefault,
	}
);

const uploadRef = shallowRef<UploadContentInstance>();
const { uploadFiles, handleHash, handleStart, handleError, handleSuccess, handleProgress } =
	useUploadHandler(props, uploadRef);

const uploadContentProps = computed<UploadContentProps>(() => ({
	...props,
	fileList: uploadFiles,
	onBeforeHash: handleHash,
	onStart: handleStart,
	onProgress: handleProgress,
	onSuccess: handleSuccess,
	onError: handleError,
}));
</script>

<style lang="scss" scoped></style>
