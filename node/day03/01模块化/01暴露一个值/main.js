'use strict';
// mian.js加载其他文件
// 加载的如果是一个文件，路径前面必须加上'./或../或/'
let sum = require('./a.js');
let nums = [ 10, 4, 2, 6, 21, 12 ];
console.log(sum(nums));