// { 1: {}, 2: {}, sessionID: sessionObj, ... }
let sessions = {};

// 创建一个session，得到新建session的ID
exports.create = function(userData) {
	let id = Date.now();
	sessions[id] = Object.assign({}, userData);
	return id;
};

// 获取session
exports.get = function(id) {
	return sessions[id];
};
