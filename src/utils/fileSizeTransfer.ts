/**
 * @description 文件大小转简写
 */
export const fileSizeTransfer = (size: number) => {
	let data = "";
	if (size < 1 * 1024) {
		//如果小于1KB转化成B
		data = size.toFixed(2) + "B";
	} else if (size < 1 * 1024 * 1024) {
		//如果小于1MB转化成KB
		data = (size / 1024).toFixed(2) + "KB";
	} else if (size < 1 * 1024 * 1024 * 1024) {
		//如果小于1GB转化成MB
		data = (size / (1024 * 1024)).toFixed(2) + "MB";
	} else {
		//其他转化成GB
		data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
	}
	let sizeStr = data + "";
	let len = sizeStr.indexOf(".");
	let dec = sizeStr.substr(len + 1, 2);
	if (dec == "00") {
		//当小数点后为00时 去掉小数部分
		return sizeStr.substring(0, len) + sizeStr.substr(len + 3, 2);
	}
	return sizeStr;
};
