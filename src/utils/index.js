import router from '@/router/index.js';

/**
 *
 * @param {String} homeName 父路由名称
 * @param {String} routeName 当前路由名称
 * @param {Boolean} ifMenu 是否为菜单路由
 * @returns {Array} childrenRoutes routeName页面中所有子路由
 */
export function getChildrenRoutes(homeName = 'home', routeName, ifMenu) {
	const routes = router.options.routes;
	const homeRoute = routes.find((route) => route.name === homeName);

	if (homeRoute) {
		if (routeName) {
			const exitsRouter = homeRoute.children.find((child) => child.name === routeName);
			if (exitsRouter && exitsRouter.children) {
				if (!ifMenu) {
					return exitsRouter.children;
				} else {
					return exitsRouter.children.filter((item) => item.meta.ifMenu);
				}
			} else {
				return [];
			}
		} else {
			return [];
		}
	}
}

/**
 *
 * @param {String} homeName 路由名称
 * @param {Boolean} filter 是否过滤掉不显示的路由
 * @param {Boolean} ifMenu 是否为菜单路由
 * @returns {Array} Routes routeName页面中所有路由
 */
export function getRoutes(homeName = 'home', filter = true, ifMenu = true) {
	let routes = router.options.routes;

	let homeRoute = routes.find((route) => route.name === homeName);

	if (homeRoute) {
		try {
			let result = ifMenu ? homeRoute.children.filter((item) => item.meta.ifMenu) : homeRoute.children;
			result = filter ? result.filter((item) => item.meta.status) : result;
			return result;
		} catch (error) {
			return [];
		}
	}

	return [];
}
