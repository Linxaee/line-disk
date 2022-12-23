import { createPinia } from "pinia";
// 持久化插件
import piniaPluginPersist from "pinia-plugin-persist";

import { useNavHeaderStore } from "./navHeader";
import { useNavMenuStore } from "./navMenu";
import { useDocumentStore } from "./document";
import { useUploadStore } from "./upload";
export const pinia = createPinia();
pinia.use(piniaPluginPersist);

export interface IAppStore {
	navHeaderStore: ReturnType<typeof useNavHeaderStore>;
	navMenuStore: ReturnType<typeof useNavMenuStore>;
	documentStore: ReturnType<typeof useDocumentStore>;
	uploadStore: ReturnType<typeof useUploadStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * @description 注册app状态库，store总入口
 */
export const registerStore = () => {
	appStore.navHeaderStore = useNavHeaderStore();
	appStore.navMenuStore = useNavMenuStore();
	appStore.documentStore = useDocumentStore();
	appStore.uploadStore = useUploadStore();
};

export default appStore;
