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
		window.onfocus = async () => {
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
</style>
