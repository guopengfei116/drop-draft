// 导出多个东东
exports.error = function error(msg) {
	console.error(msg);
};
exports.log = function log(msg) {
	console.log(msg);
};

// 也可以使用导出一个对象的方式导出多个东东
//function subtraction(a - b) {
//	console.log(a - b);
//}
//
//function multiplication(a * b) {
//	console.log(a *b);
//}
//
//function division(a / b) {
//	console.log(a / b);
//}
//
//module.exports = {
//	subtraction: subtraction,
//	multiplication: multiplication,
//	division: division
//};
