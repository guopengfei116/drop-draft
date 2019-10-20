/*
 * 指定所有的模块基础路径为./js
 * */
require.config({
    baseUrl: './js',
    paths: {
        template: '../lib/template-native',
        jquery: '../lib/jquery'
    }
});

define(['template', 'jquery'], function(template, $) {

    var html = template('tpl', {
        list: ['a', 'b', 'c', 'd', 'e']
    });
    document.body.innerHTML = html;
    console.log($);
});
