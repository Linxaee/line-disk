import LinRequest from "@/api/index";
import { UploadRawFile } from "../types";
import { UploadContentProps } from "../src/linUploadContent";
import SparkMD5 from "spark-md5";
import { AxiosRequestConfig } from "axios";
import { ref, shallowRef } from "vue";
const requests = shallowRef<Record<string, XMLHttpRequest | Promise<unknown>>>({});
/**
 * @description 默认单片大小
 */
const DEFAULT_SIZE = 100 * 1024;
/**
 *
 * @param rawFile 要上传的文件
 * @returns
 */
const changeBuffer = (rawFile: UploadRawFile) => {
	return new Promise<{ buffer: any; HASH: any; suffix: any; filename: any }>((resolve) => {
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(rawFile);
		fileReader.onload = (ev) => {
			let buffer = ev.target!.result,
				spark = new SparkMD5.ArrayBuffer(),
				HASH,
				suffix;
			spark.append(buffer as any);
			HASH = spark.end();
			suffix = /\.([a-zA-Z0-9]+)$/.exec(rawFile.name)?.[1];
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
				onProgress!(evt, rawFile);
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

	async function uploadChunk(rawFile: UploadRawFile) {
		const { buffer, HASH, suffix, filename } = await changeBuffer(rawFile);
		console.log(buffer, HASH, suffix, filename);
	}
	return { uploadSingle, uploadChunk };
}
