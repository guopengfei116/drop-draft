'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// 创建应用，添加中间件
let app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

// 动态设定地址与文件名
var storage = multer.diskStorage({
	// 上传的图片放置到/public/upload目录下
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    // 以时间戳的方式重新生成文件名，防止重复造成的文件覆盖丢失
    filename: function (req, file, cb) {
    	let pathObj = path.parse(file.originalname);
        cb(null, Date.now() + pathObj.ext);
    }
});
let upload = multer({ storage: storage });
// upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

app.post('/file_upload', upload.single('img'), (req, resp, next) => {
	console.log(req.file);
	resp.json({path: `/upload/${req.file.filename}`});
});

app.use(express.static('./frontend'));

// 开启http服务
app.listen(8888, () => console.log('node is running'));
