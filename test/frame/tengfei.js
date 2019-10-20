/**
 * Created by tengfei on 2016/5/12.
 */
'use strict';
function zQuery(arg){
    this.elements=[];   // 存选择出来的元素
    this.domString='';  // 存要创建的元素字符串
    switch(typeof arg){
        case 'function':
            domReady(arg);
            break;
        case 'string':
            if(arg.indexOf('>')!=-1){
                this.domString=arg;
            }else{
                this.elements=getEle(arg);
            }
            break;
        default:
            if(arg instanceof Array){
                this.elements=this.elements.concat(arg);
            }else{
                this.elements.push(arg);
            }
            break;
    }
}
zQuery.prototype.css=function(name, value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[name]=value;
        }
    }else{
        if(typeof name=='string'){
            return getStyle(this.elements[0], name);
        }else{
            var json=name;
            for(var name in json){
                for(var i=0; i<this.elements.length; i++){
                    this.elements[i].style[name]=json[name];
                }
            }
        }
    }
    return this;
};
zQuery.prototype.attr=function(name, value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].setAttribute(name, value);
        }
    }else{
        if(typeof name=='string'){
            return this.elements[0].getAttribute(name);
        }else{
            var json=name;
            for(var name in json){
                for(var i=0; i<this.elements.length; i++){
                    this.elements[i].setAttribute(name, json[name]);
                }
            }
        }
    }
    return this;
};

// 事件相关
;'click mouseover mouseout mousedown mousemove mouseup keydown keyup scroll resize load focus blur'.replace(/\w+/g, function(sEv){
    zQuery.prototype[sEv]=function(fn){
        for(var i=0; i<this.elements.length; i++){
            addEvent(this.elements[i], sEv, fn);
        }
    };
    return this;
});
zQuery.prototype.mouseenter=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i], 'mouseover', function(ev){
            var from=ev.fromElement || ev.relatedTarget;
            if(this.contains(from))return;
            fn && fn(this, arguments);
        });
    }
    return this;
};
zQuery.prototype.mouseleave=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i], 'mouseout', function(ev){
            var to=ev.toElement || ev.relatedTarget;
            if(this.contains(to))return;
            fn && fn.apply(this, arguments);
        });
    }
    return this;
};
zQuery.prototype.hover=function(fnOver, fnOut){
    this.mouseenter(fnOver);
    this.mouseleave(fnOut);
    return this;
};
zQuery.prototype.toggle=function(){
    var args=arguments;

    var _this=this;
    for(var i=0; i<this.elements.length; i++){
        (function(count){
            addEvent(_this.elements[i], 'click', function(){
                var fn=args[count%args.length];
                fn && fn.apply(this, arguments);
                count++;
            });
        })(0);
    }
    return this;
};
zQuery.prototype.bind=function(sEv, fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i], sEv, fn);
    }
    return this;
};
// DOM 添加 删除
zQuery.prototype.appendTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeEnd', this.domString);
    }
    return this;
};
zQuery.prototype.prependTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afterBegin', this.domString);
    }
    return this;
};
zQuery.prototype.insertBefore=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeBegin', this.domString);
    }
    return this;
};
zQuery.prototype.insertAfter=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afterEnd', this.domString);
    }
    return this;
};
zQuery.prototype.remove=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].parentNode.removeChild(this.elements[i]);
    }
    return this;
};
// 内容
zQuery.prototype.html=function(str){
    if(str || str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].innerHTML=str;
        }
    }else{
        return this.elements[0].innerHTML;
    }
    return this;
};
zQuery.prototype.val=function(str){
    if(str || str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].value=str;
        }
    }else{
        return this.elements[0].value;
    }
    return this;
};
// class
zQuery.prototype.addClass=function(sClass){
    var reg=new RegExp('\\b'+sClass+'\\b');
    for(var i=0; i<this.elements.length; i++){
        if(this.elements[i].className){
            if(!reg.test(this.elements[i].className)){
                this.elements[i].className+=' '+sClass;
            }
        }else{
            this.elements[i].className=sClass;
        }
    }
    return this;
};
zQuery.prototype.removeClass=function(sClass){
    var reg=new RegExp('\\b'+sClass+'\\b', 'g');
    for(var i=0; i<this.elements.length; i++){
        if(reg.test(this.elements[i].className)){
            this.elements[i].className=this.elements[i].className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s+/, ' ');
        }
    }
    return this;
};
// 运动
zQuery.prototype.animate=function(json, options){
    for(var i=0; i<this.elements.length; i++){
        move(this.elements[i], json, options);
    }
    return this;
};
zQuery.prototype.show=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='block';
    }
    return this;
};
zQuery.prototype.hide=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='none';
    }
    return this;
};
// 其他
zQuery.prototype.get=function(n){
    return this.elements[n];
};
zQuery.prototype.eq=function(n){
    return $(this.elements[n]);
};
zQuery.prototype.index=function(){
    var obj=this.elements[this.elements.length-1];
    var aSibling=obj.parentNode.children;
    for(var i=0; i<aSibling.length; i++){
        if(obj==aSibling[i]){
            return i;
        }
    }
};
zQuery.prototype.each=function(fn){
    for(var i=0; i<this.elements.length; i++){
        fn.call(this.elements[i], fn, this.elements[i]);
    }
    return this;
};
zQuery.prototype.find=function(str){
    var aParent=this.elements;
    var aChild=getEle(str, aParent);
    return $(aChild);
}
// 交互
$.ajax=zQuery.ajax=function(json){
    ajax(json);
};
$.getScript=zQuery.getScript=function(json){
    jsonp(json);
};
$.fn=zQuery.prototype;
$.fn.extend=zQuery.prototype.extend=function(json){
    for(var name in json){
        zQuery.prototype[name]=json[name];
    }
};

