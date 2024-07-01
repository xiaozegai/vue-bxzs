<template>
	<div class="h-screen max-h-[100dvh] w-full flex flex-col">
		<nav id="nav" class="sticky py-2.5 top-0 justify-center z-30">
			<div class="logo"></div>
			<div class="settings" @click="clearView">
				<button class="img cursor-pointer flex dark:hover:bg-gray-700 rounded-full transition"></button>
				<div slot="content" class="container" style="position: absolute; left: calc(24rem + 50vw); top: 10vh"></div>
			</div>
		</nav>
		<div class="flex flex-col flex-auto">
			<!-- 消息框--未开始 -->
			<div
				class="pb-2.5 flex flex-col justify-between w-full flex-auto overflow-auto h-0"
				id="messages-container"
				v-if="!startChat">
				<div class="h-full w-full flex flex-col pt-2 pb-4">
					<div class="m-auto text-center max-w-md px-2">
						<div class="flex justify-center mt-8">
							<div class="flex -space-x-4 mb-1">
								<div class="imgDefault rounded-full"></div>
							</div>
						</div>
						<div class="wlecome mt-2 mb-5 text-2xl text-gray-800 dark:text-gray-100 font-normal">
							<div class="line-clamp-1">你好，{{ $store.state.user.real_name || '用户名' }}</div>
							<div>有什么可以帮到你的吗？</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 消息框--开始 -->
			<div
				class="pb-2.5 flex flex-col justify-between w-full flex-auto overflow-auto h-0"
				id="messages-container"
				v-else>
				<div class="h-full w-full flex flex-col py-4">
					<div class="pb-10">
						<div class="w-full" v-for="(item, index) of messageList">
							<div class="flex flex-col justify-between px-5 mb-3 max-w-3xl mx-auto rounded-lg group">
								<div class="flex w-full">
									<div class="mr-4">
										<img
											:src="item.avatar"
											class="max-w-[28px] object-cover rounded-full"
											alt="profile"
											draggable="false" />
									</div>
									<div class="w-full overflow-hidden">
										<!-- 标题 -->
										<div class="user-message">
											<div class="self-center font-bold mb-0.5 capitalize line-clamp-1">
												{{ item.name }}
												<span class="invisible group-hover:visible text-gray-400 text-xs font-medium">
													{{ item.time }}
												</span>
											</div>
										</div>
										<!-- 占位区 -->
										<div v-if="!item.finished" class="w-full mt-3">
											<div class="animate-pulse flex w-full">
												<div class="space-y-2 w-full">
													<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded mr-14"></div>
													<div class="grid grid-cols-3 gap-4">
														<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded col-span-2"></div>
														<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded col-span-1"></div>
													</div>
													<div class="grid grid-cols-4 gap-4">
														<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded col-span-1"></div>
														<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded col-span-2"></div>
														<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded col-span-1 mr-4"></div>
													</div>
													<div class="h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
												</div>
											</div>
										</div>
										<!-- 回答内容 -->
										<div
											v-else
											class="prose chat-user w-full max-w-full dark:prose-invert prose-headings:my-0 prose-p:my-0 prose-p:-mb-4 prose-pre:my-0 prose-table:my-0 prose-blockquote:my-0 prose-img:my-0 prose-ul:-my-4 prose-ol:-my-4 prose-li:-my-3 prose-ul:-mb-6 prose-ol:-mb-6 prose-li:-mb-4 whitespace-pre-line">
											<div class="w-full">
												<pre v-if="item.type === 'user'" id="user-message" style="font-family: 'PingFang SC', serif">{{
													item.message
												}}</pre>
												<p v-else>{{ item.message }}</p>
												<div class="flex justify-start space-x-1 text-gray-700 dark:text-gray-500">
													<div aria-label="编辑" class="flex">
														<button
															class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition edit-user-message-button">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																class="w-4 h-4">
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
															</svg>
														</button>
													</div>
													<div aria-label="复制" class="flex">
														<button
															class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																class="w-4 h-4">
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path>
															</svg>
														</button>
													</div>
													<template v-if="item.type !== 'user'">
														<div aria-label="赞" class="flex">
															<button
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition">
																<svg
																	stroke="currentColor"
																	fill="none"
																	stroke-width="2"
																	viewBox="0 0 24 24"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="w-4 h-4"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
																</svg>
															</button>
														</div>
														<div aria-label="踩" class="flex">
															<button
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition">
																<svg
																	stroke="currentColor"
																	fill="none"
																	stroke-width="2"
																	viewBox="0 0 24 24"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="w-4 h-4"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
																</svg>
															</button>
														</div>
														<div aria-label="读出来" class="flex">
															<button
																id="speak-button-4ab582be-4177-47d6-86f2-8313264aa24d"
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="2"
																	stroke="currentColor"
																	class="w-4 h-4">
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path>
																</svg>
															</button>
														</div>
														<div aria-label="生成的图片信息" class="flex">
															<button
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition whitespace-pre-wrap"
																id="info-4ab582be-4177-47d6-86f2-8313264aa24d">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="2"
																	stroke="currentColor"
																	class="w-4 h-4">
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
																</svg>
															</button>
														</div>
														<div aria-label="继续生成" class="flex">
															<button
																type="button"
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition regenerate-response-button">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="2"
																	stroke="currentColor"
																	class="w-4 h-4">
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"></path>
																</svg>
															</button>
														</div>
														<div aria-label="重新生成" class="flex">
															<button
																type="button"
																class="invisible group-hover:visible p-1 rounded dark:hover:text-white hover:text-black transition regenerate-response-button">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	stroke-width="2"
																	stroke="currentColor"
																	class="w-4 h-4">
																	<path
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
																</svg>
															</button>
														</div>
													</template>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 底部输入区域 -->
			<div class="w-full tip-box">
				<!-- 提示框 -->
				<div class="px-2.5 -mb-0.5 mx-auto inset-x-0 bg-transparent flex justify-center" v-if="!startChat">
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
				<!-- 输入问题框 -->
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
										v-model="message"
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
								<a href="" target="_blank" class="link underline">南昌大学人工智能工业研究院</a>
								&amp;
								<a href="https://team.ncuos.com/" target="_blank" class="link underline">南昌大学家园工作室</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { images, chineseChars } from '@/utils/constans.js';
