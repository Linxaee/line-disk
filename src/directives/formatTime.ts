import dayjs from "dayjs";
import { App } from "vue";

export default function (app: App) {
	/**
	 * @directive 格式化日期
	 */
	app.directive("formatTime", {
		mounted(el, bindings) {
			let textContent = el.textContent;
			const format = bindings.value ?? "YYYY-MM-DD HH:mm:ss";
			if (textContent.length === 10) {
				textContent = parseInt(textContent) * 1000;
			}
			el.innerHTML = dayjs(textContent).format(format);
		},
	});
}
