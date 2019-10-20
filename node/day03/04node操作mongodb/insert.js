'use strict';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// 待连接的数据库地址
let dbUrl = 'mongodb://localhost:27017/itcast';

// 连接数据库
MongoClient.connect(dbUrl, (err, db) => {
	if(err) {
		console.log('数据库连接失败');
	}else {
		// 给itcast数据库中的students文档插入一条数据
		db.collection('students').insertOne({
			name: '张花', age: 16, gender: '女', phone: 18911112222
		}, (err, result) => {
			if(err) {
				console.log('插入失败');
			}else {
				console.log('插入成功');
			}
			// 操作完毕后最好调用close方法结束数据库连接以释放内存资源
			db.close();
		});
	}
});
