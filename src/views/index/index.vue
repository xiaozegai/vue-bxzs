<template>
	<div class="text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen overflow-auto flex flex-row">
		<!-- 侧边栏 -->
		<div
			id="sidebar"
			class="h-screen max-h-[100dvh] min-h-screen lg:relative text-gray-900 dark:bg-gray-950 dark:text-gray-200 text-sm transform transition fixed z-50 top-0 left-0 w-[20rem]"
			:class="sidebarOpen ? 'w-[20rem]' : 'w-[0] -translate-x-[20rem]'">
			<div
				class="py-2 my-auto flex flex-col justify-between h-screen max-h-[100dvh] w-[20rem]"
				:class="sidebarOpen ? '' : 'invisible'">
				<div class="logoContainer">
					<img
						src="../../assets/favicon.png"
						class="rounded-full border-[1px] border-gray-200 dark:border-none logo imgDefault"
						alt="logo"
						draggable="false" />
					<img
						src="../../assets/image/with.svg"
						class="dark:border-none with imgDefault"
						alt="with"
						draggable="false" />
					<img
						src="../../assets/image/logo1.png"
						alt="logo1"
						class="rounded-full dark:border-none logo imgDefault"
						draggable="false" />
				</div>
				<div class="px-2 flex justify-center space-x-2 newChatContainer">
					<div
						id="sidebar-new-chat-button"
						class="flex-grow flex justify-between rounded-xl px-3.5 py-2 dark:hover:bg-gray-900 transition cursor-pointer"
						@click="newChat">
						<div class="flex self-center">
							<div class="self-center imgDefault">
								<img src="../../assets/image/newChat.svg" class="rounded-full" alt="logo" />
							</div>
							<div class="newChat self-center font-bold text-sm">新聊天</div>
						</div>
					</div>
				</div>
				<div class="box">
					<div class="container maskBlock">
						<button class="moreMasksContainer" @click="goMoveMask">
							<div class="text">更多知识库</div>
							<div class="icon imgDefault"></div>
						</button>
						<div class="masksContainer">
							<button
								v-for="(item, index) of maskList.slice(0, 3)"
								:key="index"
								class="mask"
								@click="chooseMask(index)">
								<div class="avatar imgDefault" :style="{ 'background-image': `url(${item.avatar})` }"></div>
								<div class="textInfo">
									<div class="name">{{ item.name }}</div>
									<div class="tag">{{ item.tag }}</div>
								</div>
							</button>
						</div>
					</div>
				</div>
				<hr class="border-gray-100 dark:border-gray-800 mt-2.5 mb-1.5" />
				<div class="model relative flex flex-col flex-1 overflow-y-auto">
					<div class="box">
						<div class="model-container">
							<div class="flex w-full" id="chat-search" style="">
								<input
									class="rounded-l-xl py-1.5 pl-2.5 text-sm dark:text-gray-300 dark:bg-gray-950 outline-none searchInput"
									placeholder="搜索" />
							</div>
							<div
								class="searchLogo imgDefault self-center rounded-r-xl bg-white dark:bg-gray-950"
								style="padding: 0.4rem 0.4rem 0.4rem 0.5rem">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#39C5BB">
									<path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
										clip-rule="evenodd"></path>
								</svg>
							</div>
						</div>
					</div>
					<div id="session-box" class="pl-2 my-2 flex-1 flex flex-col space-y-1 overflow-y-auto">
						<div
							class="chatBox pr-2 relative group"
							v-for="(item, index) of sessionList"
							:key="index"
							@click="chooseSession(item, index)">
							<div class="chatContainer" :class="currentSessionIndex === index ? 'light' : ''">
								<div class="flex">
									<div
										class="avatar imgDefault"
										:style="{
											'background-image': item.avatar ? `url(${item.avatar})` : `url(${src4})`
										}"></div>
								</div>
								<div class="name flex justify-between rounded-xl py-2 cursor-pointer" draggable="false">
									<div class="flex self-center flex-1 w-full">
										<div class="font-semibold text-left self-center overflow-hidden w-full h-[20px]">
											{{ `"${item.title}"` }}
										</div>
									</div>
								</div>
								<div
									class="settings invisible group-hover:visible from-gray-100 dark:from-gray-950 cursor-pointer"
									title="删除"
									@click="deleteSession(item)">
									<i class="el-icon-delete"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="user-center px-2.5">
					<div class="flex flex-col">
						<button
							class="flex justify-between rounded-xl py-3 px-3.5 w-full bg-miku-mediumLight_hover dark:hover:bg-gray-900 transition">
							<div class="self-center mr-3">
								<img
									:src="$store.state.user.avatar"
									class="max-w-[30px] object-cover rounded-full"
									alt="User profile" />
							</div>
							<div class="flex-1 self-center text-left font-semibold">{{ $store.state.user.nickname || '用户名' }}</div>
							<div
								class="logout mr-3 p-2 self-center font-semibold rounded-xl border-1 border-blue-300 bg-blue-50"
								@click="logout">
								退出登录
							</div>
						</button>
					</div>
				</div>
			</div>
			<div
				class="sidebar-toggle fixed left-0 top-[50dvh] transform -translate-y-1/2 transition-transform translate-x-[19.5rem] md:translate-x-[20rem] rotate-0">
				<div aria-label="关闭-打开 侧边栏" class="flex">
					<button id="sidebar-toggle-button" class="group" @click="sidebarClick">
						<span class="" data-state="closed">
							<div
								class="flex h-[72px] w-8 items-center justify-center opacity-50 group-hover:opacity-100 transition"
								style="filter: drop-shadow(rgba(21, 129, 121, 0.2) 2px 1px 7px)">
								<div class="flex h-6 w-6 flex-col items-center">
									<div
										class="h-3 w-1 rounded-full bg-miku dark:bg-white rotate-0 transform translate-y-[0.15rem]"
										:class="sidebarOpen ? 'group-hover:rotate-[15deg]' : 'group-hover:rotate-[-15deg]'"></div>
									<div
										class="h-3 w-1 rounded-full bg-miku dark:bg-white rotate-0 transform translate-y-[-0.15rem]"
										:class="sidebarOpen ? 'group-hover:rotate-[-15deg]' : 'group-hover:rotate-[15deg]'"></div>
								</div>
							</div>
						</span>
					</button>
				</div>
			</div>
		</div>
		<!-- 主体内容 -->
		<router-view
			:maskList="maskList"
			:maskIndex="maskIndex"
			@checkMask="chooseMask"
			@firstMessage="addTip"
			:startChat="startChat"
			@onStartChat="onStartChat"
			:messageList="messageList"
			@onAddMessage="onAddMessage"
			:responseObj="responseObj"
			@updateResponseObj="updateResponseObj"
			@onInteract="onInteract" />
		<!-- 关闭 - 开启 -->
		<div id="tippy-6" :class="{ tippyVisible: sidebarToggle, tippyMove: !sidebarOpen }">
			<div class="tippy-box">
				<div class="tippy-content" data-state="visible">{{ sidebarOpen ? '关闭' : '打开' }} 侧边栏</div>
			</div>
		</div>
	</div>
