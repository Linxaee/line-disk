type FolderFnType = (arr: FileList) => FolderFile[];
export interface FolderFile extends File {
	rawFile: File;
	title: string;
	children: FolderFile[];
}

/**
 * @description 将伪数组转化为文件夹树状结构
 * @param arr 待转化文件伪数组
 * @returns 转化后的文件夹树状结构数组
 */
export const convertArrayToObject: FolderFnType = (arr: FileList) => {
	// 初始化结果数组，用于存储转换后的结果
	let result: FolderFile[] = [];
	// 遍历传入的数组
	for (const item of Array.from(arr)) {
		// 根据 '/' 字符将字符串分割成路径数组
		const path = item.webkitRelativePath.split("/");
		// 初始化当前节点
		let currentNode = result;
		// 遍历路径数组
		for (const pathPart of path) {
			// 在当前节点的 children 中查找是否已经存在该节点
			let found = false;
			for (const child of currentNode) {
				if (child.title === pathPart) {
					// 如果已经存在，则将当前节点更新为该节点
					currentNode = child.children;
					found = true;
					break;
				}
			}
			if (!found) {
				// 如果不存在，则新建一个节点并添加到当前节点的 children 中
				const newNode = { title: pathPart, rawFile: item, children: [] as FolderFile[] };
				currentNode.push(newNode as FolderFile);
				// 将当前节点更新为新建节点
				currentNode = newNode.children;
			}
		}
	}
	return result;
};
