<template>
	<div class="app-container">
		<router-view />
	</div>
</template>

<script>
import { get_user_info } from '@/api/user';

export default {
	name: 'App',
	components: {},
	data() {
		return {};
	},
	created() {},
	mounted() {
		// 监听窗口焦点事件， 当窗口获得焦点时，判断用户是否登录，未登录则跳转到登录页面
		window.onfocus = async () => {
			// 判断是否为登录页面
			if (this.$route.path === '/login') {
				return;
			}
			let { data } = await get_user_info();
			if (data.status !== 200) {
				this.$message.error('用户未登录！');
				this.$router.push('/login');
			}
		};
	},
	methods: {}
};
</script>

<style>
.app-container {
	width: 100vw;
	height: 100vh;
}
body {
    font-family: PingFang SC,serif
}
</style>
