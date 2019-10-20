class Person {
  readonly name: string;
  readonly age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  public say(): void {
    console.log(`我是${this.name},我${this.age}岁了`);
  }
}

let p = new Person('小虎', 20);
p.say();                     // 正常
p.name = '大虎';       // 报错,name只能在类的内部访问