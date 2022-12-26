<template>
	<div class="toolBar" :style="toolBarConfig.style">
		<div class="toolBarWrapper">
			<template v-for="item in toolBarConfig.toolBarItems" :key="item.icon">
				<el-tooltip
					v-bind="item.tooltipConfig"
					:content="item.tooltipConfig?.content ?? '示例'"
					:placement="item.tooltipConfig?.placement as any ?? 'top'"
					:effect="item.tooltipConfig?.effect"
					:hide-after="item.tooltipConfig?.hideAfter ?? 10"
					:show-after="item.tooltipConfig?.showAfter ?? 100"
				>
					<slot :name="item.icon" :item="item">
						<div class="toolBarItem" @click="item.clickCallBack?.(item, scope)">
							<el-icon :color="item.color ?? 'white'" :size="item.size ?? 18">
								<component :is="item.icon"></component>
							</el-icon></div
					></slot>
				</el-tooltip>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toolBarItem, IToolBarConfig } from "../types/index";

defineProps<{ toolBarConfig: IToolBarConfig; scope?: any }>();

const emit = defineEmits<{
	(e: "toolBarItemClick", item: toolBarItem): void;
}>();

const handleItemClick = (item: toolBarItem) => {
	emit("toolBarItemClick", item);
};
</script>

<style lang="scss" scoped>
.toolBar {
	display: inline-block;
	height: 30px;
	padding: 8px 16px;
	border-radius: 10px;
	border: 1px solid rgba(132, 133, 141, 0.2);
	background: rgb(49, 49, 54);
	box-sizing: content-box;
}
.toolBarWrapper {
	display: flex;
	.toolBarItem {
		@include flexCenter(row);
		@include square(30px);
		border-radius: 5px;
		background: transparent;
		transition: all 0.2s;
		cursor: pointer;
		&:hover {
			background: $basic_white_quarternary;
		}
		&:nth-child(n + 2) {
			margin-left: 8px;
		}
	}
}
</style>
