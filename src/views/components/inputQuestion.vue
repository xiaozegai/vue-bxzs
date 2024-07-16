<template>
	<div class="bg-white dark:bg-gray-900">
		<div class="max-w-3xl px-2.5 mx-auto inset-x-0">
			<div class="pb-2">
				<input type="file" hidden="" multiple="" />
				<form
					class="flex flex-col relative w-full rounded-3xl px-1.5 border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900 dark:text-gray-100">
					<div class="flex">
						<div class="self-end mb-2 ml-1">
							<div aria-label="上传文件" class="flex">
								<button
									class="bg-miku-light hover:bg-gray-100 text-gray-800 dark:bg-gray-850 dark:text-white dark:hover:bg-gray-800 transition rounded-full p-1.5"
									type="button"
									@click="checkFile">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="#39C5BB"
										class="w-[1.2rem] h-[1.2rem]">
										<path
											d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"></path>
									</svg>
								</button>
							</div>
						</div>
						<textarea
							id="chat-textarea"
							class="outline-none w-full py-3 px-3 rounded-xl resize-none h-[48px]"
							placeholder="发送消息"
							rows="1"
							:value="message"
							@input="handleInput"
							@keydown="handlekeydown"></textarea>
						<div class="self-end mb-2 flex space-x-1 mr-1">
							<div aria-label="录音" class="flex">
								<button
									id="voice-input-button"
									class="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 transition rounded-full p-1.5 mr-0.5 self-center"
									type="button"
									@click="record">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="#39C5BB"
										class="w-5 h-5 translate-y-[0.5px]">
										<path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path>
										<path
											d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path>
									</svg>
								</button>
							</div>
							<div aria-label="发送消息" class="flex">
								<button
									class="text-white bg-gray-100 dark:text-gray-900 dark:bg-gray-800 disabled transition rounded-full p-1.5 self-center"
									:class="message !== '' ? 'bg-miku' : ''"
									:disabled="message === ''"
									type="submit"
									@click.prevent="sendMessage(message)">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5">
										<path
											fill-rule="evenodd"
											d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
											clip-rule="evenodd"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</form>
				<div class="mt-1.5 text-xs text-gray-500 text-center about">
					Powered by
					<a href="" target="_blank" class="link underline">xxxxx</a>
					&amp;
					<a href="https://team.ncuos.com/" target="_blank" class="link underline">xxxxx</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'inputQuestion',
	props: {
		message: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		// 选择文件
		checkFile() {
			const fileInput = document.querySelector('input[type="file"]');
			fileInput.click();
		},
		// 输入时改变textarea高度
		handleInput(e) {
			this.$emit('onHandleInput', e);
		},
		// 鼠标回车事件
		handlekeydown(e) {
			if (!e) return;
			this.$emit('onHandlekeydown', e);
		},
		// 打开设备麦克风录音
		record() {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
					const mediaRecorder = new MediaRecorder(stream); // 创建一个MediaRecorder对象，用于录制音频
					mediaRecorder.start(); // 开始录制
					mediaRecorder.ondataavailable = (e) => {
						console.log(e);
					};
				});
			}
		},
		// 发送提问消息
		sendMessage() {
			this.$emit('onSendMessage', this.message);
		}
	}
};
</script>

<style lang="less" scoped>
.bg-miku {
	background-color: #39c5bb;
}
</style>
