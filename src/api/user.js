import request from '../utils/requests';

// 检查用户名是否存在
export const check_username = async (username) => {
	return await request(`/register/check?username=${username}`);
};

// 修改用户密码 oldPassword newPassword againPassword
export const edit_password = async (data) => {
	return await request('/updatePassword', {
		method: 'PUT',
		data
	});
};

// 修改用户基本信息
export const edit_user_info = async (tid, data) => {
	return await request(`/profile/${tid}`, { method: 'PUT', data });
};

// 修改用户用户名 oldUsername newUsername
export const edit_user_name = async (data) => {
	return await request('/updateUsername', {
		method: 'PUT',
		data
	});
};

/**
 * 2024-6-28
 */
// 用户注册
export const user_register = async (data) => {
	return await request(`/register`, { method: 'POST', data });
};

// 登入
export const user_login = async (data) => {
	return await request(`/login`, { method: 'POST', data });
};

// 获取用户信息
export const get_user_info = async () => {
	return await request(`/userinfo`);
};

// 注销
export const user_logout = async () => {
	return await request(`/logout`);
};

// 注销
export const test_huihua = () => {
	return request(`/test`, { responseType: 'stream' });
};
