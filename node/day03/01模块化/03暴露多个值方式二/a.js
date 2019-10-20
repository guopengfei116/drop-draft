'use strict';
// a.js对外暴漏值
module.exports = {
	everyEven(arr) {
		return arr.every(v =>v % 2 === 0);
	},
	someEven(arr) {
		return arr.some(v =>v % 2 === 0);
	}
};
