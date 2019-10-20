var gender;
(function (gender) {
    gender[gender["\u7537"] = 0] = "\u7537";
    gender[gender["\u5973"] = 1] = "\u5973";
})(gender || (gender = {}));
;
gender[0] = '公'; // 报错提示
gender[2] = '人妖'; // 报错提示
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum[Enum["C"] = 2] = "C";
})(Enum || (Enum = {}));
console.log(Enum.A);
console.log(Enum.B);
