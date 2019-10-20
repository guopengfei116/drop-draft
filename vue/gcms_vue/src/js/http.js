// 导入Vue，并添加原始http方法
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import { HOST, WEB_API } from './config.js';

// 公共then失败回调
function error(msg) {
	msg = msg || '网络错误，请稍候再试！';
	alert(msg);
}

/**
 *	公共的get请求方法；
 * 请求成功则把数据传入用户指定的成功回调；
 * 请求失败则执行统一的错误回调。
 * */
function get(url, success) {
	Vue.http.get(HOST + url).then(function(rep) {
		rep.body.status === 0? success(rep.body.message): error(rep.body.message);
	}, error);
}

/**
 *	公共的post请求方法；
 * 请求成功则把数据传入用户指定的成功回调；
 * 请求失败则执行统一的错误回调。
 * */
function post(url, data, success) {
	var config = { emulateJSON: true };
	Vue.http.post(HOST + url, data, config).then(function(rep) {
		rep.body.status === 0? success(rep.body.message): error(rep.body.message);
	}, error);
}

// 存放项目所需的所有接口方法
let http = {};

/**
 * 1、遍历所有接口的配置，
 * 2、给每个接口在http对象身上添加一个对应方法。
 * 2.1、根据接口类型发送相应的get、post请求
 * */
for(let apiName in WEB_API) {
	
	// 每个接口在http对象身上添加一个对应方法
	http[apiName] = function(path, data, success) {
		
		// 保证最后一个参数为成功回调：如这样传参 (url, success) || (success)
		success = arguments[arguments.length - 1];
		
		// 如果发送请求时不需要在url中加参数，那么直接从配置中取path即可
		// 这样用户就只需传入一个成功回调，或者一个数据加一个回调即可。
		if(!WEB_API[apiName].param) {
			data = typeof path === 'object'? path: null;  // 如果没有传path，那么第一个数据为data
			path = WEB_API[apiName].path;
		}
		
		// 根据接口类型发送相应的请求
		switch (WEB_API[apiName].type) {
			case 'get': 
				get(path, success);
				break;
			case 'post':
				get(path, data, success);
				break;
		}
	};
}

export default http;
