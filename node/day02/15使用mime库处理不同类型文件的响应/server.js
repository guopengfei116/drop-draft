'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime');

// 创建一个http服务
http.createServer((req, resp) => {

	// url解析，计算文件路径
	let urlObj = url.parse(req.url);
	let filePath = __dirname + urlObj.pathname;
	
	// 只允许客户端访问public目录下文件
	if(req.url.startsWith('/public')) {
		
		// 计算文件类型
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
	// 其他请求一律返回404
	else {
		resp.writeHead(404);
		resp.end();
	}
}).listen(8888, () => console.log('node is running'));
