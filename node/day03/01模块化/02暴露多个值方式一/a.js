'use strict';
// a.js对外暴漏值
exports.min = function(arr) {
	return Math.min(...arr);
};
exports.max = function(arr) {
	return Math.max(...arr)
};
