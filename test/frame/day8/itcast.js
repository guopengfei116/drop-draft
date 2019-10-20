(function (w) {

    // 解析html字符串
    function parseHTML( html, arr ) {
        arr = arr || [];

        // 利用innerTHML的特性让浏览器把html转换为DOM
        var div = document.createElement('div');
        div.innerHTML = html;

        // 遍历转换后的DOM元素，依次添加到arr中
        for (var i = 0, len = div.childNodes.length; i < len; i++) {
            arr.push(div.childNodes[i]);
        }

        return arr;
    }



    var arr = [],
        obj = {},
        slice = arr.slice,
        push = arr.push,
        toString = obj.toString,
        winLoadFns = [],
        isWinLoad = false;

    // 工厂函数$
    function itcast( selector ) {
        return new itcast.fn.init( selector );
    }

    // 给itcast的原型起和简称
    itcast.fn = itcast.prototype = {

        constructor: itcast,

        //  作为itcast对象的标识，只要能给访问这个属性，就认为是itcast对象
        selector: "",

        // itcast对象的默认length值，
        // 顺便兼容处理了IE7不支持给非伪数组对象push属性值的问题
        length: 0,

        // 把itcast对象转变为数组返回
        toArray: function () {
            return slice.call(this);
        },

        get: function ( num ) {

            // 不传参，或null，把itcast对象变成数组返回
            if ( num == null ) {
                return this.toArray();
            }

            // 如果是数值，返回对应下标的值
            if (itcast.isNum(num)) {
                return num < 0? this[ this.length + num ] : this[num];
            }
        },

        eq: function ( num ) {

            // 不管传入什么参数，
            // 返回的都是一个新的itcast对象,
            // 所以一开始就把这个对象创建好。
            var new$ = itcast(), dom;

            // 如果是数值，把this中指定下标的dom添加到新的itcast对象身上
            if (itcast.isNum(num)) {

                // 如果没获取到dom，那么不做添加
                if (dom = this.get(num)) {
                    new$[0] = dom;
                    new$.length = 1;
                }
            }

            return new$;
        },

        each: function ( fn ) {
            itcast.each( this, fn );
            return this;
        },

        map: function ( fn ) {
            itcast.map( this, fn );
            return this;
        }
    };

    // onload事件触发时，依次调用winLoadFns里面存储的函数
    window.onload = function () {

        // onload事件触发了
        isWinLoad = true;

        // 执行所有之前存储的函数
        $.each(winLoadFns, function ( key, val ) {
            val();
        });
    };


    // 真正的构造函数隐居在此
    var init = itcast.fn.init = function ( selector ) {

        // 如果是函数
        if (itcast.isFunction(selector)) {

            // 如果onload事件已经触发了，那么直接调用该函数即可
            if (isWinLoad) {
                selector();
            }else {
                // 如果onload事件未触发,
                // 那么把这个函数push到winLoadFns里面等待onload触发时调用
                winLoadFns.push( selector );
            }
        }

        // 如果是字符串，
        // 要么是创建html元素，
        // 要么是获取元素
        else if (itcast.isString(selector)) {

            // 如果selector为html字符串，那么调用parseHTML处理
            if (itcast.isHtml(selector)) {

                // 不能直接return结果，因为这个结果是数组，不能使用JQ原型上的方法
                //return parseHTML( selector );

                // 把parseHTML的结果通过push添加到this身上,
                // 因为push可以自动的给实例按照下标的方式添加属性值
                push.apply(this, parseHTML( selector ))

            }else {

                // 不能直接return结果，因为这个结果是数组，不能使用JQ原型上的方法
                push.apply(this, select( selector ));
            }
        }

        // 如果是原生DOM对象
        else if (itcast.isDOM( selector )) {
            this[0] = selector;
            this.length = 1;
        }

        // 如果传入的是isItcast对象，那么原物返回
        else if ( itcast.isItcast( selector ) ) {
            return selector;
        }

        // 如果传入的是数组，把每一项值通过push copy到实例身上
        else  if ( itcast.isArray( selector ) ) {
            push.apply(this, selector);
        }

        else {
            this[0] = selector;
            this.length = 1;
        }

    };

    itcast.extend = itcast.fn.extend = function( target, souorce ) {

        // 如果只传了一个对象，则把这个对象的内容copy到this身上
        if (arguments.length === 1) {
            souorce = target;
            target = this;
        }

        // 把第二个对象内容copy到第一个对象中
        for (var key in souorce) {
            target[key] = souorce[key];
        }
    };

    // 给itcast添加一些类型判断的方法
    itcast.extend({
        // 判断一个数据是不是Function类型
        isFunction: function ( obj ) {
            return typeof obj === 'function';
        },

        // 判断是不是itcast实例
        isItcast: function ( obj ) {
            // obj必须是对象，并且可以访问selector属性
            return  typeof obj === 'object' && 'selector' in obj;
        },

        // 判断一个数据是不是string类型
        isString: function ( obj ) {
            return typeof obj === 'string';
        },

        // 判断是不是数组
        isArray: function ( obj ) {
            return toString.call( obj ) === '[object Array]';
        },

        isNum: function ( obj ) {

            // 过滤NaN
            if (obj !== obj) {
                return false;
            }
            return typeof obj === 'number';
        },

        // 判断一个数据是不是html字符串
        isHtml: function ( obj ) {
            return (obj.charAt(0) === '<' &&
            obj.charAt(obj.length - 1) === '>' &&
            obj.length > 3);
        },

        // 判断是不是DOM对象，通过查看这个对象是否有nodeType属性
        isDOM: function ( obj ) {
            return !!obj && !!obj.nodeType;
        },

        /*
         * 模拟JQ实现each
         * */
        each: function (obj, fn) {
            // 数组 或者 伪数组
            if (({}).toString.call(obj) === '[object Array]' || obj.length > 0) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    // 为了和JQ保持一样，同样的把fn函数内的this改为对应的value；
                    // 把遍历到的index与value以调用的方式依次传给回调。
                    if ( fn.call(obj[i], i, obj[i]) === false ) {
                        break;
                    }
                }
            }else {
                for (var key in obj) {
                    // 为了和JQ保持一样，同样的把fn函数内的this改为对应的value；
                    // 把遍历到的key与value以调用的方式依次传给回调。
                    if ( fn.call(obj[key], key, obj[key]) === false ) {
                        break;
                    }
                }
            }
        },

        /*
         * 模拟JQ实现map
         * */
        map: function (obj, fn) {
            var i, len, tem, result = [];

            // 数组 或 伪数组
            if (({}).toString.call(obj) === '[object Array]' || obj.length > 0) {
                for (i = 0, len = obj.length; i < len; i++) {
                    // map和each的区别就是map要使用回调函数的返回值
                    tem = fn(obj[i], i);
                    // 过滤掉null 和 undefined
                    if ( tem != null ) {
                        result.push(tem);
                    }
                }
            }else {
                for (i in obj) {
                    // map和each的区别就是map要使用回调函数的返回值
                    tem = fn(obj[i], i);
                    // 过滤掉null 和 undefined
                    if ( tem != null ) {
                        result.push(tem);
                    }
                }
            }
            return result;
        }
    });

    // 原型上添加DOM方法
    itcast.fn.extend({

        // 把调用该方法的N多元素  分别  添加到selector对应的N多元素里
        // 把调用该方法的N多元素  添加到selector中的1个元素里
        appendTo: function ( selector ) {
            /*
             * $('p').appendTo('div');
             * 执行过程：
             * 外面循环的是被添加的元素，里面循环的是元素被添加到的目的地。
             *
             * 1、外面第一次循环遍历到第一个p元素，
             * 2、然后在里面的循环中遍历2个div，把p的2个clone版本分别添加到2个div中；
             *
             * 3、外面第二次循环遍历到第二个p元素，
             * 4、然后在里面的循环中再遍历2个div，把第二个p的2个clone版本分别再添加到2个div中；
             * */

            var i = 0, len = this.length,
                j, lenJ, result = [], dom;

            // 不管传入的是DOM、选择器、实例对象，统一使用itcast包装成实例对象处理。
            var new$ = itcast( selector );

            // 遍历this中的每一个元素，分别添加到new$中的每一个元素。
            for ( ; i < len; i++) {

                // 遍历new$
                for ( j = 0, lenJ = new$.length; j < lenJ; j++ ) {

                    // 使用一个中间变量先把要添加的元素保存一下，
                    // 然后push到result中，append到指定元素中。
                    // 三元运算含义：第一次把我自己添加进去，以后就添加我的clone版本
                    dom = j === 0? this[i] : this[i].cloneNode( true );
                    result.push( dom );

                    // 依次把this中的元素添加到new$中的每一个元素
                    new$[j].appendChild( dom );
                }

            }

            // 把所有新添加的元素，包装成一个itcast对象返回
            return itcast( result );

            /*// 假设selector是DOM
             // 遍历this里面的DOM元素，依次添加到selector里面
             for ( ; i < len; i++) {
             selector.appendChild( this[i] );
             }*/

            /*// 假设itcast对象
             // 遍历this里面的DOM元素，依次添加到selector里面
             for ( ; i < len; i++) {

             // 遍历selector里面所有的元素
             for ( j = 0; j < lenJ; j++ ) {

             // 依次把this中的元素添加进去
             selector[j].appendChild( this[i].cloneNode( true ) );
             }

             }*/

            // 假设传入的是选择器,
            // 那么我们自己可以通过这个选择器得到itcast实例对象，
            // 那么处理方式就和上面一样了。

            // 遍历this里面的DOM元素，依次添加到selector里面
            /*var new$ = itcast( selector );
             var k = 0, lenK = new$.length;

             for ( ; i < len; i++) {

             // 遍历selector里面所有的元素
             for ( k = 0; k < lenK; k++ ) {

             // 依次把this中的元素添加进去
             new$[k].appendChild( this[i].cloneNode( true ) );
             }

             }*/
        },

        // 把selector对应的N多元素，添加到调用该方法的this中
        append: function ( selector ) {

            // 如果是字符串，并且不是hmtl字符串，那么把它作为文本添加到元素中
            if ( itcast.isString( selector ) && !itcast.isHtml( selector ) ) {

                // 外面的this，是append调用者，即实例对象
                this.each(function () {

                    // 里面的this，是each遍历到的实例对象中的每一个value值
                    this.appendChild( document.createTextNode( selector ) );
                });
            }

            // 否则把 selector 对应的元素 添加 到 this 对应的元素中
            else {
                var new$ = itcast( selector );
                new$.appendTo( this );
            }

            return this;
        },

        // 把this所以的元素添加到selector所有的元素的最前面
        prependTo: function ( selector ) {
            /*
             * $('p').appendTo('div');
             * 执行过程：
             * 外面循环的是被添加的元素，里面循环的是元素被添加到的目的地。
             *
             * 1、外面第一次循环遍历到第一个p元素，
             * 2、然后在里面的循环中遍历2个div，把p的2个clone版本分别添加到2个div中；
             *
             * 3、外面第二次循环遍历到第二个p元素，
             * 4、然后在里面的循环中再遍历2个div，把第二个p的2个clone版本分别再添加到2个div中；
             * */

            var i = 0, len = this.length,
                j, lenJ, result = [], dom;

            // 不管传入的是DOM、选择器、实例对象，统一使用itcast包装成实例对象处理。
            var new$ = itcast( selector );

            // 遍历this中的每一个元素，分别添加到new$中的每一个元素。
            for ( ; i < len; i++) {

                // 遍历new$
                for ( j = 0, lenJ = new$.length; j < lenJ; j++ ) {

                    // 使用一个中间变量先把要添加的元素保存一下，
                    // 然后push到result中，append到指定元素中。
                    // 三元运算含义：第一次把我自己添加进去，以后就添加我的clone版本
                    dom = j === 0? this[i] : this[i].cloneNode( true );
                    result.push( dom );

                    // 依次把this中的元素添加到new$中的每一个元素
                    new$[j].insertBefore( dom, new$[j].firstChild );
                }

            }

            // 把所有新添加的元素，包装成一个itcast对象返回
            return itcast( result );
        },

        // 给this中所有元素的前面添加元素
        prepend: function ( selector ) {

            // 如果是字符串，并且不是hmtl字符串，那么把它作为文本添加到元素中
            if ( itcast.isString( selector ) && !itcast.isHtml( selector ) ) {

                // 外面的this，是prepend调用者，即实例对象
                this.each(function () {

                    // 里面的this，是each遍历到的实例对象中的每一个value值，
                    // 把这个值添加到某元素的最前面
                    this.insertBefore( document.createTextNode( selector ),  this.firstChild );
                });
            }

            // 否则把 selector 对应的元素 添加 到 this 对应的元素的最前面
            else {
                var new$ = itcast( selector );
                new$.prependTo( this );
            }

            return this;
        },

        // 把实例中所有元素的内容都清空
        empty: function () {
            this.each(function () {

                // 把遍历到的每一个元素内容清空
                this.innerHTML = '';
            });

            return this;
        },

        // 删除自己
        remove: function () {
            this.each(function () {

                // 获取遍历到的每一个元素的父元素，然后通过父元素的removeChild删除自己。
                this.parentNode.removeChild( this );
            });

            return this;
        },

        // 获取第一个元素在兄弟中的位置
        index: function () {
            var i = 0, len, childrens;

            /*
            * 先获取第一个元素的父元素，
            * 然后获取父元素的所有子元素，
            * 遍历子元素，依次判断找到对应的元素下标
            *
            * 获取子节点的两种方式：
            * 1、childNodes  包含文本节点
            * 2、children  只包含元素节点
            * */
            childrens = this[0].parentNode.children;
            for ( len = childrens.length; i < len; i++ ) {
                if ( childrens[i] === this[0] ) {
                    return i;
                }
            }

            // 没有找到return -1
            return -1;
        }
    });

    // 因为对外暴漏的是itcast工厂函数，
    // 那么让init的原型等于itcast的原型，
    // 这样外界就可以通过itcast.fn给原型扩充方法让init实例使用了
    init.prototype = itcast.fn;

    // 对外暴漏两个
    w.$ = w.itcast = itcast;

})(this);