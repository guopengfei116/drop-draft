'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');

// 创建http服务
http.createServer((req, resp) => {

	// url解析，计算文件路径
	let urlObj = url.parse(req.url);
	let filePath = './' + urlObj.pathname;

	// 根据请求读取文件内容并返回
	fs.readFile(filePath, (err, data) => {

		// 文件读取成功返回200，失败返回500
		if(!err) {
			resp.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8'
			});
			resp.write(data);
			resp.end();
		}else {
			resp.writeHead(500);
			resp.end();
		}
	});

}).listen(8888, () => console.log('node is running'));
