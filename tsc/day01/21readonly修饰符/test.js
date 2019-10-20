var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.say = function () {
        console.log("\u6211\u662F" + this.name + ",\u6211" + this.age + "\u5C81\u4E86");
    };
    return Person;
}());
var p = new Person('小虎', 20);
p.say(); // 正常
p.name = '大虎'; // 报错,name只能在类的内部访问
