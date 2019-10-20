'use strict';
const http = require('http');
let responeseData = [{id: 1, name: '法拉利', time: '2013'}, {id: 2, name: '玛莎拉蒂', time: '2015'}];
let server = http.createServer((req, resp) => {
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	if(req.method === 'GET' && req.url === '/api/getprodlist') {
		resp.write(JSON.stringify(responeseData));
	}
	resp.end();
});
server.listen(8888, () => console.log('node is running'));
