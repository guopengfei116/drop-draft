var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function log(target, name, msg) {
    console.log(arguments);
    var old = msg.value;
    msg.value = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        console.log('开始执行');
        old.call.apply(old, [this].concat(arg));
        console.log('执行结束');
    };
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.study = function () {
        console.log('学习');
    };
    Person.prototype.eat = function () {
        console.log('吃饭');
    };
    __decorate([
        log
    ], Person.prototype, "study", null);
    __decorate([
        log
    ], Person.prototype, "eat", null);
    return Person;
}());
var caicai = new Person();
caicai.study();
caicai.eat();
