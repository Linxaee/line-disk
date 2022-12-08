class LocalCache {
	setCache(key: string, value: any) {
		window.localStorage.setItem(key, value);
	}
	getCache(key: string) {
		window.localStorage.get(key);
	}
	deleteCache(key: string) {
		window.localStorage.removeItem(key);
	}
	clearCache() {
		window.localStorage.clear();
	}
}

export default new LocalCache();
