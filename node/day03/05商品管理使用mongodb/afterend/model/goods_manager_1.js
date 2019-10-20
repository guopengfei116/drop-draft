const fs = require('fs');

// 本地数据所在路径，注意文件操作时的相对路径，相对的是node运行时路径
let localeDataPath = './datamock/goods.json';

// 商品类
class GoodsManager {

	constructor(goodsList) {
		this.goodsList = goodsList;
		this.init();
	};

	// 1、如果没有指定商品初始数据，那么以同步方式读取本地存储商品列表数据的文件
	// 2、遍历商品列表找出当前最大的ID值，没有找到设初始值为0，供以后添加新商品时时候
	init() {
		if(!this.goodsList) {
			this.goodsList = JSON.parse(fs.readFileSync(localeDataPath, 'utf-8'));
		}
		GoodsManager.id = this.goodsList.length? 
			this.goodsList.reduce((g1, g2) => g1.id > g2.id? g1: g2).id : 0;
	};

	// 静态方法：获取下一个新商品的ID
	static getNextId() {
		return ++GoodsManager.id;
	};

	// 获取全部商品
	getAll() {
		return this.goodsList;
	};

	// 添加商品
	add(name) {
		this.goodsList.push({
			id: GoodsManager.getNextId(),
			name: name,
			time: new Date().toLocaleDateString()
		});
		fs.writeFile(localeDataPath, JSON.stringify(this.goodsList));
	};

	// 删除商品，注意比较使用==，因为可能存在数字与字符串数字的比较
	del(id) {
		this.goodsList = this.goodsList.filter(goods => goods.id != id);
		fs.writeFile(localeDataPath, JSON.stringify(this.goodsList));
	};

	// 搜索商品
	search(name) {
		return this.goodsList.filter(goods => goods.name === name);
	};

	// 修改商品名称
	modify(id, newName) {
		this.goodsList.forEach(goods => {
            if(goods.id === id) {
                goods.name = newName;
            }
        });
        fs.writeFile(localeDataPath, JSON.stringify(this.goodsList));
	};
}

// 导出类
module.exports = GoodsManager;