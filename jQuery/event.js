/**
 * Created by hp on 2017/1/16.
 */
var dataPriv = new Data();
var documentElement = document.documentElement;

var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
    return true;
}

function returnFalse() {
    return false;
}

// 安全的获取当前焦点元素，为了兼容IE9
function safeActiveElement() {
    try {
        return document.activeElement;
    }catch(e) {}
}

jQuery.removeEvent = function(elem, type, handle) {
    if(elem.removeEventListener) {
        elem.removeEventListener(type, handle);
    }
}

/*
* 暴露的事件绑定函数
* @param { elem } 元素
* @param { types } 多种事件类型
* @param { selector } 委托条件
* @param { data } 事件处理器的事件对象.data属性和第二个参数都可以获取到
* @param { fn } 事件处理器
* @param { one } 是否只执行一次
*
* 多个事件使用方式：
* 1、on(div, {}, 'a', {})
* 2、on(div, {}, 'a')
* 3、on(div, {}, {})
* 4、on(div, {})
*
* 单事件使用方式：
* 1、on(div, type, 'a', fn)
* 2、on(div, type, {}, fn )
* 3、on(div, type, false )
* */
function on(elem, types, selector, data, fn, one) {
    var origFn, type;

    // types参数可以是一个映射
    if(typeof types === 'object') {

        // 存在types-Object时，selector与data处理
        if(typeof selector !== 'string') {
            data = data || selector;
            selector = undefined;
        }

        // 递归绑定
        for(type in types) {
            on(elem, type, selector, data, types[ type ], one);
        }
        return elem;
    }

    // 3参数最后一个为fn (elem, type, fn)
    if(data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
    }

    // 4参数最后一个为fn
    else if(fn == null) {

        // (elem, type, selector, fn)
        if(typeof selector === 'string') {
            fn = data;
            data = undefined;
        }

        // (elem, type, data, fn)
        else {
            fn = data;
            data = selector;
            selector = undefined;
        }
    }

    // fn为false，则阻止冒泡
    if(fn === false) {
        fn = returnFalse;
    }

    // 无fn直接返回
    else if(!fn) {
        return elem;
    }

    // 一次性事件绑定
    if(one === 1) {
        origFn = fn;
        fn = function(e) {
            jQuery().off(e);
            return origFn.apply(this, arguments);
        }

        // 使用相同的guid所以调用者可以使用origFn删除
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }

    return elem.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
    });
}

