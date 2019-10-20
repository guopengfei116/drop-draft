function slowMotion(node, styles, fn) {
    var startPoint, endPoint, step, isStop;

    // 缓动运动
    node.timer = setInterval(function () {

        // 默认认为属性的值都已到达最终值
        isStop = true;

        for (var key in styles) {

            // 如果是层级样式，则一步到最终值
            if (key === 'zIndex') {
                node.style[key] = styles[key];
                delete styles[key];
                continue;
            }

            // 当前值，为了防止意外，每次都重新获取样式值
            startPoint = getStyleNumber(node, key);

            // 目标值，如果是透明度则转换为百分制
            endPoint = key === 'opacity'? styles[key] * 100 : styles[key];

            // 计算运动步伐
            step = (endPoint - startPoint) / 10;

            // 重新设置元素的样式值，让元素运动起来
            step = step > 0? Math.ceil(step) : Math.floor(step);
            startPoint += step;

            // 如果是透明度做兼容处理
            if (key === 'opacity') {
                node.style.opacity = startPoint / 100;
                node.style.filter = 'alpha(opacity=' + startPoint + ')';
            }else {
                node.style[key] = startPoint + 'px';
            }

            /*
            * 如果属性达到最终的值，出于性能考虑，
            * 下次将不再计算该属性相关的操作
            * */
            if (startPoint == endPoint) {
                delete styles[key];
            }
            // 只要有一个属性没有达到最终值，动画就要继续运行
            else {
                isStop = false;
            }
        }

        // 当所有的属性值都到达最终值时，停止定时器
        if (isStop) {
            clearInterval(node.timer);
            fn && fn();
        }

    }, 1000 / 45);
}

function getStyleNumber(node, style) {
    var styleVal = getStyle.apply(null, arguments);

    // 如果获取的是透明度，则变成百分制返回
    styleVal = style == 'opacity'? styleVal * 100 : styleVal;

    // 取整返回，因为styleVal可能为'auto'、undefined、''，
    // 那么parseInt后的结果就为NaN，需要过滤
    return parseInt(styleVal) || 0;
}

function getStyle(node, style) {
    if (node.currentStyle) {
        return node.currentStyle[style];
    }else {
        return getComputedStyle(node, null)[style];
    }
}
