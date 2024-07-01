/**
 * 项目相关常量 Project Constants
 */
// 优先级
const definPriority = [
	{ value: 'low', label: '低', icon: 'el-icon-bottom', color: 'text-yellow-400', color_600: 'text-yellow-600' },
	{ value: 'medium', label: '中', icon: 'el-icon-top-right', color: 'text-green-400', color_600: 'text-green-600' },
	{ value: 'high', label: '高', icon: 'el-icon-top', color: 'text-red-400', color_600: 'text-red-600' }
];

// 获取优先级
const definGetPriority = (priority, field) => {
	switch (field) {
		case 'value':
			return definPriority.find((item) => item.value === priority).value;
		case 'label':
			return definPriority.find((item) => item.value === priority).label;
		case 'icon':
			return definPriority.find((item) => item.value === priority).icon;
		case 'color':
			return definPriority.find((item) => item.value === priority).color;
		case 'color_600':
			return definPriority.find((item) => item.value === priority).color_600;
		default:
			return definPriority.find((item) => item.value === priority);
	}
};

export { definPriority, definGetPriority };
