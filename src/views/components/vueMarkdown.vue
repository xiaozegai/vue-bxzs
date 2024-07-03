<template>
	<v-md-editor
		v-model="message"
		:autofocus="true"
		height="500px"
		width="100%"
		ref="editor"
		:left-toolbar="leftBar"
		:right-toolbar="rightBar"
		:disabled-menus="[]"></v-md-editor>
</template>

<script>
// 没用到，暂时不用
export default {
	name: 'VueMarkdown',
	props: {
		message: {
			type: String,
			default: () => ''
		}
	},
	data() {
		return {
			leftBar: 'h bold italic strikethrough quote ul ol table hr link code',
			rightBar: 'preview sync-scroll fullscreen'
		};
	}
};
</script>
