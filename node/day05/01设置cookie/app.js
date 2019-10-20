'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sessions = require('./afterend/model/sessions.js');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./node_modules'));
app.use(express.static('./public'));
app.use(express.static('./frontend'));

// 注册用户
app.post('/register', (req, resp, next) => {
	console.log(req.body);
	resp.json({msg: '注册成功！'});
});

// 登陆，验证用户名密码是否正确，正确的话给用户下发cookie令牌，
// 以后拿着令牌就可以调用其他接口了。
app.post('/login', (req, resp, next) => {
	let sessionID = sessions.create(req.body);
	resp.cookie('SESSIONID', sessionID, {
		path: '/',
		maxAge: 1000 * 60 * 60 * 24 * 10
	});
	resp.json({msg: '登陆成功！'});
});

// 获取商品列表数据，首先验证cookie令牌是否正确，
// 正确代表这是一个合法已登陆的用户，给用户返回他想要的信息。
app.get('/api/goods/list', (req, resp, next) => {
	let session = sessions.get(req.cookies.SESSIONID);
	if(session) {
		resp.json(session);
	}else {
		resp.sendStatus(401, '权限不足');
	}
});

// 开启http服务
app.listen(8888, () => console.log('node is running'));
