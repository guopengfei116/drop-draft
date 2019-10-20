/*
* 管道的一些特征：
* 1、管道高度是随机生成的，如果随机生成了上管道的高度，那么下管道就可以计算了
* 2、上下管道的间距是一样的
* 3、当管道走出画布，从右边出来时，需要重新生成管道的高度
* 4、上下管道是成对出现的，所以x坐标可以共享
* 5、第一根管道第一次绘制时，需要和画布产生一个距离
* */
(function (w) {

    /*
    * 管道类
    * param { ctx : Context } 绘图上下文
    * param { imgDown : Image } 口朝下的管道(绘制到上面)
    * param { imgUp : Image } 口朝上的管道(绘制到下面)
    * param { x : number } 代表上下管道绘制时的x轴起点坐标
    * param { yDown : number } 口朝下的管道的Y轴起点坐标(绘制到上面)
    * param { yUp : number } 口朝上的管道的Y轴起点坐标(绘制到下面)
    * param { space : number } 上下管道间的距离
    * param { speed : number } 管道运动速度
    * */
    function Pipe(ctx, imgDown, imgUp, x, yDown, yUp, space, speed) {
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.width = imgDown.width;  // 管道图片中的宽度
        this.height = imgDown.height;   // 管道图片中的高度
        this.x = x;
        this.yDown = yDown || 0;
        this.yUp = yUp || 0;
        this.space = space || 150;
        this.speed = speed || 2;

        // 计算一下管道的Y轴坐标
        this._updateViewH();
    }

    util.extend(Pipe.prototype, {

        // 把管道绘制到画布上
        draw: function () {
            this.ctx.drawImage(this.imgDown, this.x, this.yDown);
            this.ctx.drawImage(this.imgUp, this.x, this.yUp);
            this._drawPath();
        },

        // 根据管道的坐标和宽高绘制矩形路径
        _drawPath: function() {
            //this.ctx.strokeStyle = 'red';
            this.ctx.rect(this.x, this.yDown, this.width, this.height);
            this.ctx.rect(this.x, this.yUp, this.width, this.height);
            //this.ctx.stroke();
        },

        // 更新管道下一帧数据
        update: function () {
            this.x -= this.speed;

            // 当管道走出画布，向右拼接，并重新计算管道的y轴坐标
            if (this.x <= -this.width) {
                this.x += this.width * 3 * 6;
                this._updateViewH();
            }
        },

        // 规定管道最小的高度为50，最大为300
        _updateViewH: function () {

            // 随机生成上管道的高度50~300之间，
            // 然后根据这个高度计算出上下管道的y轴坐标
            var viewHeight = Math.random() * 250 + 50;
            this.yDown = viewHeight - this.height;
            this.yUp = viewHeight + this.space;
        }
    });

    // 暴漏到全局
    w.Pipe = Pipe;
}(window));
