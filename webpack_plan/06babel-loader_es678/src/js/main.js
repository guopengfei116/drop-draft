console.log(Promise)
console.log(Set)

class Person {
  run() {
    console.log(123);
  }
}
new Person().run();

async function test() {
  var a = await 123456;
  console.log(a);
}
test();
