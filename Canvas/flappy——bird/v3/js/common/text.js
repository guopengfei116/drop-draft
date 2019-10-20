(function (w) {
    /*
     * constructor { Text } 文本
     * param { ctx : Context } 绘图环境对象
     * param { text : string } 绘制的文本
     * param { x : number } 绘制文本时候的x轴坐标
     * param { y : number } 绘制文本时候的y轴坐标
     * param { font : number } 绘制文本时的样式
     * param { align : string } 绘制文本时的横向对其方式
     * param { baseline : string } 绘制文本时的纵向对其方式
     * param { fillStyle : string } 绘制文本时的颜色
     * */
    function Text( options ) {
        this.ctx = options.ctx;
        this.text = options.text;
        this.x = options.x;
        this.y = options.y;
        this.fillStyle = options.fillStyle;
        this.font = options.font || '20px 微软雅黑';
        this.align = options.align || 'center';
        this.baseline = options.baseline || 'middle';
    }

    // 把指定文本绘制到画布上
    Text.prototype.draw = function() {

        // 把默认的状态保存一份
        this.ctx.save();

        this.ctx.font = this.font;
        this.ctx.textAlign = this.align;
        this.ctx.textBaseline = this.baseline;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fillText(this.text, this.x, this.y);

        // 文本绘制完毕后，恢复默认的状态
        this.ctx.restore();
    };

    // 暴露工厂函数
    w.getText = function ( options ) {
        return new Text( options );
    };

    // 把构造函数通过原型一起暴露到外界。
    w.getText.prototype.init = Text;

}(window));
