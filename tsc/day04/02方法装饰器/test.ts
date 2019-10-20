function log(target: any, name: string, msg: any): void {
  console.log(arguments);
  let old = msg.value;
  msg.value = function(...arg: any[]) {
    console.log('开始执行');
    old.call(this, ...arg);
    console.log('执行结束');
  }
}

class Person {

  @log
  study(): void {
    console.log('学习');
  }

  @log
  eat(): void {
    console.log('吃饭');
  }
}

let caicai = new Person();
caicai.study();
caicai.eat();