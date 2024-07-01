import request from '../utils/requests';

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

// 获取kb_ids /api/kb_ids
export const get_kb_ids = async () => {
	return await request(`/kb_ids`);
};

// 上传答案 /answer
export const upload_answer = async (data) => {
	return await request(`/answer`, { method: 'POST', data });
};