import { App } from "vue";
import { registerFormatTime, registerEllipsis } from "@/directives";
export function registerDirectives(app: App) {
	registerFormatTime(app);
	registerEllipsis(app);
}
