'use strict';
const http = require('http');
let server = http.createServer((req, resp) => {
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	resp.write('您请求的方法为：' + req.method);
	resp.write('\n');
	resp.write('您请求的url为：' + req.url);
	resp.end();
});
server.listen(8888, () => console.log('node is running'));
