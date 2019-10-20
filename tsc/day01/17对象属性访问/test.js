var obj = { a: 1 };
obj.a = 10; // 正常
obj.b = 20; // 报错
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
