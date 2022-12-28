import { createFolder } from "@/api";
import { h } from "vue";
import appStore from "@/store";
const indexStore = appStore.indexStore;
export function useItemClick() {
	const handleCreateNewFolder = () => {
		ElMessageBox.prompt(
			h(
				"div",
				{
					style: {
						display: "flex",
						flexDirection: "colum",
						justifyContent: "center",
						alignItems: "center",
					},
				},
				[
					h("img", {
						src: "/src/assets/img/fileIcons/folder.png",
						style: {
							width: "150px",
							padding: "20px",
						},
					}),
				]
			),
			"新建文件夹",
			{
				confirmButtonText: "确定",
				inputValue: "新建文件夹",
				customStyle: {
					width: "340px",
					borderRadius: "15px",
				},
				confirmButtonClass: "confirmButton",
				showCancelButton: false,
			}
		)
			.then(async ({ value }) => {
				const data = await createFolder(value);
				ElMessage({
					type: "success",
					message: "新建文件夹成功",
				});
				setTimeout(() => {
					indexStore.reloadApp();
				}, 300);
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "Input canceled",
				});
			});
		// ElMessageBox.prompt("<strong>proxy is <i>HTML</i> string</strong>", "新建文件夹", {
		// 	confirmButtonText: "确定",
		// 	inputErrorMessage: "Invalid Email",
		// })
		// 	.then(({ value }) => {
		// 		ElMessage({
		// 			type: "success",
		// 			message: `Your email is:${value}`,
		// 		});
		// 	})
		// 	.catch(() => {
		// 		ElMessage({
		// 			type: "info",
		// 			message: "Input canceled",
		// 		});
		// 	});
	};
	return { handleCreateNewFolder };
}
