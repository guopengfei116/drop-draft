function createArray() {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return arg;
}
var arr1 = createArray(10, 20, 30); // 正确
var arr2 = createArray('a', 'b', 'c'); // 正确
var arr3 = createArray('a', 'b', 10); // 报错
