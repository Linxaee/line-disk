import { App } from "vue";

export default function (app: App) {
	/**
	 * @directive 多余文本分号显示
	 */
	app.directive("ellipsis", {
		mounted(el, bindings) {
			// 获取原始文本
			let textContent = el.textContent;
			const endCount = bindings.value ?? 60;
			textContent = textContent.slice(0, endCount) + ".".repeat(5);
			el.innerHTML = textContent;
		},
	});
}
