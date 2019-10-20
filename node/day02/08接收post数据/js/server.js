'use strict';
const http = require('http');
const url = require('url'); 
const querystring = require('querystring');
let server = http.createServer((req, resp) => {
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;	
	});
	req.on('end', () => {
		resp.write('服务端接收到的原数据为：' + data);
		resp.write('\n');
		resp.write('解析后的数据为：' + JSON.stringify(querystring.parse(data)));
		resp.end();
	});
});
server.listen(8888, () => console.log('node is running'));
