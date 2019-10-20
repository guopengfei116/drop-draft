'use strict';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// 待连接的数据库地址
let dbUrl = 'mongodb://localhost:27017/itcast';

// 连接数据库，搜索多条数据
MongoClient.connect(dbUrl, (err, db) => {
	if(err) {
		console.log('数据库连接失败');
	}else {
		db.collection('students').find({
			
		}).toArray(function(err, result) {
			if(err) {
				console.log('搜索失败');
			}else {
				console.log('搜索成功');
				console.log(result);
			}
			// 操作完毕后最好调用close方法结束数据库连接以释放内存资源
			db.close();
		});
	}
});

// 连接数据库，搜索一条数据
MongoClient.connect(dbUrl, (err, db) => {
	if(err) {
		console.log('数据库连接失败');
	}else {
		db.collection('students').findOne({
			age: 16
		}, function(err, result) {
			if(err) {
				console.log('搜索失败');
			}else {
				console.log('搜索成功');
				console.log(result);
			}
			// 操作完毕后最好调用close方法结束数据库连接以释放内存资源
			db.close();
		});
	}
});
