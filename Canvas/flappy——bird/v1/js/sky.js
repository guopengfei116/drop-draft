(function (w) {

    /*
    * 天空类
    * param { ctx : Context } 绘图上下文
    * param { img : Image } 天空背景图
    * param { x : number } 代表背景图绘制时的x轴起点坐标
    * param { y : number } 代表背景图绘制时的y轴起点坐标
    * param { speed : number } 代表背景运动的速度
    * */
    function Sky(ctx, img, x, y, speed) {
        this.ctx = ctx;
        this.img = img;
        this.width = img.width;  // 代表一个背景的宽
        this.height = img.height;  // 代表一个背景的高
        this.x = x || 0;
        this.y = y || 0;
        this.speed = speed || 2;  // 天空运动的速度
    }

    // 绘制天空到画布上
    Sky.prototype.draw = function () {
        this.ctx.drawImage(this.img, this.x, this.y);
    };

    // 更新天空下一帧绘制时x轴坐标
    Sky.prototype.update = function () {
        this.x -= this.speed;

        // 当天空走出画布时，向右拼接
        if (this.x <= -this.width) {
            this.x += this.width * 2;
        }
    };

    w.Sky = Sky;

}(window));
