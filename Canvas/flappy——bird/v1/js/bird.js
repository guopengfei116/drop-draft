(function (w) {

    /*
    * 小鸟类
    * param { ctx : Object }  绘图上下文
    * param { img : Image }  小鸟图片资源
    * param { x : number }  精灵渲染到画布的x轴坐标
    * param { y : number }  精灵渲染到画布的y轴坐标
    * param { sizeW : number }  精灵渲染时候的宽
    * param { sizeH : number }  精灵渲染时候的高
    * param { index : number }  精灵渲染到画布时的第一帧
    * param { speed : number }  精灵运动的速度
    * */
    function Bird(ctx, img, x, y, sizeW, sizeH, index, speed) {
        this.ctx = ctx;
        this.img = img;
        this.width = img.width / 3;  // 一个小鸟的宽度
        this.height = img.height; // 一个小鸟的高度
        this.x = x || 10;
        this.y = y || 10;
        this.sizeW = sizeW || this.width;
        this.sizeH = sizeH || this.height;
        this.index = index || 0;
        this.speed = speed || 1;
        this.speedPlus = 0.1;  // 加速度
        this._bind();
    }

    // 给Bird原型扩充方法
    util.extend(Bird.prototype, {

        // 把小鸟绘制到画布上
        draw: function () {

            // 先把当前状态保存一份
            this.ctx.save();

            // 平移坐标系到小鸟的中心点
            this.ctx.translate(this.x + this.sizeW / 2, this.y + this.sizeH / 2);

            // 旋转坐标系，规定下降速度为1时，倾斜10度，
            // 最大倾斜90度。
            var angle = this.speed * 10;
            angle = angle > 90? 90 : angle;
            var rad = util.angleToRad(angle);
            this.ctx.rotate(rad);

            // 绘制旋转的小鸟
            this.ctx.drawImage(this.img,
                this.width * this.index, 0, this.width, this.height,
                -this.sizeW / 2, -this.sizeH / 2, this.sizeW, this.sizeH);

            // 回滚状态，防止其他的代码受到平移和旋转的影响
            this.ctx.restore();
        },

        // 更新小鸟下一帧的数据
        update: function () {

            // 刷新帧
            this.index = ++this.index > 2? 0 : this.index;

            // 刷新y轴显示坐标
            this.y += this.speed;

            // 刷新小鸟的下降速度
            this.speed += this.speedPlus;
        },

        // 绑定点击事件
        _bind: function () {

            // 先缓存一下当前的this
            var self = this;

            // 点击画布，让小鸟上飞
            this.ctx.canvas.addEventListener('click', function () {
                self.speed = -2;
            });
        }
    });

    // 公开到全局
    w.Bird = Bird;

}(window));
