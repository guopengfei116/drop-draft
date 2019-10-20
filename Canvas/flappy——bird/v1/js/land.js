(function (w) {

    /*
     * 大地类
     * param { ctx : Context } 绘图上下文
     * param { img : Image } 大地背景图
     * param { x : number } 代表大地绘制时的x轴起点坐标
     * param { y : number } 代表大地绘制时的y轴起点坐标
     * */
    function Land(ctx, img, x, y) {
        this.ctx = ctx;
        this.img = img;
        this.width = img.width;
        this.height = img.height;
        this.x = x;
        this.y = y;
        this.speed = 2;  // 大地运动的速度
    }

    Land.prototype = {
        constructor: Land,

        // 绘制大地到画布上
        draw : function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },

        // 更新大地下一帧时的数据
        update: function () {
            this.x -= this.speed;

            // 当大地走出画布时，向右拼接
            if (this.x <= -this.width) {
                this.x += this.width * 4;
            }
        }
    };

    // 公开到全局
    w.Land = Land;

}(window));
