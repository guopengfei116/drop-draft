'use strict';
const http = require('http');
const url = require('url'); 
let responeseData = [{id: 1, name: '法拉利', time: '2013'}, {id: 2, name: '玛莎拉蒂', time: '2015'}];
let server = http.createServer((req, resp) => {
	
	// 统一的接口响应头与基本数据格式
	resp.writeHead(200, {
		"Content-Type": "application/json;charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	let respData = {
		status: 200,
		result: null
	};
	
	// 解析url与search
	let urlObj = url.parse(req.url, true);
	let queryObj = urlObj.query;
	
	// 根据method与url做不同处理与返回
	if(req.method === 'GET') {
		
		// 获取歌曲列表
		if(req.url === '/api/getprodlist') {
			resp.write(JSON.stringify(responeseData));
		}
		// 删除歌曲
		else if(urlObj.pathname === '/api/delproduct') {
			responeseData = responeseData.filter((song) => {
				if(song.id != queryObj.id) {
					return true;
				}
			});
			resp.write(JSON.stringify(responeseData));
		}
		resp.end();
		
	}else if((req.method === 'POST')) {
		
	}
});
server.listen(8888, () => console.log('node is running'));
