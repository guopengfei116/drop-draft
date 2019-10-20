enum gender { '男', '女' };
gender[0] = '公'     // 报错提示
gender[2] = '人妖'  // 报错提示

enum Enum {
  'A',
  'B',
  'C'
}

declare enum Enum {
    'A' = 1,
    'B',
    'C' = 2
}
console.log(Enum.A)
console.log(Enum.B)
