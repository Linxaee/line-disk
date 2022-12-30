<template>
	<div class="breadcrumb" ref="breadcrumb">
		<template v-for="(item, index) in breadcrumbs" :key="item.title">
			<LinBreadcrumbItem
				:style="customItemStyle"
				:class="isLast(index) ? 'active breadcrumbItem' : 'deActive breadcrumbItem'"
				:separator="isLast(index) ? '' : separator"
				:separatorIcon="isLast(index) ? '' : separatorIcon"
				:to="item.to"
				:replace="item.replace ?? false"
				><slot>{{ item.title }}</slot></LinBreadcrumbItem
			>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { CSSProperties, defineProps } from "vue";
import LinBreadcrumbItem from "./breadcrumbItem.vue";
const props = withDefaults(
	defineProps<{
		breadcrumbs: any[];
		separator?: string;
		separatorIcon?: string;
		customItemStyle?: CSSProperties;
	}>(),
	{
		breadcrumbs: () => [],
		separator: "/",
	}
);
const isLast = (index: number) => {
	return index === props.breadcrumbs.length - 1;
};
</script>

<style scoped>
.breadcrumbItem {
	cursor: pointer;
	transition: 0.2s all linear;
}
.active {
	color: black;
	font-weight: 700;
}
.deActive {
	color: rgb(176, 177, 179);
	font-weight: 500;
}
.deActive:hover {
	color: rgba(99, 125, 255, 0.75);
}
</style>
