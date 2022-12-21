import { definePropType } from "@/utils/types";
import { uploadCallBacks } from "../types";
export const uploadProps = {
	// 是否允许选择多文件
	multiple: {
		type: Boolean,
		default: true,
	},
	// 接受的文件类型
	accept: {
		type: String,
		default: "",
	},
	// 文件上传个数限制
	limit: {
		type: Number,
		default: 1,
	},
	callBacks: definePropType<uploadCallBacks>(null),
};
