'use strict';
// mian.js加载其他文件
let math = require('./a.js');
var nums = [ 10, 4, 2, 6, 21, 12 ];
console.log(math.max(nums));
console.log(math.min(nums));
