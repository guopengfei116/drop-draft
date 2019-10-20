(function (w) {

    // 文本类
    function Text(text, x, y, font, color, align, baseLine) {

        if (!Text.isInit) {
            throw '请先初始化Text类！';
        }

        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.align = align;
        this.baseLine = baseLine;
    }

    // 类初始化方法
    Text.init = function (ctx, cvs) {

        if (ctx && cvs) {
            Text.isInit = true;
        }

        Text.ctx = ctx;
        Text.cvs = cvs;
    };

    // 原型扩充方法
    Text.prototype = {
        constructor: Text,
        draw: function () {
            Text.ctx.save();
            Text.ctx.font = this.font;
            Text.ctx.fillStyle = this.color;
            Text.ctx.textAlign = this.align;
            Text.ctx.textBaseline = this.baseLine;
            Text.ctx.fillText(this.text, this.x, this.y);
            Text.ctx.restore();
        }
    };

    w.Text = Text;
}(window));
