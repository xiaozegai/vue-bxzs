<template>
	<div class="h-screen max-h-[100dvh] w-full flex flex-col">
		<hander-nav></hander-nav>
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
								<div
									class="imgDefault rounded-full"
									:style="{
										'background-image': `url(${maskList[maskIndex]?.avatar})`
									}"></div>
							</div>
						</div>
						<div class="wlecome mt-2 mb-5 text-2xl text-gray-800 dark:text-gray-100 font-normal">
							<div class="line-clamp-1">你好，{{ $store.state.user.real_name || '用户名' }}</div>
							<div v-if="maskList[maskIndex]?.name">{{ '我是  ' + maskList[maskIndex]?.tag + '小助手' }}</div>
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
										<div v-else class="prose chat-user w-full max-w-full whitespace-pre-line">
											<div class="w-full py-2">
												<pre
													v-if="item.type === 'question'"
													id="user-message"
													style="font-family: 'PingFang SC', serif"
													>{{ item.message }}</pre
												>
												<template v-if="item.type === 'answer'">
													<p v-if="!item.message" class="text-gray-700 text-xl">空</p>
													<vue-markdown v-else :source="item.message"></vue-markdown>
												</template>
												<!-- 来源-按钮 -->
												<div
													v-if="item.type === 'answer' && item.finished && item.sourceList?.length"
													class="source-box w-full my-2">
													<div class="font-bold m-b-1 text-blue-600">答案来源</div>
													<div class="flex gap-10">
														<template v-for="(sourceItem, sourceIndex) of item.sourceList">
															<el-tooltip effect="light" :content="sourceItem.content || '无'" placement="top">
																<div class="source px-4 py-1 border-2 rounded-lg cursor-pointer hover:underline">
																	<el-link>{{ sourceItem.file_name }}</el-link>
																</div>
															</el-tooltip>
														</template>
													</div>
												</div>
												<!-- 复制-按钮 -->
												<div class="flex justify-start space-x-1 text-gray-700 dark:text-gray-500">
													<!-- <div aria-label="编辑" class="flex">
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
													</div> -->
													<div aria-label="复制" class="flex" @click="copyCode(item)">
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
													<template v-if="item.type !== 'question'">
														<div aria-label="赞" class="flex" @click="interact(item, 1)">
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
																	:class="item.is_like === 1 ? 'text-yellow-400' : ''"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
																</svg>
															</button>
														</div>
														<div aria-label="踩" class="flex" @click="interact(item, -1)">
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
																	:class="item.is_like === -1 ? 'text-red-400' : ''"
																	xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
																</svg>
															</button>
														</div>
														<!-- <div aria-label="读出来" class="flex">
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
														</div> -->
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
				<!-- 输入问题框 -->
				<input-question
					:message="message"
					@onHandleInput="handleInput"
					@onHandlekeydown="handlekeydown"
					@onSendMessage="sendMessage"></input-question>
			</div>
		</div>
	</div>
</template>

