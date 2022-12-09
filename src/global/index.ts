import { App } from "vue";
import { registerIcons } from "./register/registerElement";
import { registerStore } from "@/store";
// import { registerDirectives } from "./register-directives";
export function globalRegister(app: App): void {
	// 注册图标
	registerIcons(app);
	// registerDirectives(app);
	// 全局注册store
	registerStore();
}
