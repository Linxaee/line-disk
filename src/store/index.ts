import { createPinia } from "pinia";
// 持久化插件
import piniaPluginPersist from "pinia-plugin-persist";

import { useIndexStore } from "./indexStore";
import { useNavHeaderStore } from "./navHeader";
import { useNavMenuStore } from "./navMenu";
import { useSubDocumentStore } from "./subDocument";
import { useDocumentStore } from "./document";

import { useUploadStore } from "./upload";
export const pinia = createPinia();
pinia.use(piniaPluginPersist);

export interface IAppStore {
	indexStore: ReturnType<typeof useIndexStore>;
	navHeaderStore: ReturnType<typeof useNavHeaderStore>;
	navMenuStore: ReturnType<typeof useNavMenuStore>;
	subDocumentStore: ReturnType<typeof useSubDocumentStore>;
	documentStore: ReturnType<typeof useDocumentStore>;
	uploadStore: ReturnType<typeof useUploadStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * @description 注册app状态库，store总入口
 */
export const registerStore = () => {
	appStore.indexStore = useIndexStore();
	appStore.navHeaderStore = useNavHeaderStore();
	appStore.navMenuStore = useNavMenuStore();
	appStore.subDocumentStore = useSubDocumentStore();
	appStore.documentStore = useDocumentStore();
	appStore.uploadStore = useUploadStore();
};

export default appStore;
