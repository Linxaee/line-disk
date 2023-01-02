<template>
	<span class="breadcrumbItem" @click="onClick">
		<span ref="link"><slot /></span>
		<el-icon v-if="separatorIcon">
			<component :is="separatorIcon" />
		</el-icon>
		<span class="separator" v-else>
			{{ separator }}
		</span>
	</span>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { useRouter, RouteLocationRaw } from "vue-router";
const props = withDefaults(
	defineProps<{
		to?: RouteLocationRaw;
		replace?: boolean;
		separator?: string;
		separatorIcon?: string;
	}>(),
	{
		to: "",
		replace: false,
	}
);
const emit = defineEmits(["itemClick"]);
const router = useRouter();

const link = ref<HTMLSpanElement>();

const onClick = () => {
	if (!props.to || !router) return;
	props.replace ? router.replace(props.to) : router.push(props.to);
	emit("itemClick", props.to);
};
</script>

<style scoped>
.separator {
	margin: 0 10px;
	color: rgb(176, 177, 179) !important;
}
</style>
