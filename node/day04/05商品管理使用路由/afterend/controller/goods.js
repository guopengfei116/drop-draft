'use strict';
const express = require('express');
const url = require('url');
const querystring = require('querystring');

// 路由对象
let router = express.Router();

// 数据库对象
let storeDB = require('../model/store_db.js');
let ObjectID = require('mongodb').ObjectID;

// 统一设置响应头
router.use(function(req, resp, next) {
	resp.writeHead(200, {
		'Content-Type': 'application/json; charset=utf-8',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	next();
});

// 获取商品列表
router.get('/api/goods/list', function(req, resp) {
	let urlObj = url.parse(req.url, true);
	let sortObj = null;
	if(urlObj.query.keycode) {
		sortObj = {
			[urlObj.query.keycode]: +urlObj.query.order
		};
	};
	storeDB(db => {
		db.collection('goods').find().sort(sortObj).toArray()
		.then(data => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 删除商品
router.get('/api/goods/delete', function(req, resp) {
	console.log(req.body);
	let urlObj = url.parse(req.url, true);
	storeDB(db => {
		let obj = { '_id': ObjectID(urlObj.query.id) };
		db.collection('goods').remove(obj)
		.then(() => {
			return db.collection('goods').find().toArray();
		})
		.then(data => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 搜索商品
router.get('/api/goods/search', function(req, resp) {
	let urlObj = url.parse(req.url, true);
	let reg = new RegExp(urlObj.query.keycode);
	storeDB(db => {
		db.collection('goods').find({ name: reg }).toArray()
		.then((data) => {
			resp.write(JSON.stringify(data));
			resp.end();
		});
	});
});

// 添加歌曲
router.post('/api/goods/add', function(req, resp) {
	console.log(req.body);
	let urlObj = url.parse(req.url, true);
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	});
	req.on('end', () => {
		data = querystring.parse(data);
		storeDB(db => {
			db.collection('goods').insert(data)
			.then(() => {
				return db.collection('goods').find().toArray();
			})
			.then(data => {
				resp.write(JSON.stringify(data));
				resp.end();
			});
		});
	});
});

module.exports = router;
