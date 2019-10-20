'use strict';
// a.js对外暴漏值
module.exports = function(arr) {
	return arr.reduce((v1, v2) => v1 + v2 );
};
