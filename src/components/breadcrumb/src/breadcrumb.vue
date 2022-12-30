<template>
	<div class="nav-breadcrumb">
		<el-breadcrumb separator="/">
			<template v-for="item in breadcrumbs" :key="item.name">
				<el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from "vue";
import { IBreadcrumb } from "../types";

const props = defineProps({
	breadcrumbs: {
		type: Array as PropType<IBreadcrumb[]>,
		default: () => [],
	},
});
</script>

<style scoped></style>
