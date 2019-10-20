'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const goodsHandler = require('./afterend/controller/goods.js');

// 创建express-web应用
let app = express();

// 第三方中间件解析FormData数据，数据使用rep.body获取
app.use(bodyParser.urlencoded({ extended: false }));

// 静态文件处理
app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(express.static('./frontend'));

// api处理
app.all(/^\/api\/goods\/.*/, goodsHandler);

// 开启http服务
app.listen(8888, () => console.log('node is running'));