function $(arg){
    return new zQuery(arg);
}
function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(json){
    var json=json || {};
    if(!json.url)return;
    json.type=json.type || 'get';
    json.time=json.time || 5000;
    json.data=json.data || {};

    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET', json.url+'?'+json2url(json.data), true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST', json.url, true);
            oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }

    json.fnLoading && json.fnLoading();

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            json.complete && json.complete();
            if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
            clearTimeout(timer);
        }
    };
    var timer;
    timer=setTimeout(function(){
        alert('网络超时');
        oAjax.onreadystatechange=null;
    }, json.time);
}
function jsonp(json){
    var json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.cbName=json.cbName || 'cb';

    var fnName='show'+Math.random();
    fnName=fnName.replace('.', '');
    window[fnName]=function(data){
        json.success && json.success(data);

        // 删除
        oHead.removeChild(oS);
    };
    json.data[json.cbName]=fnName;

    var arr=[];
    for(var name in json.data){
        arr.push(name+'='+json.data[name]);
    }
    var oS=document.createElement('script');
    oS.src=json.url+'?'+arr.join('&');
    var oHead=document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}

var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
function move(obj, json, option){
    var option=option || {};
    option.duration=option.duration || 800;
    option.easing=option.easing || Tween.Back.easeIn;

    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(option.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            //t  当前时间
            //b  初始值  start
            //c  总距离  dis
            //d  总时间
            var cur=option.easing(n/count*option.duration, start[name], dis[name], option.duration);
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            option.complete && option.complete.call(obj);
        }
    },30);
}
function addEvent(obj, sEv, fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv, function(ev){
            var oEvent=ev || event;
            if(fn.apply(obj, arguments)==false){
                oEvent.cancelBubble=true;
                oEvent.preventDefault();
            }
        }, false);
    }else{
        obj.attachEvent('on'+sEv, function(ev){
            var oEvent=ev || event;
            if(fn.apply(obj, arguments)==false){
                oEvent.cancelBubble=true;
                return false;
            }
        });
    }
}
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', function(){
            fn && fn();
        }, false);
    }else{
        document.attachEvent('onreadystatechange', function(){
            fn && fn();
        });
    }
}
function getByClass(oParent, sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var arr=[];
        var aEle=oParent.getElementsByTagName('*');
        var reg=new RegExp('\\b'+sClass+'\\b', 'g');
        for(var i=0; i<aEle.length; i++){
            if(reg.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
function getByStr(aParent, str){
    var aChild=[];

    for(var i=0; i<aParent.length; i++){
        switch(str.charAt(0)){
            case '#':
                var obj=document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.':
                var aEle=getByClass(aParent[i], str.substring(1));
                for(var j=0; j<aEle.length; j++){
                    aChild.push(aEle[j]);
                }
                break;
            default:
                if(/^\w+\.\w+$/.test(str)){      // li.red
                    var aStr=str.split('.');
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    var reg=new RegExp('\\b'+aStr[1]+'\\b');
                    for(var j=0; j<aEle.length; j++){
                        if(reg.test(aEle[j].className)){
                            aChild.push(aEle[j]);
                        }
                    }
                }else if(/^\w+:\w+(\(\d+\))?$/.test(str)){     // 伪类  li:first  li:eq()
                    var aStr=str.split(/:|\(|\)/g);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    switch(aStr[1]){
                        case 'first':
                            aChild.push(aEle[0]);
                            break;
                        case 'last':
                            aChild.push(aEle[aEle.length-1]);
                            break;
                        case 'eq':
                            aChild.push(aEle[aStr[2]])
                            break;
                        case 'odd':
                            for(var j=1; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'even':
                            for(var j=0; j<aEle.length; j+=2){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'lt':
                            var n=aStr[2];
                            for(var j=0; j<n; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                        case 'gt':
                            var n=aStr[2];
                            for(var j=n; j<aEle.length; j++){
                                aChild.push(aEle[j]);
                            }
                            break;
                    }
                }else if(/^\w+\[\w+=\w+\]$/.test(str)){         // 属性  input[type=text]
                    var aStr=str.split(/\[|\]|=/g);
                    var aEle=aParent[i].getElementsByTagName(aStr[0]);
                    for(var j=0; j<aEle.length; j++){
                        if(aEle[j].getAttribute(aStr[1])==aStr[2]){
                            aChild.push(aEle[j]);
                        }
                    }
                }else{
                    var aEle=aParent[i].getElementsByTagName(str);
                    for(var j=0; j<aEle.length; j++){
                        aChild.push(aEle[j]);
                    }
                }
                break;
        }
    }
    return aChild;
}
function getEle(str, aParent){
    var arr=str.replace(/^\s+|\s+$/g, '').split(/\s+/);
    var aParent=aParent || [document];
    var aChild=[];
    for(var i=0; i<arr.length; i++){
        aChild=getByStr(aParent, arr[i]);

        aParent=aChild;
    }
    return aChild;
}