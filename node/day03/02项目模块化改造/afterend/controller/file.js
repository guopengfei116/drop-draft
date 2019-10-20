const fs = require('fs');
const mime = require('mime');
const url = require('url');
const path = require('path');

// 导出文件请求处理方法
module.exports = function(req, resp) {

	// 解析url
	let urlObj = url.parse(req.url, true);
	let filePath = path.resolve('./' + urlObj.pathname);

	// 读取文件内容并返回
	fs.readFile(filePath, (err, data) => {
		
		if(!err) {
			// 设置响应头
			let mimeType = mime.lookup(filePath);
			resp.writeHead(200, {
				'Content-Type': mimeType + '; charset=utf-8'
			});
			resp.write(data);
			resp.end();
		}else {
			resp.writeHead(500);
			resp.end();
		}
	});
};
