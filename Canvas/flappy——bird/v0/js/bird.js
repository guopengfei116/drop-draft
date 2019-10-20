// 小鸟类模块
(function (w) {

    // 鸟类
    function Bird(x, y, w, h) {
        if (!Bird.isInit) {
            throw '请先初始化Bird类！否则请回吧！';
        }

        this.x = x;  // 小鸟绘制的x轴坐标
        this.y = y;  // 小鸟绘制的y轴坐标
        this.w = w;  // 小鸟绘制宽度
        this.h = h;  // 小鸟绘制高度
        this.index = 0; // 小鸟当前绘制到那一张(帧)了。
        this.clipX = 0; // 小鸟裁剪的起始X轴坐标点
        this.clipY = 0; // 小鸟裁剪的起始Y轴坐标点
        this.speed = 1;  // 小鸟上下飞的速度
        this.speedPlus = 0.1;  // 下落的加速度
    }

    // 类初始化方法
    Bird.init = function (ctx, birdImgObj) {
        // 给Bird类添加绘制环境对象
        Bird.ctx = ctx;
        // 给Bird类添加图像对象
        Bird.birdImgObj = birdImgObj;
        // 1张小鸟图片的宽度
        Bird.birdWidth = Bird.birdImgObj.width / 3;
        // 1张小鸟图片的高度
        Bird.birdHeight = Bird.birdImgObj.height;

        // 如果调用了类的初始化方法，并且传入了一个对象，
        // 那么就认为Bird初始化完成了，可以创建实例了
        if (ctx && birdImgObj) {
            Bird.isInit = true;
        }
    };

    // 给Bird原型扩展方法
    extend(Bird.prototype, {

        // 专门按照小鸟的状态来绘制小鸟
        draw: function () {
            // 保存当前状态
            Bird.ctx.save();

            // 计算小鸟将来显示位置的中心点
            var birdCoreX = this.x + this.w / 2;
            var birdCoreY = this.y + this.h / 2;

            // 平移坐标系到计算好的中心点
            Bird.ctx.translate(birdCoreX, birdCoreY);

            // 旋转指定弧度
            // 根据下落的速度计算旋转多少弧度，规定下落速度为1时，对应10度。
            var angle = this.speed * 10;  // 根据速度计算旋转多少角度。
            angle = angle > 55? 55 : angle; // 限制旋转最大角度为55度。
            Bird.ctx.rotate(Math.PI / 180 * angle);

            // 绘制小鸟，注意绘制小鸟时的坐标变了，变成了负的宽高各一半。
            Bird.ctx.drawImage(Bird.birdImgObj,
                this.clipX, this.clipY, Bird.birdWidth, Bird.birdHeight,
                -this.w / 2, -this.h / 2, this.w, this.h);

            // 回滚上一次保存的状态
            Bird.ctx.restore();
        },

        // 专门用来计算小鸟绘制下一帧时的数据值
        update: function () {
            // 计算小鸟下一帧裁剪时的起点X轴坐标
            this.clipX = Bird.birdWidth * this.index;
            // 改变小鸟下一次绘制到第几帧了
            this.index++;
            this.index = this.index > 2? 0 : this.index;
            // 计算小鸟下一帧Y轴的位置
            this.y += this.speed;
            // 下一帧小鸟下落越来越快
            this.speed += this.speedPlus;
        }
    });

    window.Bird = Bird;

}(window));