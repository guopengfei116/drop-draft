class Animal {
  protected name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  public say(): void {
    console.log(`我是${this.name},我${this.age}岁了`);
  }
}

class Person extends Animal {
  public sayName(): void {
    console.log(`我是${this.name}`);  // 正常
  }
  public sayAge(): void {
    console.log(`我${this.age}岁了`);  // 报错
  }
}

let p = new Person('小芳', 18);
p.say();        // 正常
p.name       // 报错,name只能在Animal与其子类中使用
p.age          // 报错,age只能在Animal类中使用