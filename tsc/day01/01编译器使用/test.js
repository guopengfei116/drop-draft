var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.speak = function () {
        console.log(this.name + "\u4ECA\u5E74" + this.age + "\u5C81\u4E86");
    };
    return Person;
}());
var xiaoming = new Person('小明', 16);
xiaoming.speak();
