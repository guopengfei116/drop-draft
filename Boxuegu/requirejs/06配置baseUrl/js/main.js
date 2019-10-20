/*
* 指定所有的模块基础路径为./js
* */
require.config({
    baseUrl: './js'
});

define(['./a', './b', './c'], function(a, b, c) {
    window.console.log(a.name + b + c + '打豆豆');

    document.onclick = function() {
        console.log('点击body');
        require(['./d']);
    };
});
