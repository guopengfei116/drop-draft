'use strict';
const http = require('http');
const apiHandler = require('./afterend/controller/api.js');
const fileHandler = require('./afterend/controller/file.js');

// 创建一个http服务
http.createServer((req, resp) => {

	// 接口请求
	if(req.url.startsWith('/api')) {
		apiHandler(req, resp);
	}
	// 文件加载请求
	else if(req.url.startsWith('/frontend') || req.url.startsWith('/public')
		|| req.url.startsWith('/node_modules')) {
		fileHandler(req, resp);
	}
	// 其他请求返回404
	else {
		resp.writeHead(404);
		resp.end();
	}

}).listen(8888, () => console.log('node is running'));
