import { App } from "vue";
import { registerIcons } from "./register/registerElement";
// import { registerDirectives } from "./register-directives";
export function globalRegister(app: App): void {
	// 注册图标
	registerIcons(app);
	// registerDirectives(app);
}