<script>
import { images } from '@/utils/constans.js';
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source';
import { upload_answer } from '@/api/user';
import VueMarkdown from 'vue-markdown';
import handerNav from '../components/handerNav.vue';
import inputQuestion from '../components/inputQuestion.vue';
export default {
	name: 'modelChat',
	components: { handerNav, 'vue-markdown': VueMarkdown, inputQuestion },
	props: {
		maskList: {
			type: Array,
			default: () => []
		},
		maskIndex: {
			type: Number,
			default: 0
		},
		startChat: {
			type: Boolean,
			default: false
		},
		messageList: {
			type: Array,
			default: () => []
		},
		responseObj: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			textareaDom: null,
			messagesContainer: null,
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
	created() {},
	mounted() {
		this.textareaDom = document.getElementById('chat-textarea');
		this.messagesContainer = document.getElementById('messages-container');
	},
	computed: {},
	methods: {
		handleInput(e) {
			this.message = e.target.value;
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
						type: 'question',
						avatar: this.getAvatarSrc('question'),
						name: '你',
						message: msg ? msg : this.message,
						time: new Date().toLocaleString(),
						finished: true
					};
					this.$emit('onAddMessage', newMessage);
					this.$emit('onStartChat', true);
					this.resizeTextarea();
					this.generateMessage(msg ? msg : this.message);
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
			return type === 'question' ? this.$store.state.user.avatar : images[0];
		},
		getTitile() {
			return this.maskList[this.maskIndex].name;
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
		// 生成新消息
		generateMessage(question) {
			console.log(this.getTitile());
			// 生成新消息
			const newMessage = {
				type: 'answer',
				avatar: this.getAvatarSrc('answer'),
				name: this.getTitile(),
				message: '',
				time: new Date().toLocaleString(),
				finished: false
			};
			this.$emit('onAddMessage', newMessage);
			this.sendMessageApi(question, this.messageList.length - 1);
		},
		sendMessageApi(question, index) {
			// 让messagesContainer滚动到最下面
			this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
			let { kb_ids, history, session_id } = this.getApiParams(),
				_that = this;
			let data = {
				question,
				kb_ids,
				history
			};

			fetchEventSource(`/api/chat/${session_id}`, {
				method: 'POST',
				headers: {
					'Authori-zation': 'Bearer ' + localStorage.getItem('accessToken')
				},
				body: JSON.stringify(data),
				onopen(e) {
					console.log('打开');
					if (e.ok && e.headers.get('content-type').indexOf(EventStreamContentType) !== -1) {
						_that.messageList[index].finished = true;
					} else if (e.status !== 200) {
						throw new FatalError();
					} else {
						throw new RetriableError();
					}
				},
				onmessage(e) {
					if (e.event === 'message') {
						_that.messageList[index].message += JSON.parse(e.data.replace(/\\n\\n/gm, '<br>')).response;
						// _that.messageList[index].message += JSON.parse(e.data).response;
					} else if (e.event === 'close') {
						// console.log(JSON.parse(e.data));
						_that.$emit('updateResponseObj', JSON.parse(e.data));
					} else {
						console.log('其他data', e.data);
					}
					// 让messagesContainer滚动到最下面
					_that.messagesContainer.scrollTop = _that.messagesContainer.scrollHeight;
				},
				async onclose(e) {
					console.log('关闭', _that.responseObj);
					_that.finishd = true; // 重置状态
					let obj = {
						answer: _that.messageList[index].message,
						content_id: _that.responseObj.content_id,
						source: _that.responseObj.data
					};
					const { data } = await upload_answer(obj);
					if (data.status === 200) {
					}
				},
				onerror(err) {
					console.log('onerror', err);
					throw err;
				}
			});
		},
		// 获取历史消息等参数
		getApiParams() {
			let kb_ids = [this.maskList[this.maskIndex].uuid];
			// 取出messageList中的每一条消息的message，基数为问题，偶数为回答，将其拼接成一个数组，格式为[[问题，回答]，[问题，答案]，...]
			let history = [],
				messageList = this.messageList.slice(0, this.messageList.length - 2); // this.messageList去掉最后一组消息，因为最后一条消息是正在输入的消息，不需要传给后端
			for (let i = 0; i < messageList.length; i += 2) {
				history.push([messageList[i].message, messageList[i + 1].message]);
			}
			let session_id = this.responseObj?.session_id ? this.responseObj.session_id : 0;
			history.push(['', '']);
			if (history.length >= 6) {
				// history只保留后两条消息
				history = history.slice(history.length - 6, history.length);
			}
			return {
				kb_ids,
				history,
				session_id
			};
		},
		// 判断是否为第一条消息，是-则为新会话，通知父组件
		isFirstMessage(msg) {
			if (this.messageList.length === 0) {
				this.$emit('firstMessage', {
					id: '',
					title: `${msg}`,
					avatar: this.getAvatarSrc('answer')
					// link: `/chat/${id}`
				});
			}
		},
		// 复制
		copyCode(item) {
			// '复制', item.message
			window.navigator.clipboard.writeText(item.message).then(() => {
				this.$message({
					message: '复制成功',
					type: 'success',
					duration: 800
				});
			});
		},
		// 点评回复
		interact(item, is_like) {
			// 在messageList找出下标
			this.$emit('onInteract', { item, is_like });
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
		// background-image: url('../../assets/image/Hollama.svg');
		font-size: 40px;
		font-weight: 800;
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
	.prose {
		.source-box {
			.source {
				border-radius: 0.5rem;
				background-color: #f4fafc;
				border-color: rgb(127, 220, 212);
			}
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
