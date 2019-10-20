'use strict';
const fs = require('fs');
fs.writeFile('a.txt', 'hello word', (err) => {
	if(!err) {
		console.log('文件写入成功');
	}else {
		console.log(err.message);
	}
});
