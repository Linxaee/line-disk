<template>
	<el-config-provider :locale="zhCn">
		<router-view v-if="indexStore.isRouterActive"></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import appStore from "./store";
const indexStore = appStore.indexStore;
</script>

<style scoped></style>
