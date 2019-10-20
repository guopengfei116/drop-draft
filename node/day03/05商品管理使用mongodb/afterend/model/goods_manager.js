const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017/store';

// 商品类
class GoodsManager {

	constructor() {};

	// 获取全部商品
	getAll(successful, failed) {
		MongoClient.connect(dbUrl, (err, db) => {
			if(!err) {
				db.collection('goods').find({}).toArray((err, data) => {
					successful(data);
				});
			}else {
				failed(err);
			}
			db.close();
		});
	};

	// 添加商品
	add(name, successful, failed) {
		MongoClient.connect(dbUrl, (err, db) => {
			if(!err) {
				db.collection('goods').insert({
					id: GoodsManager.getNextId(),
					name: name,
					time: new Date().toLocaleDateString()
				});
				successful(db.collection('goods').find({}).toArray());
			}else {
				failed(err);
			}
			db.close();
		});
	};

	// 删除商品，注意比较使用==，因为可能存在数字与字符串数字的比较
	del(id, successful, failed) {
		MongoClient.connect(dbUrl, (err, db) => {
			if(!err) {
				db.collection('goods').remove({
					_id: id
				});
				successful(db.collection('goods').find({}).toArray());
			}else {
				failed(err);
			}
			db.close();
		});
	};

	// 搜索商品
	search(name, successful, failed) {
		MongoClient.connect(dbUrl, (err, db) => {
			if(!err) {
				successful(db.collection('goods').find({ name: name}).toArray());
			}else {
				failed(err);
			}
			db.close();
		});
	};

	// 修改商品名称
	modify(data, successful, failed) {
		MongoClient.connect(dbUrl, (err, db) => {
			if(!err) {
				successful(db.collection('goods').save(data));
			}else {
				failed(err);
			}
			db.close();
		});
        successful(db.collection('goods').find({}).toArray());
	};
}

// 导出类
module.exports = GoodsManager;
