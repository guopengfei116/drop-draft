/*
* 指定所有的模块基础路径为./js
* */
require.config({
    baseUrl: './js'
});

define(['../lib/template-native', '../lib/jquery'], function(template, jquery) {

    var html = template('tpl', {
        list: ['a', 'b', 'c', 'd', 'e']
    });
    document.body.innerHTML = html;
    console.log(jquery);
});
