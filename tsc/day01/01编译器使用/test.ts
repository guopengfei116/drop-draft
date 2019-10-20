class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`${this.name}今年${this.age}岁了`);
  }
}
let xiaoming = new Person('小明', 16);
xiaoming.speak();