// copy继承函数
function extend(obj1, obj2) {
    for (var key in obj2) {
        // obj2继承的属性不copy
        if (obj2.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        }
    }
}

// util对象，里面有很多工具方法
var util = {
    extend: extend,
    
};