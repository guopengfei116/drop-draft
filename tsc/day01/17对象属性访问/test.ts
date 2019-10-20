let obj = { a: 1 };
obj.a = 10;   // 正常
obj.b = 20;   // 报错


class Person {
  constructor(name: string) {
    this.name = name;
  }
}