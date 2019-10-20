'use strict';
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const mime = require('mime');

// 商品列表数据
let responeseData = [{id: 1, name: '法拉利', time: '2013'}, {id: 2, name: '玛莎拉蒂', time: '2015'}];
let currentMaxId = 2;

// 创建一个http服务
const server = http.createServer((req, resp) => {
	
	// 解析url
	let urlObj = url.parse(req.url, true);

	// 接口请求
	if(req.url.startsWith('/api')) {
		
		// 设置头信息
		resp.writeHead(200, {
			'Content-Type': 'application/json; charset=utf-8',
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*"
		});
		
		// 根据请求方式与url做不同处理与返回
		if(req.method === 'GET') {
		
			// 获取全部商品列表
			if(urlObj.pathname === '/api/getprodlist') {
				resp.write(JSON.stringify(responeseData));
				resp.end();
			}
			
			// 删除商品
			else if(urlObj.pathname === '/api/delproduct') {
				responeseData = responeseData.filter((song) => {
					if(song.id != urlObj.query.id) {
						return true;
					}
				});
				resp.write(JSON.stringify(responeseData));
				resp.end();
			}
			
			// 搜索商品
			else if(urlObj.pathname === '/api/delproduct') {
				let searchResult = responeseData.filter((song) => {
					if(song.id == urlObj.query.id) {
						return true;
					}
				});
				resp.write(JSON.stringify(responeseData));
				resp.end();
			}
			
		}else if(req.method === 'POST') {
			
			// 添加商品
			if(urlObj.pathname === '/api/addproduct') {
				let data = '';
				req.on('data', (chunk) => {
					data += chunk;
				});
				req.on('end', () => {
					data = querystring.parse(data);
					responeseData.push({
						id: ++currentMaxId,
						name: data.name,
						time: Date.now()
					});
					resp.write(JSON.stringify(responeseData));
					resp.end();
				});
			}
		}
	}
	// 文件加载请求
	else if(req.url.startsWith('/frontend') || req.url.startsWith('/public')
		|| req.url.startsWith('/node_modules')) {
		
		// 计算文件类型
		let filePath = __dirname + urlObj.pathname;
		let fileType = mime.lookup(filePath);  
		
		// 文件读取成功返回200，失败返回500
		fs.readFile(filePath, (err, data) => {
			if(!err) {
				resp.writeHead(200, {
					'Content-Type': fileType + '; charset=utf-8'
				});
				resp.write(data);
				resp.end();
			}else {
				resp.writeHead(500);
				resp.end();
			}
		});
	}
	// 其他请求返回404
	else {
		resp.writeHead(404);
		resp.end();
	}
}).listen(8888, () => console.log('node is running'));
