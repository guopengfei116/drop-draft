const url = require('url');
const querystring = require('querystring');

// 歌曲数据管理对象
const GoodsManager = require('../model/goods_manager.js');
let goodsManager = new GoodsManager();

// 导出api处理方法
module.exports = function(req, resp) {
	
	// 解析url
	let urlObj = url.parse(req.url, true);
	
	// 返回数据
	resp.writeHead(200, {
		'Content-Type': 'application/json; charset=utf-8',
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*"
	});
	
	// 根据请求方式与url做不同处理与返回
	if(req.method === 'GET') {
		
		// 获取商品列表
		if(req.url === '/api/getprodlist') {
			goodsManager.getAll(data => {
				resp.write(JSON.stringify(data));
				resp.end();
			});
		}
		// 删除商品
		else if(urlObj.pathname === '/api/delproduct') {
			goodsManager.del(urlObj.query.id, data => {
				resp.write(JSON.stringify(data));
				resp.end();
			});
		}
		// 搜索商品
		else if(urlObj.pathname === '/api/searchproduct') {
			
			resp.write(JSON.stringify(goodsDataManager.search(urlObj.query.name)));
		}
		
		
	}else if(req.method === 'POST') {
		
		// 添加歌曲
		if(urlObj.pathname === '/api/addproduct') {
			let data = '';
			req.on('data', (chunk) => {
				data += chunk;
			});
			req.on('end', () => {
				data = querystring.parse(data);
				goodsDataManager.add(data.name);
				resp.write(JSON.stringify(goodsDataManager.getAll()));
				resp.end();
			});
		}
	}
};
