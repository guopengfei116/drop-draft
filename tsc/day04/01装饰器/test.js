var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function feature(target) {
    target.feature = ['吃', '喝', '拉', '撒', '睡'];
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.feature = [];
    Person = __decorate([
        feature
    ], Person);
    return Person;
}());
console.log(Person.feature);
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog = __decorate([
        feature
    ], Dog);
    return Dog;
}());
