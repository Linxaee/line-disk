<template>
	<div class="linDropDown">
		<el-dropdown
			:trigger="dropDownConfig.trigger"
			:size="dropDownConfig.size"
			:placement="dropDownConfig.placement"
		>
			<!-- 待包裹的组件元素 -->
			<slot></slot>
			<template #dropdown>
				<el-dropdown-menu>
					<template v-for="item in dropDownConfig.dropDownItemList" :key="item.icon">
						<div class="dropDownItemWrapper">
							<!-- 每组分割项 -->
							<span
								v-if="item.type === 2"
								class="dropDownTitle"
								:style="item.attrs?.style ?? ''"
								>{{ item.context }}</span
							>
							<!-- 实际菜单项 -->
							<LinUpload
								v-else-if="item.type === 1"
								:limit="10"
								:cut="false"
								url="/files/uploadSingle"
								><el-dropdown-item
									:icon="item.icon"
									:disabled="item.disabled"
									:divided="item.divided"
									>{{ item.context }}</el-dropdown-item
								></LinUpload
							>
						</div>
						<!-- 分组标题 -->
					</template>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import LinUpload from "@/components/linUpload";
import { IDropDownConfig } from "../types/index";
withDefaults(defineProps<{ dropDownConfig: IDropDownConfig }>(), {
	dropDownConfig: () => ({
		trigger: "click",
		size: "default",
		placement: "auto",
		dropDownItemList: [],
	}),
});
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
	right: 200px;
}
// groupTitle样式
.dropDownTitle {
	display: flex;
	align-items: center;
	white-space: nowrap;
	list-style: none;
	line-height: 26px;
	padding: 5px 16px;
	margin: 0;
	color: var(--el-text-color-regular);
	outline: 0;
}
// 覆盖本身的hover样式
:deep(.el-dropdown-menu__item:not(.is-disabled)) {
	transition: 0.2s all linear;
	line-height: 26px;
	padding: 5px 16px;
	border-radius: 10px;
	color: black;
	&:focus {
		border: none;
		background-color: $hoverBgColor;
	}
}
.dropDownItemWrapper {
	width: 95%;
	margin: 0 auto;
}
</style>
