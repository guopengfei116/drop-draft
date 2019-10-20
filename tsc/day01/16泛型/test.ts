function createArray<Type>(...arg: Type[]): Type[] {
  return arg;
}

let arr1 = createArray<number>(10, 20, 30);  // 正确
let arr2 = createArray<string>('a', 'b', 'c')          // 正确
let arr3 = createArray<string>('a', 'b', 10)          // 报错