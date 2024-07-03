<template>
	<div class="min-h-screen max-h-[100dvh] w-full flex justify-center dark:text-white">
		<div class="flex flex-col justify-between w-full overflow-y-auto">
			<div class="max-w-2xl mx-auto w-full px-3 md:px-0 my-10">
				<div class="text-2xl font-semibold mb-3">全部知识库</div>
				<div class="my-2 mb-5">
					<div
						class="flex space-x-4 cursor-pointer w-full px-3 py-2 dark:hover:bg-white/5 hover:bg-black/5 rounded-xl"
						v-for="(item, index) of maskList"
						:key="index"
						@click="checkMask(index)">
						<div class="flex flex-1 space-x-4 cursor-pointer w-full">
							<div class="self-center w-10">
								<div class="rounded-full h-10 w-10 bg-stone-700">
									<img
										:src="item.avatar"
										alt="modelfile profile"
										class="rounded-full h-10 w-10 object-cover imgDefault" />
								</div>
							</div>
							<div class="flex-1 self-center">
								<div class="font-bold">{{ item.name }}</div>
								<div class="text-sm overflow-hidden text-ellipsis line-clamp-1">{{ item.tag }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Collection',
	props: {
		maskList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	},
	methods: {
		checkMask(index) {
			this.$emit('checkMask', index, true);
		}
	}
};
</script>