export default {
	name: 'chat',
	props: {
		maskList: {
			type: Array,
			default: () => []
		},
		startChat: {
			type: Boolean,
			default: false
		},
		messageList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			textareaDom: null,
			message: '',
			finishd: true,
			tipList: [
				{
					title: '告诉我一个有趣的事实',
					description: '关于罗马帝国'
				},
				{
					title: '给我一些想法',
					description: '如何处理我的孩子的艺术品'
				},
				{
					title: '展示一个网站的代码片段',
					description: '关于网站的固定标题'
				},
				{
					title: '帮助我进行学习',
					description: '大学入学考试的词汇'
				}
			]
		};
	},
	mounted() {
		this.textareaDom = document.getElementById('chat-textarea');
	},
	computed: {},
	methods: {
		handleInput() {
			// 动态改变textarea的高度
			this.textareaDom.style.height = 'auto';
			this.textareaDom.style.height = this.textareaDom.scrollHeight + 'px';
		},
		sendMessage(msg) {
			if (this.finishd) {
				this.finishd = false;
				this.isFirstMessage(msg);
				// 添加消息
				if (this.message !== '' || msg) {
					let newMessage = {
						type: 'user',
						avatar: this.getAvatarSrc('user'),
						name: '你',
						message: msg ? msg : this.message,
						time: new Date().toLocaleString(),
						finished: true
					};
					this.$emit('onAddMassage', newMessage);
					this.$emit('onStartChat', true);
					this.resizeTextarea();
					this.generateMessage();
				} else {
					this.finishd = true;
				}
			} else {
				this.$message({
					message: '请等待上一条回答结束！',
					type: 'warning'
				});
			}
		},
		getAvatarSrc(type) {
			return type === 'user' ? images[0] : images[1];
		},
		checkFile() {
			const fileInput = document.querySelector('input[type="file"]');
			fileInput.click();
		},
		handlekeydown(e) {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				this.sendMessage(this.message);
			}
		},
		// 重置textarea的高度
		resizeTextarea() {
			this.message = '';
			this.textareaDom.style.height = 'auto';
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
		// 生成新消息
		generateMessage() {
			const message = this.randomChinese();
			// 生成新消息
			const newMessage = {
				type: 'assistant',
				avatar: this.getAvatarSrc('assistant'),
				name: '小家园（默认）',
				message: '',
				time: new Date().toLocaleString(),
				finished: false
			};
			this.$emit('onAddMassage', newMessage);
			let index = this.messageList.length - 1;
			this.changeMessageStatus(index).then((res) => {
				// 循环，每次间隔1s，把字赋值给message，循环完成标记一下
				let i = 0;
				const timer = setInterval(() => {
					if (i < message.length) {
						this.messageList[index].message += message[i];
						i++;
					} else {
						clearInterval(timer);
						this.finishd = true;
					}
				}, 10);
			});
		},
		// 生成随机1-100长度的中文字符串
		randomChinese() {
			let str = '';
			for (let i = 0; i < Math.floor(Math.random() * 200 + 50); i++) {
				str += chineseChars[Math.floor(Math.random() * chineseChars.length)];
			}
			str += '。';
			return str;
		},
		// 倒计时2s后改变消息状态
		changeMessageStatus(index) {
			return new Promise((resolve) => {
				setTimeout(() => {
					this.messageList[index].finished = true;
					resolve();
				}, 2000);
			});
		},
		chooseTip(item) {
			this.sendMessage(item.title);
		},
		// 判断是否为第一条消息，是-则为新会话，通知父组件
		isFirstMessage(msg) {
			let id = this.generateId();
			if (this.messageList.length === 0) {
				this.$emit('firstMessage', {
					id: id,
					title: `"${msg}"`,
					avatar: this.getAvatarSrc('assistant'),
					link: `/chat/${id}`
				});
			}
		},
		// 生成id
		generateId() {
			let str = 'a-';
			let str2 = '-';
			for (let i = 0; i < 4; i++) {
				// 当最后一次的时候
				if (i === 3) {
					str2 = '';
				}
				str += Math.floor(Math.random() * 10) + str2;
			}
			return str;
		},
		clearView() {
			this.$emit('onStartChat', false);
		}
	}
};
</script>

<style lang="less" scoped>
#nav {
	background: rgb(255, 255, 255);
	height: 10vh;
	padding-left: 15vw;
	.logo {
		background-image: url('../../assets/image/Hollama.svg');
		position: absolute;
		left: calc(50% - 23.375rem);
		margin-top: 3vh;
		height: 3rem;
		aspect-ratio: 3 / 1;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.settings {
		position: absolute;
		left: calc(50% + 24rem);
		margin-top: 3vh;
		.img {
			background-image: url('../../assets/image/chatSettings.svg');
			width: 1.5rem;
			height: 1.5rem;
			&:hover {
				background-color: #eaf8fd;
			}
		}
	}
}

#messages-container {
	.imgDefault {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 9999px;
		background-image: url(/src/assets/image/default.svg);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.wlecome {
		.line-clamp-1 {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
	}
}

.tip-box {
	& button.box:hover {
		background-color: #f4fafc;
		& .arrow {
			color: #39c5bb;
		}
	}
}

.bg-miku {
	background-color: #39c5bb;
}
</style>
