function sumAll(...arg: number[]): number {
  return arg.reduce((sum, v) => {
    return sum + v;
  }, 0);
}

sumAll(1, 2, 3, 4, 5);
