jQuery.isPlainObject = function(obj) {

    // 类型不是Object的直接返回false
    if(!obj || ({}).toString.call(obj) !== '[object Object]') {
        return false;
    }

    // 没有继承顶级原型对象直接返回false
    if(!Object.prototype.isPrototypeOf(obj)) {
        return false;
    }

    // 构造函数为Object才算OK
    return obj.constructor === Object;
}


jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        arg = arguments, argLen = arg.length,
        targt = arg[0] || {},
        i = 1,
        deep = false;

    /*
    * 如果为布尔值，那么第一个参数为deep，
    * 同时target改为第二个参数，
    * i++，从第三个参数开始遍历。
    * */
    if(typeof target === 'boolean') {
        deep = target;
        target = arg[i] || {};
        i++;
    }

    // target不是对象或者不是函数，那么初始化成对象
    if(typeof target !== 'object' && !jQuery.isFun(target)) {
        target = {};
    }

    // 如果起始遍历下标与length相同，
    // 那么证明只传入了一个对象，
    // 一个对象把内容copy给this。
    if(i === length) {
        target = this;
        i--;
    }

    // 遍历得到每一个对象
    for(; i < length; i++) {

        // 过滤掉null或者undefined的情况
        if((options = arg[i]) != null) {

            // 展开当前对象
            for(name in options) {

                src = target[name];
                copy = options[name];

                // 防止target自己的东西copy给自己，造成无限死循环。
                if(target === copy) {
                    continue;
                }

                // 深拷贝，并且copy的值为数组或对象
                if(deep && copy && jQuery.isObj(copy)) {

                    // 如果被拷贝的是数组，那么判断原值是不是也是数组，
                    // 是的话直接把拷贝的值累加到原值即可。
                    if(jQuery.getObjType(copy) === 'Array') {
                        clone = src && jQuery.getObjType(src) === 'Array'? src: [];
                    }

                    // 如果被拷贝的是对象，那么判断原值是不是也是对象，
                    // 是的话直接把拷贝的值累加到原值即可。
                    else if(jQuery.isObj(copy)) {
                        clone = src && jQuery.isObj(src)? src: {};
                    }

                    // 递归深拷贝
                    target[name] = jQuery.extend(deep, clone, copy);
                }

                else if(copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}
