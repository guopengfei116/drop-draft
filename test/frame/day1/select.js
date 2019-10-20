// 选择器
var select = (function () {
    var supportReg = /\{\s*\[native code/;
    var support = {
        getElementsByClassName: supportReg.test(document.getElementsByClassName),
        querySelectorAll: supportReg.test(document.querySelectorAll + '')
    };

    // class选择器
    // 注意：className两边加了空格后，因为优先级问题需要先整体加()，在调用indexOf方法。
    function getByClass( className ) {

        // 优先使用内置方法
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(className);
        }

        // 兼容处理
        var i, len, arr = [];
        var tags = document.getElementsByTagName('*');

        // 遍历所有元素，找到拥有指定class的元素
        for (i = 0, len = tags.length; i < len; i++) {
            if ((' ' + tags[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                arr.push(tags[i]);
            }
        }

        return arr;
    }

    // 按照之前的套路，把byId，byTagName，byClassName，byAll方法封装为一个方法。

    var selectorReg = /^(\*)|\#([\w\-]+)|\.([\w\-]+)|([\w]+)$/;
    /*
     * Function { select } 选择器函数
     * param { selector : string } 选择器
     * param { arr : Array } 指定用于存放元素的数组
     * */
    function select ( selector, arr ) {
        arr = arr || [];

        var selectorNew, temResult, match;

        // ''、!string
        if (!selector || typeof selector !== 'string') {
            return;
        }

        // 优先使用浏览器新特性querySelectorAll
        if ( document.querySelectorAll ) {
            arr.push.apply(arr, document.querySelectorAll(selector));
            return arr;
        }

        // 字符串匹配，过滤null
        match = selectorReg.exec(selector);
        if (!match) {
            return;
        }

        // 获取元素
        if (selectorNew = match[1]) {
            arr.push.apply(arr, document.getElementsByTagName(selectorNew));
        }
        else if (selectorNew = match[2] ){
            // 过滤null
            if (temResult = document.getElementById(selectorNew)) {
                arr.push(temResult);
            }
        }
        else if (selectorNew = match[3]){
            //arr.push.apply(arr, document.getElementsByClassName(selectorNew));
            arr.push.apply(arr, getByClass(selectorNew));
        }
        else if (selectorNew = match[4]){
            arr.push.apply(arr, document.getElementsByTagName(selectorNew));
        }

        return arr;
    }

    return select;
})();

/*
 * 注意：
 * 1、获取全部标签通过getElementsByTagName来解决
 * 2、不在需要截取selector第一个字符，直接按照分组顺序从正则中获取即可
 * 3、如果exec匹配不到，那么会返回null，为防止报错需要先进行过滤判断
 * 4、优先使用浏览器新特性querySelectorAll，IE8开始支持。
 * */