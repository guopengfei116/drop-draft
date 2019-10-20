function sum(a: number, b?: number, c: number = 50): number  {
  return b? a + b: a;
}

sum(5);                    // 正常
sum(5, 8, 10);          // 正常
sum(5, 8, 10, 20);     // 报错