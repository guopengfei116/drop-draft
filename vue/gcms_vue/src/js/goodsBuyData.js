
const localStorageName = 'goodsBuyData';
let data = {};

let goodsBuyData = {
	
	// 设置值，每次设置完毕后永久存在到localStorage里
	set: function(key, val) {
		data[key] = val;
		this.setStorage();
	},
	
	// 获取指定id的数据
	get(goodsId) {
		return data[goodsId];
	},
	
	// 获取全部数据
	getAll() {
		return data;
	},
	
	// 保存数据到localStorage中
	setStorage() {
		var dataStr = JSON.stringify(data);
		localStorage.setItem(localStorageName, dataStr);
	},
	
	// 从localStorage中取值
	getStorage() {
		var dataStr = localStorage.getItem(localStorageName) || '';
		try {
			return JSON.parse(dataStr);
		}catch(e) {
			return  {};
		}
	}
	
};

// 初始化
data = goodsBuyData.getStorage();

export default goodsBuyData;

