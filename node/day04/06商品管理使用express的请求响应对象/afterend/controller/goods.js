'use strict';
const express = require('express');
const querystring = require('querystring');

// 路由对象
let router = express.Router();

// 数据库对象
let storeDB = require('../model/store_db.js');
let ObjectID = require('mongodb').ObjectID;

// 统一设置响应头
router.use(function(req, resp, next) {
	
	// 如果使用resp.json方法发送JSON数据，就不用设置Content-Type: application/json了
	resp.set({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	
	next();
});

// 获取商品列表
router.get('/api/goods/list', function(req, resp) {
	let sortObj = null;
	if(req.query.keycode) {
		sortObj = {
			[req.query.keycode]: +req.query.order
		};
	};
	storeDB(db => {
		db.collection('goods').find().sort(sortObj).toArray()
		.then(data => {
			resp.json(data);
		});
	});
});

// 删除商品
router.get('/api/goods/delete', function(req, resp) {
	storeDB(db => {
		let obj = { '_id': ObjectID(req.query.id) };
		db.collection('goods').remove(obj)
		.then(() => {
			return db.collection('goods').find().toArray();
		})
		.then(data => {
			resp.json(data);
		});
	});
});

// 搜索商品
router.get('/api/goods/search', function(req, resp) {
	let reg = new RegExp(req.query.keycode);
	storeDB(db => {
		db.collection('goods').find({ name: reg }).toArray()
		.then((data) => {
			resp.json(data);
		});
	});
});

// 添加歌曲
router.post('/api/goods/add', function(req, resp) {
	storeDB(db => {
		db.collection('goods').insert(req.body)
		.then(() => {
			return db.collection('goods').find().toArray();
		})
		.then(data => {
			resp.json(data);
		});
	});
});

module.exports = router;
