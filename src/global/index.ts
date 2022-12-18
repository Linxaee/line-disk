import { App } from "vue";
import { registerIcons } from "./register/registerElement";
import { registerDirectives } from "./register/registerDirectives";
import { registerStore } from "@/store";
export function globalRegister(app: App): void {
	// 注册图标
	registerIcons(app);
	// 注册指令
	registerDirectives(app);
	// 全局注册store
	registerStore();
}
