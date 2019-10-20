'use strict';
const url = require('url');
const querystring = require('querystring');

// 歌曲数据管理对象
let storeDB = require('../model/store_db.js');
let ObjectID = require('mongodb').ObjectID;

// 导出api处理方法
module.exports = function(req, resp, next) {

	// 解析url
	let urlObj = url.parse(req.url, true);
	
	// 返回数据
	resp.writeHead(200, {
		'Content-Type': 'application/json; charset=utf-8',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	
	// 根据请求方式与url做不同处理与返回
	if(req.method === 'GET') {
		
		// 获取商品列表
		if(urlObj.pathname === '/api/goods/list') {
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
		}
		// 删除商品
		else if(urlObj.pathname === '/api/goods/delete') {
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
		}
		// 搜索商品
		else if(urlObj.pathname === '/api/goods/search') {
			let reg = new RegExp(urlObj.query.keycode);
			storeDB(db => {
				db.collection('goods').find({ name: reg }).toArray()
				.then((data) => {
					resp.write(JSON.stringify(data));
					resp.end();
				});
			});
		}
		
	}else if(req.method === 'POST') {
		
		// 添加歌曲
		if(urlObj.pathname === '/api/goods/add') {
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
		}
	}
	
	// 没有满足条件则交由下一个的中间件处理
	next();
};
