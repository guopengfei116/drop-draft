'use strict';
// mian.js加载其他文件
let isEven = require('./a.js');
var nums = [ 10, 4, 2, 6, 21, 12 ];
console.log(isEven.everyEven(nums));
console.log(isEven.someEven(nums));
