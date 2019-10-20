'use strict';
const http = require('http');
const url = require('url'); 
let server = http.createServer((req, resp) => {
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	let urlObj = url.parse(req.url, true);
	let queryObj = urlObj.query;
	resp.write('url解析为：' + JSON.stringify(urlObj));
	resp.write('\n');
	resp.write('search解析为：' +  JSON.stringify(queryObj));
	resp.end();
});
server.listen(8888, () => console.log('node is running'));
