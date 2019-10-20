(function (w) {

    // 该对象，用来记录一些新方法是否可用
    // 每一个方法的实现思路：
    // 被判断的方法 + '',得到该方法的字符串方法体，
    // 通过查看这个字符串方法体中是否含有'[native code]'来得知浏览器有没有对该方法进行实现。
    var support = {
        getElementsByClassName: (document.getElementsByClassName + '').indexOf('[native code]') > -1,
        querySelectorAll: (document.querySelectorAll + '').indexOf('[native code]') > -1,
        trim: (String.prototype.trim + '').indexOf('[native code]') > -1,
        arrIndexOf: (Array.prototype.indexOf + '').indexOf('[native code]') > -1
    };

    // 数组去重
    function unique( arr ) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            // 新数组没有这个值，就push进来
            // 原生写法result.indexOf(arr[i]);
            // 自己实现的写法indexOf(result, arr[i]);
            if (indexOf(result, arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    /*
     * 兼容的数组indexOf
     * param { arr : Array } 被判断的数组
     * param { val } 查看数组中是否含有这个值
     * param { startIndex : number } 从数组中指定的下标开始查找
     * */
    function indexOf( arr, val, startIndex ) {
        startIndex = startIndex || 0;

        // 优先使用内置的indexOf
        if ( support.arrIndexOf ) {
            return arr.indexOf(val);
        }

        // 遍历arr，看看是否含有val
        for (var i = startIndex, len = arr.length; i < len; i++) {
            if (arr[i] === val) {
                // 如果存在，那么模仿原生的indexOf方法处理方式，
                // 返回该值在数组中的下标
                return i;
            }
        }

        // 如果不存在某个值，为了和原生的indexOf保持一致，所以也返回-1
        return -1;
    }

    /*
     * 兼容性的trim方法，用来去除字符串两端的空白。
     * ' a bc ' ==> /^\s*|\s*$/g
     * */
    function trim( str ) {

        // 过滤空与非字符串
        if (!str || typeof str !== 'string') {
            return '';
        }

        // 优先使用原生的
        if (support.trim) {
            return str.trim();
        }

        // 自己实现功能
        return str.replace(/^\s*|\s*$/g, '');
    }

    // 通过className获取元素
    // 进行了兼容性处理
    function byClass( className, arr ) {
        arr = arr || [];

        var tags, i, len;

        // 优先使用原生的getElementsByClassName方法
        if (support.getElementsByClassName) {
            arr.push.apply(arr, document.getElementsByClassName(className));
            return arr;
        }

        /*
         * 遍历所有元素，把含有指定className的元素push到arr中
         * */
        tags = document.getElementsByTagName('*');
        for (i = 0, len = tags.length; i < len; i++) {
            // 通过给元素className的两边添加空格，让判断变得统一
            if ((' ' + tags[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                arr.push(tags[i]);
            }
        }
        return arr;
    }

    /*
     * Function ｛ select ｝ 选择器函数
     * param { selector : string } 选择器
     * param { arr : Array } 指定获取的元素所存放的数组
     * */
    function select( selector, arr ) {
        arr = arr || [];

        var firstChar, temTag, selectorNew, selectors,
            i, len;

        // 处理'' || !string
        if (!selector || typeof selector !== 'string') {
            return [];
        }

        // 优先使用浏览器内置的querySelectorAll方法
        if (support.querySelectorAll) {
            arr.push.apply(arr, document.querySelectorAll(selector));
            return arr;
        }

        // 先把selector通过','分割成数组
        selectors = selector.split(',');

        for (i = 0, len = selectors.length; i < len; i++) {

            // 获取selector第一个字符，将来用作区分选择器的类型
            firstChar = trim(selectors[i]).charAt(0);
            // 去掉selector的第一个字符
            selectorNew = trim(selectors[i]).slice(1);

            if (firstChar === '#') {
                // document.getElementById可能返回null，需要过滤掉
                if (temTag = document.getElementById(selectorNew)) {
                    arr.push(temTag);
                }
            }else if (firstChar === '.') {
                arr.push.apply(arr, byClass(selectorNew));
            }else if (firstChar === '*') {
                arr.push.apply(arr, document.getElementsByTagName('*'));
            }else {
                arr.push.apply(arr, document.getElementsByTagName(trim(selectors[i])));
            }
        }

        // 过滤掉重复的元素再返回
        return unique(arr);
    }

    // 全局暴漏select方法
    w.select = select;
})(window);