/*
* 辅助函数来管理事件，而不是公共接口的一部分；
* 这个事件库采用了Dean Edwards的许多想法。
* */
jQuery.event = {

    global: {},

    fix: function(originalEvent) {
        return originalEvent[jQuery.expando]
            ? originalEvent: new jQuery.Event(originalEvent);
    },

    // 特殊的事件
    special: {

        load: {
            
            // 防止img的load事件冒泡到window，导致window的load事件被触发
            noBubble: true
        },

        focus: {

            // 如果当前焦点元素不是自己，
            // 并且该元素有focus方法，那么让该元素处于焦点，
            // 并且阻止冒泡，防止焦点转移。
            trigger: function() {
                if(this !== safeActiveElement() && this.focus) {
                    this.focus();
                    return false;
                }
            },
            delegateType: 'focusin'
        },

        blur: {

            // 如果当前焦点元素是自己，
            // 并且该元素有blur方法，那么移除该元素的焦点，
            // 并且阻止冒泡，防止无意义的冒泡。
            trigger: function() {
                if(this === safeActiveElement() && this.blur) {
                    this.blur();
                    return false;
                }
            }
        },

        click: {

            /*
            * 如果点击的是checkbox或input，
            * 触发本地click事件保证效果正确性，
            * 同时阻止多余的冒泡。
            * */
            trigger: function() {
                if(this.type === 'checkbox' && this.click
                    && jQuery.nodeName(this, 'input')) {
                    this.click();
                    return false;
                }
            },

            // 为了让所有的浏览器保持一致，不触发a标签本地的click事件
            _default: function() {
                return jQuery.nodeName(event.target, 'a');
            }
        },

        beforeunload: {

            // 如果returnValue没有值，firefox不能alert。
            postDispatch: function(e) {
                if(e.result !== undefined && e.originalEvent) {
                    e.originalEvent.returnValue = event.result;
                }
            }
        }
    },

    add: function(elem, types, handler, data, selector) {

        var handleObjIn, eventHandle, tmp;
        var events, t, handleObj;
        var special, handlers, type, namespaces, origType;
        var elemData = dataPriv.get(elem);

        // 不能添加事件到没有数据或者文本/节点上，
        // 但是可以是简单的对象。
        if(!elemData) {
            return;
        }

        // 调用者可以传入一个自定义的对象，用来代理事件处理器
        if(handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
        }

        // 保证无效的选择器抛出错误
        // 评估documentElement，防止非元素节点
        if(selector) {
            jQuery.find.matchesSelector(documentElement, selector);
        }
        
        // 确保每一个事件处理器都有一个唯一ID，为了以后查找与删除
        if(!handler.guid) {
            handler.guid = jQuery.guid++;
        }

        // 初始化每个元素的事件缓存，然后添加事件处理器
        if(!(events = elemData.events)) {
            events = elemData.events = {};
        }
        if(!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function(e) {

                /*
                * jQuery.event.trigger的时候删除第二个事件，
                * 并且在页面被卸载后执行事件。
                * */
                return typeof jQuery !== 'undefined' && jQuery.event.triggered !== e.type
                        ? jQuery.event.dispatch.apply(elem, arguments): undefined;

            }
        }

        // 通过空格分开多个事件处理函数
        types = (types || '').match(rnotwhite) || [''];
        t = types.length;
        while(t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || '').split('.').sort();

            // 必须要有类型，没有添加only命名空间的事件处理函数
            if(!type) {
                continue;
            }

            // 如果事件类型被改变，那么使用这个特殊的改变类型的事件处理函数
            special = jQuery.event.special[type] || {};

            // 如果定义了选择器，确定special类型，没有则给上面得到的值
            type = (selector? special.delegateType: special.bindType) || type;

            // 重置special为新的类型
            special = jQuery.event.special[type] || {};
            
            // handleObj要传递给所有的事件处理器使用
            handleObj = jQuery.extend({
                type: type,
                origType: origType,
                data: data,
                handler: handler,
                guid: handler.guid,
                selector: selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join('.')
            }, handleObjIn);
            
            // 第一次绑定某事件则初始化这个事件处理器队列
            if(!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;

                // 如果特殊事件处理器只返回false，那么仅仅使用addEventListener绑定即可
                if(!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                    if(elem.addEventListener) {
                        elem.addEventListener(type, eventHandle);
                    }
                }
            }

            if(special.add) {
                special.add.call(elem, handleObj);

                if(!handleObj.handler.guid) {
                    handleObj.handler.guid = handler.guid;
                }
            }
            
            // 添加到元素的事件处理器队列，委托的添加在前面
            if(selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
            }else {
                handlers.push(handleObj);
            }

            // 永久性记录哪一个事件已经被使用，使事件优化处理
            jQuery.event.global[type] = true;
        }
    },
    
    // 从元素上移除一个或一组事件
    remove: function(elem, types, handler, selector, mappedTypes) {

        var j, origCount, temp,
            events, t, handleObj,
            special, handlers, type, namespaces, origType,
            elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

        // 元素没有数据证明没有绑定过事件，不用做任何处理
        if(!elemData || !(events = elemData.events)) {
            return;
        }
        
        // 在types里遍历每一个事件类型和命名空间，类型可以省略
        types = (types || '').match(rnotwhite) || ['']
        t = types.length;
        while(t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || '').split('.').sort();
            
            // 如果没有具体类型，那么通过这个命名空间移除该元素所有的事件句柄
            if(!type) {
                for(type in events) {
                    jQuery.event.remove(elem, type + types[t], handler, selector, true)
                }
                continue;
            }

            // 特殊事件，委托的处理
            special = jQuery.event.special[type] || {};
            type = (selector? special.delegateType: special.bindType) || type;

            // 取出某类型的事件句柄数组
            handlers = events[type] || [];

            // /^|\.name1\.(?:.*\.|)name2\.(?:.*\.|)name3\.(?:.*\.|)\.|$/
            tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
            
            // 删除所有匹配的事件
            origCount = j = handlers.length;
            while(j--) {
                handleObj = handlers[j];

                if((mappedTypes || origType === handleObj.origType)
                    && (!handler || handler.guid === handleObj.guid)
                    && (!tmp || tmp.test(handleObj.namespace))
                    && (!selector || selector === handleObj.selector
                        || selector === '**' && handleObj.selector)) {
                    handlers.splice(j, 1);

                    if(handleObj.selector) {
                        handlers.delegateCount--;
                    }

                    if(special.remove) {
                        special.remove.call(elem, handleObj);
                    }
                }
            }

            /*
             * 移除通用的事件句柄，那么很多事件处理器都会随着一起移除
             * 要避免无穷递归删除特殊的事件句柄
             * */
            if(origCount && !handlers.length) {
                if(!special.teardown
                    || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                    jQuery.removeEvent(elem, type, elemData.handle);
                }

                delete events[type];
            }
        }

        // 删除这个长时间不再使用的数据
        if(jQuery.isEmptyObject(events)) {
            dataPriv.remove(elem, 'handle events');
        }
    },

    dispatch: function(nativeEvent) {

        // 根据本地事件对象创建一个自定义事件对象
        var event = jQuery.event.fix(nativeEvent);

        var i, j, ret, matched, handleObj, handlerQueue,
            args = new Array(arguments.length),
            handlers = (dataPriv.get(this, 'events') || {})[event.type] || [],
            special = jQuery.event.special[event.type] || {};

        // 使用这个自定义事件对象，而不是只读的本地事件对象
        args[0] = event;

        // 参数转义到arg数组中
        for(i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        event.delegateTarget = this;

        // 执行事件hook映射中的preDispatch这个类型，如果需要释放它
        if(special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
        }

        // 确定事件句柄队列
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);

        //
        i = 0;
        while((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;

            j = 0;
            while((handleObj = matched.handlers[j++])
                && !event.isImmediatePropagationStopped()) {

                // 至少要触发一个没有命名空间的，或者2个有命名空间的
                // 或者给一个子集绑定事件（没有命名空间）
                if(!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                    event.handleObj = handleObj;
                    event.data = handleObj.data;

                    // 优先执行hook方法
                    ret = ((jQuery.event.special[handleObj.origType] || {}).handle
                            || handleObj.handler).apply(matched.elem, args);

                    // 有结果则把结果赋值给事件对象，
                    // 如果结果为false，则阻止冒泡和默认事件
                    if(ret !== undefined) {
                        if((event.result = ret) === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                }
            }
        }

        // 执行事件hook映射中的postDispatch这个类型
        if(special.postDispatch) {
            special.postDispatch.call(this. event);
        }

        return event.result;
    },

    // 获取某事件发生时，需要执行的所有事件句柄
    handlers: function(event, handlers) {
        var i, matches, sel, handleObj,
            handlerQueue = [],
            delegateCount = handlers.delegateCount,
            cur = event.target;

        // 有委托 & 是DOM & (非点击事件 || 事件.button值非数字 || 事件.button小于1)
        if(delegateCount && cur.nodeType
            && (event.type !== 'click' || isNaN(event.button) || (event.button < 1))) {

            // 从事件源开始一直找父元素，直到当前this为止
            for(; cur !== this; cur = cur.parentNode || this) {

                // 不检查非元素节点
                // 不处理点击事件中经过的disabled元素
                if(cur.nodeType === 1 && (cur.disabled !== true || event.type !== 'click')) {
                    matches = [];
                    for(i = 0; i < delegateCount; i++) {
                        handleObj = handlers[i];

                        // 不与原型的属性发生冲突
                        sel = handleObj.selector + ' ';

                        if(matches[sel] === undefined) {
                            matches[sel] = handleObj.needsContext?
                                jQuery(sel, this).index(cur) > -1:
                                jQuery.find(sel, this, null, [cur]).length;
                        }
                        if(matches[sel]) {
                            matches.push(handleObj);
                        }
                    }
                    if(matches.length) {
                        handlerQueue.push({elem: cur, handlers: matches});
                    }
                }
            }
        }

        // 只和元素自己相关的事件句柄添加进来
        if(delegateCount < handlers.length) {
            handlerQueue.push({elem: this, handlers: handlers.slice(delegateCount)});
        }

        return handlerQueue;
    },

    addProp: function(name, hook) {
        Object.defineProperty(jQuery.Event.prototype, name, {
            enumerable: true,
            configurable: true,

            get: jQuery.isFunction(hook)?
                function() {
                    if(this.originalEvent) {
                        return hook(this.originalEvent);
                    }
                }:
                function() {
                    if(this.originalEvent) {
                        return this.originalEvent[name];
                    }
                },

            set: function(value) {
                Object.defineProperty(this, name, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: value
                });
            }
        });
    }
};