</template>
<script>
import src1 from '../../assets/image/mask-1.webp';
import src2 from '../../assets/image/mask-2.webp';
import src3 from '../../assets/image/mask-3.webp';
import src4 from '../../assets/image/logo1.png';
import {
	user_logout,
	get_kb_ids,
	get_chat_list,
	get_chat_detail,
	del_chat,
	answer_rate,
	get_user_info
} from '@/api/user';
import Cookies from 'js-cookie';

export default {
	name: 'homeIndex',
	components: {},
	data() {
		return {
			sidebarToggle: false,
			sidebarOpen: true,
			maskList: [],
			maskIndex: 0,
			sessionList: [],
			currentSessionIndex: -1,
			startChat: false,
			messageList: [],
			responseObj: {},
			src4,
			// 分页
			page: 1,
			limit: 20
		};
	},
	created() {},
	computed: {
		language() {
			return Cookies.get('language') || 'zh';
		}
	},
	mounted() {
		// 侧边栏开关
		const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
		// 添加hover事件
		sidebarToggleButton.addEventListener('mouseenter', () => {
			this.sidebarToggle = true;
		});
		// 添加移出事件
		sidebarToggleButton.addEventListener('mouseleave', () => {
			this.sidebarToggle = false;
		});
		// localStorage.getItem('sidebarOpen')转为boolean
		let localSidebarOpen = localStorage.getItem('sidebarOpen');
		if (localSidebarOpen !== null) {
			this.sidebarOpen = JSON.parse(localSidebarOpen);
		}
		// 初始化
		this.init();
		// 判断sessionBox是否滚动到底部
		const sessionBox = document.getElementById('session-box');
		sessionBox.addEventListener('scroll', () => {
			if (sessionBox.scrollHeight - sessionBox.scrollTop === sessionBox.clientHeight) {
				this.page++;
				this.getChatListApi();
			}
		});
	},
	methods: {
		init() {
			this.getKbIdsApi();
			let currentSessionIndex = localStorage.getItem('currentSessionIndex');
			// 判断localStorage内是否存在currentSessionIndex的值，这个值是一个数字，可以为0但不可以为null或undefined
			if (currentSessionIndex !== null && Number(currentSessionIndex) >= 0) {
				this.currentSessionIndex = Number(currentSessionIndex);
				this.getChatListApi(true, this.currentSessionIndex);
			} else {
				this.currentSessionIndex = 0;
				this.getChatListApi();
			}
		},
		async getKbIdsApi() {
			const { data } = await get_kb_ids();
			if (data.status === 200) {
				Object.keys(data.data).forEach((key) => {
					if (key && data.data[key]) {
						let item = {
							id: key,
							name: this.$t(key),
							tag: this.$t(`${key}_text`),
							uuid: data.data[key],
							avatar: src4
						};
						this.maskList.push(item);
					}
				});
			} else {
				this.$message.error('系统繁忙，稍后重试！');
			}
		},
		async getChatListApi(bool, index) {
			const { data } = await get_chat_list(this.page, this.limit);
			if (data.status === 200) {
				// let data = data.data; // data.data.count 条数
				if (data.data.list.length > 0) {
					this.sessionList = [...this.sessionList, ...data.data.list];
				} else {
					this.page--;
				}
			}
			if (bool && index) {
				if (!this.sessionList.length) {
					return;
				} else if (index >= this.sessionList.length) {
					this.getChatDetailApi(this.sessionList[0].id);
					this.setDocumentTitle(this.sessionList[0].title);
				} else {
					this.getChatDetailApi(this.sessionList[index].id);
					this.setDocumentTitle(this.sessionList[index].title);
				}
			} else {
				if (this.sessionList.length) {
					this.getChatDetailApi(this.sessionList[0].id);
					this.setDocumentTitle(this.sessionList[0].title);
				}
			}
		},
		async getChatDetailApi(sessionId) {
			if (!sessionId) return;
			const { data } = await get_chat_detail(sessionId);
			if (data.status === 200) {
				this.startChat = true;
				this.responseObj.session_id = data.data.id;
				this.generateMessageList(data.data.contents);
			}
		},
		// 切换语言
		handleSetLanguage(lang) {
			this.$i18n.locale = lang; //也可以放在store中操作
			this.$store.dispatch('setLanguage', lang);
			this.$router.go(0);
		},
		// 登出事件
		async logout() {
			const { data } = await user_logout();
			if (data.status === 200) {
				this.$message.success(data.msg);
				localStorage.removeItem('accessToken');
				localStorage.removeItem('currentSessionIndex');
				this.$router.push({ path: '/login' });
				this.$store.commit('logout');
			} else {
				this.$message.error(data.msg);
				this.$router.push({ path: '/login' });
			}
		},
		chooseMask(index, isRouter) {
			this.resetValue();
			this.maskIndex = index;
			if (isRouter || this.$route.path !== '/') {
				this.$router.push({ path: `/model` });
			}
		},
		sidebarClick() {
			this.sidebarOpen = !this.sidebarOpen;
			localStorage.setItem('sidebarOpen', this.sidebarOpen);
		},
		goMoveMask() {
			this.$router.push({ path: '/collection' });
		},
		newChat() {
			this.resetValue();
			this.$router.push({ path: `/chat` });
		},
		setDocumentTitle(title) {
			document.title = `"${title}"` + ' | ' + '南大-报销助手';
		},
		async chooseSession(session, currentIndex) {
			if (this.currentSessionIndex === currentIndex && this.$route.path === '/chat') return;
			this.currentSessionIndex = currentIndex;
			localStorage.setItem('currentSessionIndex', currentIndex);
			this.resetValue(true);
			// 把浏览器头设置为session.title
			this.setDocumentTitle(session.title);
			if (session.kb_type === 'all') {
				this.$router.push({ path: `/chat` });
			} else {
				// 遍历this.maskList,找出id === kb_type
				let index = this.maskList.findIndex((item) => item.id === session.kb_type);
				this.maskIndex = index;
				this.$router.push({ path: `/model` });
			}
			this.getChatDetailApi(session.id);
		},
		// 通过contents获取对话内容，设置messageList
		generateMessageList(contents) {
			const _that = this;
			// 遍历contents，每一条对应两条messageList，分别是question和answer
			contents.forEach((item) => {
				let question = {
					type: 'question',
					avatar: _that.$store.state.user.avatar,
					name: '你',
					message: item.question,
					time: item.create_time_text,
					finished: true
				};
				let answer = {
					id: item.id,
					type: 'answer',
					avatar: src4,
					name: '报销助手',
					message: item.answer,
					time: item.create_time_text,
					finished: true,
					sourceList: JSON.parse(item.source)?.slice(0, 3),
					is_like: item.is_like
				};
				_that.messageList.push(...[question, answer]);
			});
		},
		resetValue(bool) {
			if (!bool) this.startChat = false;
			this.messageList = [];
			this.responseObj = {};
		},
		// 新增会话
		addTip(item) {
			this.sessionList.unshift(item);
		},
		// 开始聊天事件
		onStartChat(bool) {
			this.startChat = bool;
			if (!bool) {
				this.messageList = [];
			}
		},
		onAddMessage(message) {
			this.messageList.push(message);
			this.currentSessionIndex = 0;
			localStorage.setItem('currentSessionIndex', 0);
		},
		updateResponseObj(obj) {
			this.responseObj = obj;
			try {
				this.$set(this.messageList[this.messageList.length - 1], 'sourceList', obj.data.slice(0, 3));
				this.$set(this.messageList[this.messageList.length - 1], 'id', obj.content_id);
				this.$set(this.sessionList[0], 'id', obj.session_id);
				this.$set(this.sessionList[0], 'kb_type', obj.kb_type);
			} catch {}
		},
		// 删除会话
		async deleteSession(item) {
			const { data } = await del_chat(item.id);
			if (data.status === 200) {
				this.sessionList = this.sessionList.filter((session) => session.id !== item.id);
				this.resetValue();
				this.currentSessionIndex = 0;
				localStorage.setItem('currentSessionIndex', 0);
			}
		},
		// 交互点赞事件
		async onInteract(param) {
			let index = this.messageList.findIndex((v) => v === param.item);
			let message = this.messageList[index];
			if (this.messageList[index].is_like === param.is_like) {
				param.is_like = 0;
			}
			let msg = param.is_like === 0 ? '取消' : param.is_like === 1 ? '有用!' : '没用！';
			const { data } = await answer_rate(message.id, { is_like: param.is_like });
			if (data.status === 200) {
				this.$message.success(msg);
				this.$set(this.messageList[index], 'is_like', param.is_like);
			} else {
				this.$message.error('稍后再试！');
			}
		}
	},
	beforeDestroy() {}
};
</script>
<style lang="less" scoped>
#sidebar {
	background-color: rgb(251, 251, 251);
	box-shadow: rgba(183, 183, 183, 0.2) 3px 1px 20px 0px;
	border-radius: 0px 30px 30px 0px;
	.logoContainer {
		padding: 0 1rem;
		margin-top: 0.2rem;
		margin-bottom: 0.5rem;
		width: 100%;
		position: relative;
		display: flex;
		gap: 0.5rem;
		justify-content: flex-start;
		align-items: center;
		img.imgDefault {
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			&.logo {
				width: 3rem;
				aspect-ratio: 1 / 1;
			}
			&.with {
				width: 1.5rem;
				aspect-ratio: 1 / 1;
				opacity: 0.65;
			}
		}
	}
	.newChatContainer {
		#sidebar-new-chat-button {
			height: fit-content;
			&:hover {
				background-color: #eaf8fd;
			}
			.imgDefault {
				img {
					width: 1rem;
					height: 1rem;
				}
			}
			.newChat {
				margin-left: 0.75rem;
				transform: translateY(1px);
			}
		}
	}
	.box {
		padding: 0.1rem 0.8rem 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.container {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			border-radius: 20px;
			box-sizing: border-box;
			flex-direction: column;
			gap: 0.7rem;
			.moreMasksContainer {
				padding: 0.3rem 0.5rem;
				border-radius: 30px;
				background: linear-gradient(90deg, #f9f9f9 0%, #fff 79.5%);
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: flex-end;
				.text {
					color: #b7b7b7;
					font-size: 1rem;
					font-weight: 600;
				}
				.icon {
					margin: 0.4rem 0.4rem 0.4rem 0.5rem;
					height: 0.9rem;
					aspect-ratio: 17 / 14;
					-o-object-fit: cover;
					object-fit: cover;
					background-image: url('../../assets/image/moreMask.svg');
					background-repeat: no-repeat;
					background-position: center;
					background-size: cover;
				}
			}
			.masksContainer {
				display: flex;
				flex-direction: column;
				width: 100%;
				gap: 8px;
				.mask {
					padding: 0.2rem 0;
					border-radius: 1rem;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 15px;
					&:hover {
						background-color: #f4fafc;
					}
					.avatar {
						height: 2.5rem;
						aspect-ratio: 1 / 1;
						border-radius: 50%;
						&.imgDefault {
							background-repeat: no-repeat;
							background-position: center;
							background-size: cover;
						}
					}
					.textInfo {
						flex-grow: 1;
						display: flex;
						align-items: flex-start;
						justify-content: center;
						flex-direction: column;
						gap: 2px;
						white-space: nowrap;
						text-overflow: ellipsis;
						.name {
							color: #535353;
							font-size: 1rem;
							font-weight: 600;
						}
						.tag {
							color: #828282;
							font-size: 0.75rem;
							font-weight: 600;
						}
					}
				}
				// & .mask:first-of-type .avatar {
				// 	background-image: url('../../assets/image/mask-1.webp');
				// }
				// & .mask:nth-of-type(2) .avatar {
				// 	background-image: url('../../assets/image/mask-2.webp');
				// }
				// & .mask:last-of-type .avatar {
				// 	background-image: url('../../assets/image/mask-3.webp');
				// }
			}
		}
	}
	.model {
		.box {
			padding: 0.1rem 0.8rem 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.model-container {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				border-radius: 20px;
				box-sizing: border-box;
				background: rgb(255, 255, 255);
				border-radius: 30px;
				padding-right: 0.45rem;
				.searchInput {
					flex-grow: 1;
					text-align: right;
					font-size: 1rem;
					font-weight: 600;
				}
			}
			.searchLogo {
				height: 2rem;
				aspect-ratio: 1 / 1;
				transform: scaleX(-1);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}
		}
	}
	.chatBox {
		display: flex;
		flex-direction: column;
		.chatContainer {
			display: flex;
			width: 100%;
			padding: 0 0.5rem;
			justify-content: space-between;
			align-items: center;
			gap: 4px;
			border-radius: 10px;
			&:hover {
				background-color: #f4fafc;
			}
			&.light {
				background-color: #eaf8fd;
			}
			.avatar {
				border-radius: 50%;
				width: 1.8rem;
				aspect-ratio: 1 / 1;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}
			.name {
				width: calc(100% - 3.5rem - 8px);
				flex-shrink: 1;
			}
		}
	}
	.user-center {
		.bg-miku-mediumLight_hover {
			&:hover {
				background-color: #eaf8fd;
			}
			.logout {
				transition: box-shadow linear 0.2s;
			}
			&:hover .logout {
				box-shadow: 0 0 0 2px #39c5bb;
			}
		}
	}
	.sidebar-toggle {
		#sidebar-toggle-button {
			.bg-miku {
				background-color: #39c5bb;
			}
		}
	}
}

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

.tip-box {
	.box {
		background-color: #f9f9f9;
		border-radius: 0.5rem;
	}
}

#tippy-6 {
	pointer-events: none;
	z-index: 9999;
	visibility: hidden;
	position: absolute;
	inset: 0px auto auto 0px;
	margin: 0px;
	transform: translate(362px, 470px);
	transition-property: transform, visibility, opacity;
	transition-duration: 10ms;
	@media (max-width: 640px) {
		display: none;
		opacity: 0;
	}
	.tippy-box {
		max-width: 350px;
		position: relative;
		border-radius: 4px;
		font-size: 14px;
		line-height: 1.4;
		white-space: normal;
		outline: 0;
		background-color: #39c5bb;
		color: #fff;
		.tippy-content {
			position: relative;
			padding: 5px 9px;
			z-index: 1;
			font-weight: 600;
		}
	}
	&.tippyVisible {
		visibility: visible;
	}
	&.tippyMove {
		transform: translate(42px, 470px);
	}
}
</style>
