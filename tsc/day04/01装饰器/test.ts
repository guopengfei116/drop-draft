function feature(target: any): void {
  target.feature = ['吃', '喝', '拉', '撒', '睡'];
}

@feature
class Person {
  static feature = [];
}
console.log(Person.feature);

@feature
class Dog {}
