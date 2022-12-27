import LinRequest from "@/api/index";
import { UploadRawFile } from "../types";
import { UploadContentProps } from "../src/linUploadContent";
import SparkMD5 from "spark-md5";
import { AxiosRequestConfig } from "axios";
import { ref, shallowRef } from "vue";
import appStore from "@/store";
import { UploadFile } from "../types/index";
import { throttle } from "@/utils";
import { getAlreadyChunks, uploadChunks, uploadMerge, FileInfo, FileType, FileStatus } from "@/api";

/**
 * @TODO 添加异常处理
 * @FIX 耦合度有点高，之后再说吧
 */

const uploadStore = appStore.uploadStore;

const requests = shallowRef<Record<string, XMLHttpRequest | Promise<unknown>>>({});
/**
 * @description 默认单片大小,1mb
 */
let maxSize = 1 * 1024 * 1024;
/**
 * @description 将传入的文件转化成字节流
 * @param rawFile 要上传的文件
 * @returns
 */
const changeBuffer = (rawFile: UploadRawFile) => {
	return new Promise<{ buffer: any; HASH: any; suffix: any; filename: any }>((resolve) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(rawFile);
		reader.onload = (ev) => {
			let buffer = ev.target?.result,
				spark = new SparkMD5.ArrayBuffer(),
				HASH,
				suffix;
			spark.append(buffer as ArrayBuffer);
			HASH = spark.end();
			suffix = rawFile.name.substring(rawFile.name.lastIndexOf(".") + 1);
			resolve({
				buffer,
				HASH,
				suffix,
				filename: `${HASH}.${suffix}`,
			});
		};
	});
};

export function useFileUpload(props: UploadContentProps) {
	let { url, method, headers, onSuccess, onError, onProgress } = props;
	const _onProgress = throttle(250, onProgress!, { leading: true, trailing: true });

	/**
	 * @description 直接上传文件不进行切片
	 * @param rawFile 原始文件
	 * @returns void
	 */
	async function uploadSingle(rawFile: UploadRawFile) {
		const { uid } = rawFile;

		const formData = new FormData();
		formData.append("file", rawFile);
		formData.append("filename", rawFile.name);

		const option: AxiosRequestConfig = {
			url,
			method,
			headers: headers,
			data: formData,
			onUploadProgress: (evt) => {
				onProgress!({ progress: evt.progress! }, rawFile);
			},
		};

		const onRejected = (err: any) => {
			onError!(err, rawFile);
			delete requests.value[uid];
		};

		const onFulfilled = (value: any) => {
			onSuccess!(value, rawFile);
			delete requests.value[uid];
		};

		try {
			const request = LinRequest.request(option);
			requests.value[uid] = request;
			if (request instanceof Promise) {
				return request.then(onFulfilled, onRejected);
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * @description 获取文件HASH和后缀
	 * @param rawFile 原始文件
	 * @returns
	 */
	async function getFileHASH(rawFile: UploadRawFile) {
		const { HASH, suffix } = await changeBuffer(rawFile);
		return { HASH, suffix };
	}
	async function getAlready(HASH: string, suffix: string) {
		const data = await getAlreadyChunks(HASH, suffix, headers);

		const { isComplete } = data as any;
		if (isComplete) return { isComplete };
		else {
			return { isComplete, fileList: (data as any).fileList };
		}
	}
	async function sliceFile(HASH: string, suffix: string, rawFile: UploadRawFile) {
		const uploadFile = uploadStore.getFile(rawFile.uid);
		// 实现文件切片处理 「固定数量 & 固定大小」
		uploadFile.uploadCount = Math.ceil(rawFile.size / maxSize);
		let index = 0;
		let chunks = [];
		if (uploadFile.uploadCount > 100) {
			maxSize = rawFile.size / 100;
			uploadFile.uploadCount = 100;
		}
		// 避免文件大小为0不切割文件，最小传一块
		if (uploadFile.uploadCount === 0) uploadFile.uploadCount = 1;

		while (index < uploadFile.uploadCount) {
			chunks.push({
				file: rawFile.slice(index * maxSize, (index + 1) * maxSize),
				filename: `${HASH}_${index + 1}.${suffix}`,
			});
			index++;
		}
		return chunks;
	}
	async function complete(uploadFile: UploadFile, file: UploadRawFile, HASH: string) {
		uploadFile.completeCount++;

		_onProgress!({ progress: uploadFile.completeCount / uploadFile.uploadCount }, file);

		if (uploadFile.completeCount < uploadFile.uploadCount) return;

		_onProgress.cancel();
		_onProgress!({ progress: 1 }, file);

		const fileInfo: FileInfo = {
			filename: uploadFile.name,
			fileExt: uploadFile.suffix!,
			fileMD5: HASH,
			fileSize: uploadFile.size!,
			fileType: FileType["other"],
			fileStatus: FileStatus["common"],
		};
		console.log(fileInfo);

		const data = await uploadMerge(uploadFile.completeCount, HASH, fileInfo, headers);
		if ((data as any).code === 0) onSuccess!(data, file);

		// console.log(data);
	}
	async function uploadChunk(
		isComplete: boolean,
		chunks: any,
		already: any,
		rawFile: UploadRawFile,
		HASH: string
	) {
		// 若已存在则秒传
		if (isComplete) {
			onProgress!({ progress: 1 }, rawFile);
			onSuccess!("", rawFile);
		}
		// 把每一个切片都上传到服务器上
		const uploadFile = uploadStore.getFile(rawFile.uid);
		const requests: Record<string, Promise<unknown>> = {};

		chunks.forEach(async (chunk: any) => {
			// 已经上传的无需在上传
			if (already.length > 0 && already.includes(chunk.filename)) {
				complete(uploadFile, rawFile, HASH);
				return;
			}
			let formData = new FormData();
			formData.append("file", chunk.file);
			formData.append("filename", chunk.filename);
			try {
				// 将上传chunk的请求装入数组
				const request = uploadChunks(formData, headers);
				requests[chunk.filename] = request;
				// 将chunk上传成功的回调设置为complete,失败的回调设置为onError
				if (request instanceof Promise) {
					return request.then(
						() => {
							delete requests[chunk.filename];
							complete(uploadFile, rawFile, HASH);
						},
						(err) => {
							delete requests[chunk.filename];
							onError!(err, rawFile);
						}
					);
				}
				const onFulfilled = (res: any) => {
					onSuccess!(res, rawFile);
				};
				const onRejected = (err: any) => {
					onError!(err, rawFile);
				};
				// 全部上传成功后的回调
				return Promise.all(Object.values(requests)).then(onFulfilled, onRejected);
			} catch (err) {
				onError!(err as any, rawFile);
				return Promise.reject(err);
			}
		});
	}
	return { uploadSingle, getFileHASH, getAlready, sliceFile, uploadChunk };
}
