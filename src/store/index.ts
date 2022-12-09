import { useNavHeaderStore } from "./navHeader";
import { useNavMenuStore } from "./navMenu";

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
