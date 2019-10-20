var Person = /** @class */ (function () {
    function Person() {
        this.name = '匿名';
    }
    Person.maxAge = 250;
    return Person;
}());
Person.maxAge;
new Person().maxAge;
