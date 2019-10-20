(function (w) {

    var startTime;

    // 日期文本类
    function TextDate(text, x, y, font, color, align, baseLine) {

        if (!TextDate.isInit) {
            throw '请先初始化TextDate类！';
        }

        // 初始化文本
        startTime = text;
        this.update();

        // 借用父类构造函数给子类添加属性
        Text.apply(this, arguments);
    }

    // 类初始化方法
    TextDate.init = function (ctx, cvs) {

        if (ctx && cvs) {
            TextDate.isInit = true;
        }

        // 调用父类初始化方法
        Text.init(ctx, cvs);

        Text.ctx = ctx;
        Text.cvs = cvs;
    };

    TextDate.prototype = Object.create(Text.prototype);
    // 因为必须先初始化父类，才能new 父类，所以使用上面的做法
    // TextDate.prototype = new Text();

    // 原型扩充子类实例方法
    util.extend(TextDate.prototype, {
        constructor: Text,
        update: function () {
            var runTime = Date.now() - startTime;
            var hours = Math.floor(runTime / (1000 * 60 * 60));
            var minutes = Math.floor(runTime % (1000 * 60 * 60) / (1000 * 60));
            var seconds = Math.floor(runTime % (1000 * 60) / 1000);
            this.text = '已经坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒！';
        }
    });

    w.TextDate = TextDate;
}(window));
