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
		db.collection('students').update({
			gender: '女'
		},{
			$set: { age: 18 }
		}, {
			multi: true
		}, (err, result) => {
			if(err) {
				console.log('修改失败');
			}else {
				console.log('修改成功');
			}
			// 操作完毕后最好调用close方法结束数据库连接以释放内存资源
			db.close();
		});
	}
});
