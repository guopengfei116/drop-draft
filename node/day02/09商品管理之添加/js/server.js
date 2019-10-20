'use strict';
const http = require('http');
const url = require('url'); 
const querystring = require('querystring');

let responeseData = [{id: 1, name: '法拉利', time: '2013'}, {id: 2, name: '玛莎拉蒂', time: '2015'}];
let currentId = 2;

let server = http.createServer((req, resp) => {
	
	// 统一的接口响应头与基本数据格式
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	
	// 解析url与search
	let urlObj = url.parse(req.url, true);
	let queryObj = urlObj.query;
	
	// 根据请求方式与url做不同处理与返回
	if(req.method === 'GET') {
		
		// 获取列表
		if(req.url === '/api/getprodlist') {
			resp.write(JSON.stringify(responeseData));
		}
		// 删除
		else if(urlObj.pathname === '/api/delproduct') {
			responeseData = responeseData.filter((song) => {
				if(song.id != queryObj.id) {
					return true;
				}
			});
			resp.write(JSON.stringify(responeseData));
		}
		resp.end();
		
	}else if(req.method === 'POST') {
		
		// 添加
		if(urlObj.pathname === '/api/addproduct') {
			let data = '';
			req.on('data', (chunk) => {
				data += chunk;
			});
			req.on('end', () => {
				data = querystring.parse(data);
				responeseData.push({
					id: ++currentId,
					name: data.name,
					time: Date.now()
				});
				resp.write(JSON.stringify(responeseData));
				resp.end();
			});
		}
	}
});
server.listen(8888, () => console.log('node is running'));
