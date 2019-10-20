class Person {
  private name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  public say(): void {
    console.log(`我是${this.name}`);
  }
}

let hu = new Person('小虎', 20);
hu.say();        // 正常
hu.name       // 报错,name只能在类的内部访问