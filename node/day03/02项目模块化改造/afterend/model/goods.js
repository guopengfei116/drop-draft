class Goods {
	
	constructor(goodsList = []) {
		this.goodsList = goodsList;
		this.init();
	};
	
	// 获取下一个新商品的ID
	static getId() {
		return ++Goods.maxId;
	};
	
	// 初始化操作
	init() {
		// 求最大ID值，如果没有则设为0
		Goods.maxId = this.goodsList.reduce((g1, g2) => {
			return g1.id > g2.id? d1.id: g2.id;
		}) || 0;
	};
	
	// 获取全部商品
	getAll() {
		return this.goodsList;
	};
	
	// 添加商品
	add(name) {
		this.goodsList.push({
			id: Goods.getId(),
			name: name,
			time: new Date().toLocaleDateString()
		});
	};
	
	// 删除商品，注意比较使用==，因为可能存在数字与字符串数字的比较
	del(id) {
		this.goodsList = this.goodsList.filter(goods => goods.id != id);
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
	};
}

// 导出商品类
module.exports = Goods;
