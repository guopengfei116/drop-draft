define(['./a', './b', './c'], function(a, b, c) {
    window.console.log(a.name + b + c + '打豆豆');

    document.onclick = function() {
        console.log('点击body');
        require(['./js/d']);
    };
});
