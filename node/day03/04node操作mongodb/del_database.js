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
		// 删除itcast数据库
		db.dropDatabase();
		db.close();
	}
});
