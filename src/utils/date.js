// 日期转换工具 Moment.js
import moment from 'moment';

/**
 *
 * @function 把日期格式化为 2023-03-24 00:00:00
 * @param {*} time 时间
 * @returns 返回格式化后的日期
 */
export const dateTimeToDate = (time) => {
	// 判断参数time是否为时间格式
	if (!isDate(time)) return '';
	return moment(time).format('YYYY-MM-DD kk:mm:ss');
};

// 辅助函数，当前参数是否为时间格式
const isDate = (time) => {
	if (!time) return false;
	return moment(time).isValid();
};

// 获取本地时间，转为20240418150000格式
export const getLocalTime = () => {
	return moment().format('YYYYMMDDHHmmss');
};
