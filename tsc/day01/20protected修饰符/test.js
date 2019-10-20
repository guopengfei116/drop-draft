var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    Animal.prototype.say = function () {
        console.log("\u6211\u662F" + this.name + ",\u6211" + this.age + "\u5C81\u4E86");
    };
    return Animal;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Person.prototype.sayName = function () {
        console.log("\u6211\u662F" + this.name); // 正常
    };
    Person.prototype.sayAge = function () {
        console.log("\u6211" + this.age + "\u5C81\u4E86"); // 报错
    };
    return Person;
}(Animal));
var p = new Person('小芳', 18);
p.say(); // 正常
p.name; // 报错,name只能在Animal与其子类中使用
p.age; // 报错,age只能在Animal类中使用
