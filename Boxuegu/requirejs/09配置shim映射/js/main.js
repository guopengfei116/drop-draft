/*
 * 指定所有的模块基础路径为./js
 * */
require.config({
    baseUrl: './js',

    // 配置模块的地址
    paths: {
        template: '../lib/template-native',
        jquery: '../lib/jquery',
        bootstrap: '../lib/bootstrap',
        alert: './alert',
    },

    // 配置不支持AMD模块的依赖与返回值
    shim: {
        bootstrap: {
            deps: ['jquery'],
        },
        alert: {
            exports: 'sayHellow'
        }
    }
});

define(['bootstrap', 'alert'], function(bootstrap, alert) {
    alert('测试该模块是否拥有了返回值');
});
