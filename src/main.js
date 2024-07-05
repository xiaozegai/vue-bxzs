import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element, { Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './lang/index'; // 国际化
import './styles/index.less'; // global css
import 'virtual:windi.css';
import VWave from 'v-wave';
// import JsonExcel from 'vue-json-excel'; // 导出excel
// Vue.component('downloadExcel', JsonExcel);

//全局挂载
import Lodash from 'lodash';
Vue.prototype.$_ = Lodash;
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 导入请求
import { createRequest, onBeforeRequest, onAfterResponse, onHttpError } from '@/utils/requests';
createRequest({ baseURL: `/api`, timeout: 5000 });
// 对请求后消息做统一处理
onAfterResponse((response) => {
	const { data } = response;
	if (data.message) {
		Notification.closeAll();
		Notification({
			type: data.status === 200 ? 'success' : 'error',
			title: data.status ? '操作成功' : '操作失败',
			message: data.message || data.msg
		});
	}
});
// 对响应错误做同样提示
onHttpError(({ status, message, data }) => {
	if (status === 401) return router.push({ name: 'login' });
	Notification({
		type: 'error',
		title: '请求错误',
		message: message
	});
});

// // 使用 nprogress 作为请求进度提示
// import nprogress from 'nprogress';
// // 进度条样式
// import 'nprogress/nprogress.css';

// onBeforeRequest(() => nprogress.start());
// onAfterResponse(() => nprogress.done());
// onHttpError(() => nprogress.done());

// v-md-editor 不用了
// import VueMarkdownEditor from '@kangc/v-md-editor';
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import Prism from 'prismjs';
// // 这是预览时引用的
// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// // 引入你所使用的主题 此处以 github 主题为例
// import githubTheme from '@kangc/v-md-editor/lib/theme/github';
// import '@kangc/v-md-editor/lib/theme/style/github.css';
// // highlightjs
// import hljs from 'highlight.js';
// //预览的主题
// VMdPreview.use(githubTheme, {
// 	Hljs: hljs
// });
// //编辑器的主题
// VueMarkdownEditor.use(vuepressTheme, {
// 	Prism
// });

// 复制
import VueClipboard from 'vue-clipboard2';

Vue.use(Element, { i18n: (key, value) => i18n.t(key, value) })
	.use(VWave)
	.use(VueClipboard);
// .use(VueMarkdownEditor)
// .use(VMdPreview);
new Vue({
	el: '#app',
	router,
	store,
	i18n,

	render: (h) => h(App)
});
