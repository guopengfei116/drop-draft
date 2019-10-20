var a = require('./a.js');
var b = require('./b.js');
var c = require('style-loader!css-loader!../css/index.css');
function con() {
	console.log('哈哈');
}

a.a();
b.b();
con();
console.log(c);
