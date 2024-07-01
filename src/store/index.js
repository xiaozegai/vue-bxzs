/**
 * 全局状态管理
 */
import Vuex from 'vuex';
import Vue from 'vue';
import Cookies from 'js-cookie';
import { get_user_info } from '@/api/user';
import { Message } from 'element-ui';
import { getLanguage } from '@/lang/index';

// 使用安装
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		//当前登入信息
		user: undefined,
		language: getLanguage()
	},
	getters: {
		user(state) {
			return state.user;
		}
	},
	mutations: {
		// 参数是由程序员自己决定的，一般情况下
		// 一般情况下， payload（载荷） 参数是一个对象
		login(state, payload) {
			state.user = payload.user;
		},
		logout(state) {
			state.user = {};
		}
	},
	actions: {
		async isAuth({ state, commit }) {
			if (state.user) return true;
			// 发起服务端请求，根据请求改变 user 状态
			try {
				let { data } = await get_user_info();
				if (data.status === 200) {
					commit('login', { user: data.data });
					return true;
				} else {
					Message.error('用户未登录！');
					return false;
				}
			} catch {
				return false;
			}
		},
		setLanguage({ commit }, language) {
			commit('SET_LANGUAGE', language);
			Cookies.set('language', language);
		}
	}
});
export default store;
