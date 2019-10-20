function sum(a, b, c) {
    if (c === void 0) { c = 50; }
    return b ? a + b : a;
}
sum(5); // 正常
sum(5, 8, 10); // 正常
sum(5, 8, 10, 20); // 报错
