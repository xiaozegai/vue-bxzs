<template>
	<div class="prompt px-2.5 -mb-0.5 mx-auto inset-x-0 bg-transparent flex justify-center">
		<div class="flex flex-col max-w-3xl w-full">
			<div class="relative"></div>
			<div class="w-full relative">
				<div class="mb-3 md:p-1 text-left w-full">
					<div class="flex flex-wrap-reverse px-2 text-left">
						<div
							class="basis-full sm:basis-1/2 p-[5px] px-1"
							v-for="(item, index) of tipList"
							:key="index"
							:class="index >= 2 ? 'hidden sm:inline-flex' : ''"
							@click="chooseTip(item)">
							<button class="box flex-1 flex justify-between w-full h-full px-4 py-2.5 bg-gray-50">
								<div class="flex flex-col text-left self-center">
									<div class="text-sm font-medium dark:text-gray-300">{{ item.title }}</div>
									<div class="text-sm text-gray-500 line-clamp-1">{{ item.description }}</div>
								</div>
								<div class="arrow self-center p-1 rounded-lg text-gray-50 transition">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
										<path
											fill-rule="evenodd"
											d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
											clip-rule="evenodd"></path>
									</svg>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'QuestionPrompt',
	props: {},
	data() {
		return {
			tipList: [
				{
					title: '科研经费报销流程',
					description: '科研经费报销'
				},
				{
					title: '如何报销经费',
					description: '如何报销？？'
				}
			]
		};
	},
	methods: {
		chooseTip(item) {
			this.$emit('onChooseTip', item);
		}
	}
};
</script>

<style lang="less" scoped>
.prompt {
	& button.box:hover {
		background-color: #f4fafc;
		& .arrow {
			color: #39c5bb;
		}
	}
}
</style>
