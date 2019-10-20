//function sum(a: number, b: number): number  {
//return a + b;
//}
//
//sum(10, 20);       // 正常
//sum(5);              // 报错
//sum(5, 8, 10);     // 报错
function sumAll() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return arg.reduce(function (sum, v) {
        return sum + v;
    }, 0);
}
sumAll(1, 2, '', 4, 5);
