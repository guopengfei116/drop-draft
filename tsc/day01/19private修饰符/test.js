var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function () {
        console.log("\u6211\u662F" + this.name);
    };
    return Person;
}());
var hu = new Person('小虎', 20);
hu.say(); // 正常
hu.name; // 报错,name只能在类的内部访问
