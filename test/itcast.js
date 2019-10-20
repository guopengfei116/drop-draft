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

    var $ = itcast;

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

    /*
    * 如果传入一个参数，把这个参数的属性copy到this身上；
    * 如果传入多个参数，把后面的参数的属性依次copy到第一个参数身上。
    * */
    itcast.extend = itcast.fn.extend = function( ) {
        var arg = arguments, argLen = arg.length,
            i = 1, key, target = arg[0];

        // 如果传入1个对象，则把这个对象的内容copy到this身上
        if ( argLen === 1 ) {
            i = 0;
            target = this;
        }

        // 把后面对象的属性，依次copy到第一个对象身上
        for ( ; i < argLen; i++ ) {
            for ( key in arg[i]) {
                if ( arg[i].hasOwnProperty(key) ) {
                    target[key] = arg[i][key];
                }
            }
        }

        return target;
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

    /*
    * css&attr
    * */
    /*------------------------------------css相关的------------------------------------------*/

    $.extend({
        // 获取指定元素的某个样式
        getStyle: function ( ele, style ) {
            if ( ele.currentStyle ) {
                return ele.currentStyle[ style ];
            }else {
                return window.getComputedStyle( ele )[ style ];
            }
        }
    });
    $.fn.extend({
        css: function ( name, value ) {

            // 传入一个参数的处理
            if ( value === undefined ) {

                // 如果传入的是一个字符串，那么就是获取第一个元素的样式
                if ( $.isString( name ) ) {
                    return $.getStyle( this[0], name );
                }

                // 如果传入的是一个对象，那么给所有的元素批量设置样式
                if ( typeof name === 'object' ) {

                    /*// 遍历所有的元素
                     for ( var i = 0; i < this.length; i++ ) {

                     // 遍历所有的样式
                     for ( var key in name ) {
                     this[i].style[ key ] = name[key];
                     }
                     }*/

                    // 遍历所有的元素
                    this.each( function () {
                        // 把遍历到的每一个元素先存储起来
                        var that = this;
                        // 遍历所有的样式
                        $.each(name, function ( key, val ) {
                            // 给每一个元素设置样式
                            that.style[ key ] = val;
                        });
                    });
                }

            }else if ( $.isString( name ) && $.isString( value ) ){

                // 如果传入两个字符串，那么给所有的元素设置指定的样式
                this.each( function () {

                    // 给每一个元素设置样式
                    this.style[ name ] = value;
                });
            }

            // 实例链式编程
            return this;
        },

        // 显示所有的元素
        show: function () {
            return this.css( 'display', 'block' );
        },

        // 隐藏所有的元素
        hide: function () {
            return this.css( 'display', 'none' );
        }
    });

    /*------------------------------------Class相关的------------------------------------------*/

// 静态方法，所有人通用。
    $.extend({

        // 查看指定元素中，是否含有指定的className
        hasClass: function( ele, className ) {
            if ( (' ' + ele.className + ' ').indexOf(' ' + className + ' ') > -1 ) {
                return true;
            }
            return false;
        },

        // 给指定元素，添加一个指定的className
        addClass: function ( ele, className ) {

            // 已经有了，就不用添加了
            if ( $.hasClass( ele, className ) ) {
                return false;
            }

            if ( ele.className === '' ) {
                ele.className = className;
            }else {
                ele.className += ' ' + className;
            }
        },

        // 删除元素指定的className
        removeClass: function ( ele, className ) {
            ele.className = (' ' + ele.className + ' ').replace(' ' + className + ' ', ' ');
        }
    });

// 实例方法，供实例使用。
    $.fn.extend({

        // 查看所有元素中，是否有元素存在指定的className
        hasClass: function ( className ) {
            var i = 0, len = this.length;
            // 遍历所有的元素，只要有一个元素存在这个class，
            // 那么就返回true，否则返回false
            for ( ; i < len; i++ ) {
                // 只要有一个元素存在这个class，那么就返回true
                if ( $.hasClass( this[i], className ) ) {
                    return true;
                }
            }
            return false;
        },

        // 给所有元素添加指定的className，如果元素已经有了，那么就不用重复添加了
        addClass: function ( className ) {
            this.each( function ( key, val ) {
                $.addClass( this, className );
            });

            // 实例链式编程
            return this;
        },

        // 把所有元素指定的className删除掉
        removeClass: function ( className ) {
            /*
             * 先遍历得到所有的元素，
             * 再获取元素的className，在获取到的className前后分别加一个空格，
             * 然后把得到的字符串，使用replace替换' ' + className + ' '为空格，即可完成删除。
             * */
            this.each( function () {
                $.removeClass( this, className );
                //this.className = (' ' + this.className + ' ').replace(' ' + className + ' ', ' ');
            });

            // 实例链式编程
            return this;
        },

        // 元素有这个class，那么就删除，没有就添加
        toggleClass: function ( className ) {
            /*
             * 先遍历得到所有的元素，
             * 分别使用hasClass查看这个元素有没有指定的class，
             * 没有则调用addClass进行添加，
             * 有则调用removeClass进行删除。
             * */
            this.each( function () {
                if ( $.hasClass( this, className ) ) {
                    $.removeClass( this, className );
                }else {
                    $.addClass( this, className );
                }
            });

            // 实例链式编程
            return this;
        }
    });

    /*-------------------------------------------属性相关---------------------------------------------*/

    $.fn.extend({

        // attr获取和设置属性通过getAttribute与setAttribute方法实现
        // 如果传入一个字符串，那么就是获取；
        // 如果传入一个对象，那么就是批量设置；
        // 如果传入两个字符串，那么就设置指定的属性值
        attr: function ( name, value ) {
            var len = arguments.length;

            // 1个参数
            if ( len === 1 ) {

                // 如果是字符串，那就获取第一个元素的属性
                if ( $.isString( name ) ) {
                    return this[0].getAttribute( name );
                }

                // 如果是对象，那么就给所有元素批量添加属性
                else if ( typeof name === 'object' ) {

                    // 遍历所有的元素
                    this.each( function () {
                        // 分别给每一个元素，批量添加属性
                        for ( var key in name ) {
                            this.setAttribute( key, name[ key ] );
                        }
                    });
                }
            }

            // 2个参数，都是字符串的情况
            else if ( $.isString( name ) && $.isString( value ) ) {
                // 遍历所有的元素
                this.each( function () {
                    // 分别给每一个元素添加指定的属性
                    this.setAttribute( name, value );
                });
            }

            return this;
        },

        // prop获取和设置属性通过直接.的方式
        // 如果传入一个字符串，那么就是获取；
        // 如果传入一个对象，那么就是批量设置；
        // 如果传入两个字符串，那么就设置指定的属性值
        prop: function ( name, value ) {
            // 1个参数
            if ( value === undefined ) {

                // 如果是字符串，那就获取第一个元素的属性
                if ( $.isString( name ) ) {
                    return this[0][ name ];
                }

                // 如果是对象，那么就给所有元素批量添加属性
                else if ( typeof name === 'object' ) {

                    // 遍历所有的元素
                    this.each( function () {
                        // 分别给每一个元素，批量添加属性
                        for ( var key in name ) {
                            this[ key ] = name[ key ];
                        }
                    });
                }
            }

            // 2个参数，都是字符串的情况
            else if ( $.isString( name ) && $.isString( value ) ) {
                // 遍历所有的元素
                this.each( function () {
                    // 分别给每一个元素添加指定的属性
                    this[ name ] = value;
                });
            }

            return this;
        },

        // 设置或获取innerHTML
        html: function ( html ) {

            // 如果传入null，那么情况内容
            if ( html === null ) {
                html = '';
            }

            // 交由prop处理
            return this.prop( 'innerHTML', html );
        },

        // 设置或获取元素里面的文本
        text: function ( text ) {

            // 如果传入null，那么情况内容
            if ( text === null ) {
                text = '';
            }

            // 交由prop处理
            return this.prop( 'innerText', text );
        },

        // 设置或获取元素的value属性值
        val: function ( value ) {

            // 交由prop处理
            return this.prop( 'value', value );
        }
    });

    /*
    * event
    * */
    // 原型添加一个点击事件
    $.fn.extend({

        /*
         * 要求每一个DOM对象，都有一个it_events自定义属性，
         * 它是以事件名为key，函数数组为val的这样一个对象,
         * 这个对象的数据类型是这个样子的：
         * DOM.it_events = {
         *   click: [ 点击触发的函数1，点击触发的函数2... ] ,
         *   scroll: [ 滚动触发的函数1，滚动触发的函数2... ] ,
         *   change: [ 改变时触发的函数1，改变时触发的函数2... ]
         * }
         *
         * 代码的处理逻辑：
         * 1、如果是第一次给DOM绑定click事件，那么先需要给DOM添加it_events自定义属性；即DOM.it_events = {｝
         * 2、添加完毕后，再给这个it_events添加一个key为'click'的数组，即DOM.it_events = { click: []｝
         * 然后把事件触发的函数push进去,等待执行。
         * 3、最后需要给DOM绑定click事件( 根据浏览器的不同，绑定时调用的api不同 )，
         * 绑定事件时传入的回调函数里面，统一遍历添加到it_events['click']数组中存储的所有函数。
         *
         * 需要注意：
         * 如果不是第一次给DOM绑定click事件，那么只需要把函数push到it_events['click']即可。
         *
         * 不是第一次的话，为什么只push数组里面就可以了呢？
         * 因为第一次给DOM绑定的事件回调函数里面，会统一遍历it_events['click']执行里面的函数。
         * */
        on: function ( type, fn ) {

            // 遍历所有的元素，把fn存储到这些元素中
            this.each(function () {
                var that = this;

                // 判断这个DOM是不是第一次绑定该事件
                this.it_events = this.it_events || {};
                if (!this.it_events[ type ]) {
                    this.it_events[ type ] = [];
                    this.it_events[ type ].push( fn );

                    // 某个类型的事件，只需要绑定一次就好
                    if (this.addEventListener) {
                        this.addEventListener( type, eventTrigger );
                    }else {
                        this.attachEvent( 'on'+ type, eventTrigger );
                    }
                    function eventTrigger( e ) {
                        for (var i = 0, len = that.it_events[type].length; i < len; i++) {
                            // 为了模仿原生的事件回调函数，
                            // 所以让这些回调函数执行时this指向绑定的DOM对象，
                            // 同时把Event对象传递过去，以供对方使用。
                            that.it_events[type][i].call( that, e );
                        }
                    }

                }else {
                    this.it_events[ type ].push( fn );
                }
            });

            return this;
        },

        // 解除事件回调函数
        off: function( type, fn ) {
            var arg = arguments;

            this.each( function () {
                var i, len, key;

                // 如果没有绑定过任何事件，不用做处理
                if ( this.it_events ) {

                    // 如果不传任何参数，那么清空所有的事件队列
                    if ( arg.length === 0 ) {
                        // 把所有的事件队列重新赋值为新数组
                        for ( key in this.it_events ) {
                            this.it_events[key] = [];
                        }
                    }

                    // 如果之前没有绑定过该类型的事件，那么就不用处理了。
                    if ( this.it_events[ type ] ) {

                        // 只传入type，那么解除type类型的所有函数
                        if ( arg.length === 1 ) {
                            this.it_events[ type ] = [];
                        }

                        // 传入type和fn，那么解除type类型指定的函数
                        else if ( arg.length === 2 ) {

                            for ( i = 0, len = this.it_events[ type ].length; i < len; i++) {

                                // 把对应的函数给删除掉
                                if ( this.it_events[ type ][i] === fn ) {
                                    this.it_events[ type ].splice( i, 1 );
                                    break;
                                }
                            }
                        }
                    }
                }
            });
        },

        // 第一个函数是over时触发的，
        // 第二个函数是out时触发的
        hover: function ( fn1, fn2 ) {
            return this.on( 'mouseover', fn1 ).on( 'mouseout', fn2 );
        },

        // 给元素绑定click事件，回调函数可以指定多个，
        // 每次点击的时候轮回执行这些函数
        toggle: function ( ) {
            var arg = arguments, i = 0;

            this.on( 'click', function ( e ) {

                // 轮回执行arg里面的每一个函数
                arg[i++ % arg.length].call( this, e );

            });
        }
    });

    // 给原型扩展一些事件绑定函数
    $.each(( "blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu" ).split( " " ),
        function ( index, value ) {
            // 以事件名为key，在原型上添加事件绑定方法
            $.fn[ value ] = function ( fn ) {
                // 交由on处理
                this.on( value, fn );
                return this;
            }
        });

    /*
    * selector
    * */
    (function (w) {

        var nativeReg = /\{\s*\[native code/;
        var baseSelectorReg = /^\#([\w-]+)$|^\.([\w-]+)$|^(\*)$|^(\w+)$/;

        // 该对象，用来记录一些新方法是否可用
        // 每一个方法的实现思路：
        // 被判断的方法 + '',得到该方法的字符串方法体，
        // 通过查看这个字符串方法体中是否含有'[native code]'来得知浏览器有没有对该方法进行实现。
        support = {
            getElementsByClassName: nativeReg.test(document.getElementsByClassName + ''),
            querySelectorAll: nativeReg.test(document.querySelectorAll + ''),
            trim: nativeReg.test(String.prototype.trim + ''),
            arrIndexOf: nativeReg.test(Array.prototype.indexOf + '')
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
        function byClass( className, context, arr ) {
            context = context || document;
            arr = arr || [];

            var tags, i, len;

            // 优先使用原生的getElementsByClassName方法
            if (support.getElementsByClassName) {
                arr.push.apply(arr, context.getElementsByClassName(className));
                return arr;
            }

            /*
             * 遍历所有元素，把含有指定className的元素push到arr中
             * */
            tags = context.getElementsByTagName('*');
            for (i = 0, len = tags.length; i < len; i++) {
                // 通过给元素className的两边添加空格，让判断变得统一
                if ((' ' + tags[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
                    arr.push(tags[i]);
                }
            }
            return arr;
        }

        /*
         * 最基础的选择器，供内部使用
         * */
        function baseSelect( selector, context, arr ) {
            context = context || document;
            arr = arr || [];

            var match, temTag;

            // 进行分类匹配
            match = baseSelectorReg.exec(selector);

            // 通过查看不同分组是否有值，
            // 来区分选择器的类型
            if (match[1]) {
                // document.getElementById可能返回null，需要过滤掉
                if (temTag = document.getElementById(match[1])) {
                    arr.push(temTag);
                }
            }else if (match[2]) {
                arr.push.apply(arr, byClass(match[2], context));
            }else if (match[3]) {
                arr.push.apply(arr, context.getElementsByTagName('*'));
            }else if (match[4]){
                arr.push.apply(arr, context.getElementsByTagName(match[4]));
            }

            return arr;
        }

        /*
         * 后代选择器处理函数
         * */
        function subSelect( selector, context, arr) {
            context = context || document;
            arr = arr || [];

            var selectors, i, len,
                j, jLen, res = [], previousRes = [context];

            selectors = selector.split(' ');

            // 遍历后代选择器中的所有子选择器
            for ( i = 0, len = selectors.length; i < len; i++ ) {

                // 上一次的结果作为本次的context( 因为上一次的结果可能存在多个，所以是循环 )
                for ( j = 0, jLen = previousRes.length; j < jLen; j++) {

                    // 把所有的结果先存储到res里面
                    res.push.apply(res, baseSelect(selectors[i], previousRes[j]));
                }
                // 下一次循环时，previousRes变为当前的结果
                previousRes = res;
                // 下一次获取的结果，得重新存储(因为我们只想要最后一次获取到的子元素)
                res = [];
            }

            // 把最终获取到的子元素，存储到指定的数组中
            arr.push.apply(arr, previousRes);

            return arr;
        }

        /*
         * Function ｛ select ｝ 选择器函数
         * param { selector : string } 选择器
         * param { context : DOm } 指定查找的起点元素
         * param { arr : Array } 指定获取的元素所存放的数组
         * */
        function select( selector, context, arr ) {
            context = context || document;
            arr = arr || [];

            var firstChar, temTag, selectorNew, selectors,
                i, len, match;

            // 处理'' || !string
            if (!selector || typeof selector !== 'string') {
                return [];
            }

            // 优先使用浏览器内置的querySelectorAll方法
            if (support.querySelectorAll) {
                arr.push.apply(arr, context.querySelectorAll(selector));
                return arr;
            }

            // 先把selector通过','分割成数组
            selectors = selector.split(',');

            for (i = 0, len = selectors.length; i < len; i++) {

                // 如果有匹配到的结果，
                // 那么说明这是id、class、*、tag选择器字符串,
                // 这4个基本选择器交由baseSelect统一处理。
                if (baseSelectorReg.test(trim(selectors[i]))) {
                    arr.push.apply(arr, baseSelect(trim(selectors[i]), context));
                }else {
                    arr.push.apply(arr, subSelect(trim(selectors[i]), context));
                }

            }

            // 过滤掉重复的元素再返回
            return unique(arr);
        }

        // 全局暴漏select方法
        w.select = select;
    })(window);

    /*
    * animate
    * */
    $.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        },
        _default: "swing"
    };
    $.easing['jswing'] = $.easing['swing'];
    $.extend( $.easing,
        {
            def: 'easeOutQuad',
            swing: function (x, t, b, c, d) {
                //alert($.easing.default);
                return $.easing[$.easing.def](x, t, b, c, d);
            },
            easeInQuad: function (x, t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (x, t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (x, t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (x, t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (x, t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (x, t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (x, t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (x, t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (x, t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (x, t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            easeInOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            easeInBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            easeInBounce: function (x, t, b, c, d) {
                return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
            },
            easeOutBounce: function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOutBounce: function (x, t, b, c, d) {
                if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
                return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        });

    // 把animate作为静态方法，加到$身上
    $.extend({
        /*
         * 如果传入2个参数：
         * 正常，没有额外的处理。
         *
         * 如果传入3个参数：
         * 最后一个是数值，那么代表是总时长；
         * 最后一个是字符串，那么代表是缓动函数名；
         * 最后一个是函数，那么代表是回调。
         *
         * 如果传入4个参数：
         * 第三个参数如果是数值，那么代表是总时长；
         * 最后一个是字符串，那么代表是缓动函数名；
         * 最后一个是函数，那么代表是回调。
         *
         * 如果传入5个参数：
         * 第三个参数如果是数值，那么代表是总时长；
         * 第四个参数如果是字符串，那么代表是缓动函数名；
         * 最后一个是函数，那么代表是回调。
         * */
        /*
         * param { ele: DOM }  被修改的dom元素
         * param { json: Object }  要修改的样式集合
         * param { fn: Function }  回调
         * */
        animate: function ( eles, json, time, easing, fn ) {

            eles = $.isArray(eles)? eles: [eles];

            // 记录动画开始的时间
            var startTime = +new Date,
                style, initStyle = [{},{},{}],
                arg = arguments, argLen = arg.length;

            // 只要最后一个参数是函数，那就是回调函数
            fn = typeof arg[argLen -1] === 'function'? arg[argLen -1] : null;

            // 第三个参数和第四个参数，如果是字符串，才会被采纳
            var easing = typeof time === 'string'?
                time : typeof easing === 'string'?
                easing: $.easing.def;

            // 第三个参数，只有是数值的时候，才会被采纳
            var time = typeof time === 'number'? time : 800;

            // 遍历所有元素，记录每一个元素的初始样式值
            for ( var i = 0; i < eles.length; i++) {
                // 记录所有样式的初始值
                for ( style in json ) {
                    initStyle[i] = initStyle[i] || {};
                    initStyle[i][style] = parseInt($.getStyle( eles[i], style )) || 0;
                }
            }

            eles.timer = setInterval(function () {
                var result, style;

                // 求已经当前距离动画开始已经过去的时间，
                // 并限制总时间不能超过设置的时间
                var delayTime = +new Date - startTime;
                delayTime = delayTime > time? time : delayTime;

                // 遍历每一个元素，分别设置样式
                for ( var i = 0; i < eles.length; i++ ) {
                    // 通过算法得到当前时间，元素所在的位置
                    for ( style in json ) {
                        result = $.easing[easing]( null, delayTime, initStyle[i][style], json[style] - initStyle[i][style], time );
                        if (style === 'opacity') {
                            eles[i].style[style] = result;
                            eles[i].style.filter = 'alpha(opacity' + result*100 + ')';
                        }
                        eles[i].style[style] = result + 'px';
                    }
                }

                // 根据运行时间来判断动画是否应该停止，
                // 停止后有回调，就执行回调
                if ( delayTime >= time ){
                    clearInterval( eles.timer );
                    console.log( +new Date - startTime );
                    fn && fn();
                }
            }, 20);
        }
    });

    $.fn.extend({
        animate: function ( json, time, easing, fn ) {
            var argArr = [].slice.call( arguments );
            argArr.unshift( this.toArray() );
            $.animate.apply( this, argArr );
        }
    });


    // 对外暴漏两个
    w.$ = w.itcast = itcast;

})(this);
