<template>
	<nav id="nav" class="sticky py-2.5 top-0 justify-center z-30">
		<div class="logo"></div>
		<div class="settings">
			<button class="img cursor-pointer flex dark:hover:bg-gray-700 rounded-full transition"></button>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'HanderNav'
};
</script>

<style lang="less" scoped>
#nav {
	background: rgb(255, 255, 255);
	height: 10vh;
	padding-left: 15vw;
	.logo {
		background-image: url('../../assets/image/logo-max.png');
		font-size: 40px;
		font-weight: 800;
		position: absolute;
		left: calc(50% - 23.375rem);
		@media (max-width: 640px) {
			position: relative;
			left: 0;
		}
		margin-top: 3vh;
		width: 400px;
		height: 3rem;
		aspect-ratio: 3 / 1;
		background-repeat: no-repeat;
		background-position: left;
		background-size: contain;
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
</style>
