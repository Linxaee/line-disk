<template>
	<div class="recycleBin">
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { useRecycle } from "./hooks/useRecycle";
const { initPage } = useRecycle();
initPage();
</script>

<style lang="scss" scoped>
.recycleBin {
	height: 100%;
}
</style>
