// 域名
export const HOST = 'http://vue.studyit.io';

// 接口
export const WEB_API = {

	// 0.1、获取首页轮播图列表
	swipePhotoList: {
		url: HOST + '/api/getlunbo',
		path: '/api/getlunbo',
		type: 'get',
		param: false
	},

	// 1.1、获取新闻列表
	newsList: {
		url: HOST + '/api/getnewslist/',
		path: '/api/getnewslist/',
		type: 'get',
		param: false
	},

	// 1.2、获取指定新闻详情
	newsDetails: {
		url: HOST + '/api/getnew/',
		path: '/api/getnew/',
		type: 'get',
		param: true
	},

	// 2.1、获取图片分类列表，用于图片列表页
	photoCategoryList: {
		url: HOST + '/api/getimgcategory/',
		path: '/api/getimgcategory/',
		type: 'get',
		param: false
	},

	// 2.2、获取图片列表，用于图片列表页
	photoList: {
		url: HOST + '/api/getimages/',
		path: '/api/getimages/',
		type: 'get',
		param: true
	},

	// 2.3、获取指定图片详情，用于图片详情页
	photoDetails: {
		url: HOST + '/api/getimageinfo/',
		path: '/api/getimageinfo/',
		type: 'get',
		param: true
	},

	// 2.4、获取指定图片缩略图列表，用于图片详情页
	photoThumList: {
		url: HOST + '/api/getthumimages/',
		path: '/api/getthumimages/',
		type: 'get',
		param: true
	},

	// 3.1、获取评论列表，页面公共API
	commentList: {
		url: HOST + '/api/getcomments/',
		path: '/api/getcomments/',
		type: 'get',
		param: true
	},

	// 3.2、提交评论，页面公共API
	commentSubmit: {
		url: HOST + '/api/postcomment/',
		path: '/api/postcomment/',
		type: 'post',
		param: true
	},

	// 4.1、获取商品列表，用于商品列表页
	goodsList: {
		url: HOST + '/api/getgoods/',
		path: '/api/getgoods/',
		type: 'get',
		param: true
	},

	// 4.2、获取指定商品图文介绍，用于商品图文介绍页
	goodsDescription: {
		url: HOST + '/api/goods/getdesc/',
		path: '/api/goods/getdesc/',
		type: 'get',
		param: true
	},

	// 4.3、获取指定商品详细信息，用于商品详情页
	goodsDetails: {
		url: HOST + '/api/goods/getinfo/',
		path: '/api/goods/getinfo',
		type: 'get',
		param: true
	},

	// 4.4、获取指定商品缩略图列表
	// 与2.3中获取指定图片缩略图列表的API一致

	// 5.1、获取购物车数据
	shopcartList: {
		url: HOST + '/api/goods/getshopcarlist/',
		path: '/api/goods/getshopcartlist/',
		type: 'get',
		param: true
	}
};
