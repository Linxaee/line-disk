import { fileIconMap } from "@/global/map/fileIconMap";
type Suffix = keyof typeof fileIconMap;
/**
 * @description 从fileIconMap中找到filename对应的路径
 */
export const fileNameToIconUrl = (filename: string, type = 2) => {
	if (type === 1) return fileIconMap["folder"];
	let suffix: Suffix = "";
	let res = filename.substring(filename.lastIndexOf(".") + 1);
	if (Object.keys(fileIconMap).includes(res)) {
		suffix = res as Suffix;
	}
	return fileIconMap[suffix];
};
