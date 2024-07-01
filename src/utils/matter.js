/**
 * 事件相关常量 Matter Constants
 */
// 事件类型
const definMatterType = [
	{
		value: 'log',
		label: '日志',
		border_color: 'border-indigo-300',
		bg_color: 'bg-indigo-500',
		fill_color: 'bg-indigo-50'
	},
	{ value: 'todo', label: '待办', border_color: 'border-sky-300', bg_color: 'bg-sky-500', fill_color: 'bg-sky-50' },
	{
		value: 'inprogress',
		label: '进行中',
		border_color: 'border-amber-300',
		bg_color: 'bg-amber-500',
		fill_color: 'bg-amber-50'
	},
	{
		value: 'done',
		label: '完成',
		border_color: 'border-green-300',
		bg_color: 'bg-green-500',
		fill_color: 'bg-green-50'
	}
];

// 获取事件字段
const definGetMatterType = (matterType, field) => {
	switch (field) {
		case 'value':
			return definMatterType.find((item) => item.value === matterType).value;
		case 'label':
			return definMatterType.find((item) => item.value === matterType).label;
		case 'border_color':
			return definMatterType.find((item) => item.value === matterType).border_color;
		case 'bg_color':
			return definMatterType.find((item) => item.value === matterType).bg_color;
		case 'fill_color':
			return definMatterType.find((item) => item.value === matterType).fill_color;
		default:
			return definMatterType.find((item) => item.value === matterType);
	}
};

// 导入所有文件图标
const icons = Object.values(import.meta.globEager('@/assets/*_file_icon.png')).map((item) => item.default);

// 从icons中把图片名字提取出来
const definFileType = icons.map((item) => {
	const name = item.split('/').pop().split('_file_icon.png')[0];
	return {
		value: name,
		label: name,
		icon: item
	};
});
// // 获取文件类型
const definGetFileType = (fileType, field) => {
	switch (field) {
		case 'value':
			return definFileType.find((item) => item.value === fileType).value;
		case 'label':
			return definFileType.find((item) => item.value === fileType).label;
		case 'icon':
			if (!definFileType.find((item) => item.value === fileType)) {
				return definFileType.find((item) => item.value === 'current').icon;
			} else {
				return definFileType.find((item) => item.value === fileType).icon;
			}
		default:
			return definFileType.find((item) => item.value === fileType);
	}
};

export { definMatterType, definGetMatterType, definGetFileType };
