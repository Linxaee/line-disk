import { createPinia } from "pinia";
// 持久化插件
import piniaPluginPersist from "pinia-plugin-persist";

import { useNavHeaderStore } from "./navHeader";
import { useNavMenuStore } from "./navMenu";

export const pinia = createPinia();
pinia.use(piniaPluginPersist);

export interface IAppStore {
	navHeaderStore: ReturnType<typeof useNavHeaderStore>;
	navMenuStore: ReturnType<typeof useNavMenuStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * @desc 注册app状态库，store总入口
 */
export const registerStore = () => {
	appStore.navHeaderStore = useNavHeaderStore();
	appStore.navMenuStore = useNavMenuStore();
};

export default appStore;
