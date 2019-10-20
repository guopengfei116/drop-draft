'use strict';
const fs = require('fs');
fs.readFile('a.txt', (err, data) => {
	if(!err) {
		console.log(data); // 取得2进制数据，因为太长所以显示时16进制显示
		console.log(data.toString('utf8')); // 转换为对应的utf8编码字符串
	}else {
		console.log(err.message);
	}
});
