'use strict';
const express = require('express');

// 创建一个express-web应用，
// 这个app实际上就是咱们传入http.createServer那个回调
// 只不过express对这个函数做了各种增强和封装，方便我们使用
let app = express();

// 请求处理(也叫路由)
app.get('/', (req, resp) => {
	resp.end('Hello World!');
});

// 开启http服务
app.listen(8888, () => console.log('走你!'));
