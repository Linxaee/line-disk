export interface uploadingApis {
	getAlreadyChunks: (
		HASH: string,
		suffix: string,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
	uploadChunks: (
		formData: FormData,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
	uploadMerge: (
		count: number,
		HASH: string,
		headers?: Record<string, any>,
		options?: Record<string, any>
	) => Promise<unknown>;
}
