import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import Home from '@/views/index/index.vue';
import Login from '@/views/login/index.vue';
Vue.use(Router);

/**
 * -routes路由结构1. 登录页 2. 首页
 * --首页下的子路由 children
 * ---name:路由名称 String
 * ---path:路由路径 String
 * ---component:路由组件 Function
 * ---meta:路由元信息 Object
 * ----ifMenu:是否显示在菜单栏 Boolean
 * ----title:菜单栏标题 String
 * ----icon:菜单栏图标 String
 * ----status:是否启用 Boolean
 * ----breadList:面包屑导航 Array
 * -----name:面包屑名称 String
 * -----path:面包屑路径 String
 */

const router = new Router({
	mode: 'hash', // 路由模式
	scrollBehavior: () => ({ y: 0 }),
	base: '/',
	// 定义路由与组件的映射关系
	routes: [
		{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			name: 'home',
			path: '/',
			redirect: '/chat',
			component: Home,
			children: [
				{
					name: 'chat',
					path: '/chat',
					component: () => import('@/views/chatView/index.vue')
				},
				{
					name: 'model',
					path: '/model',
					component: () => import('@/views/modelView/index.vue')
				},
				{
					name: 'collection',
					path: '/collection',
					component: () => import('@/views/collection/index.vue')
				}
			]
		}
	]
});

// 防止连续点击多次路由报错
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((err) => err);
};

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
	// 如果未匹配到路由
	if (to.matched.length === 0) {
		from.name ? next({ name: from.name }) : next({ path: '/' });
	} else {
		// 如果要跳转的路由不是 login ， 但当前又未登入！则强制用户登录。
		if (to.name !== 'login' && !(await store.dispatch('isAuth'))) {
			next({ path: '/login' });
		} else {
			next();
		}
	}
});

export default router;
