(function ( w ) {

    /*
    * constructor { Bird } 鸟
    * param { options: Object } 所有的参数
    * param { options.ctx: Context } 绘图环境
    * param { options.img: Image } 绘制小鸟所需的图像
    * param { options.widthFrame: number } 图片一排有多少帧
    * param { options.heightFrame: number } 图片一列有多少帧
    * param { options.x: number } 小鸟绘制的x轴坐标
    * param { options.y: number } 小鸟绘制的y轴坐标
    * param { options.renderWidth: number } 小鸟绘制时的宽
    * param { options.renderHeight: number } 小鸟绘制时的高
    * */
    function Bird( options ) {

        this.ctx = options.ctx;
        this.img = options.img;

        // 小鸟绘制时的起始坐标
        this.x = options.x || 10;
        this.y = options.y || 10;

        // 图片行和列的帧数
        this.widthFrame = options.widthFrame || 1;
        this.heightFrame = options.heightFrame || 1;

        // 小鸟图片的宽高 以及 绘制时的宽高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;
        this.renderWidth = options.renderWidth || this.width;
        this.renderHeight = options.renderHeight || this.height;

        this.speed = 100;            // 每秒下落的速度
        this.accelerate = 200;       // 加速度
        this.baseRotateAngle = 1;   // 速度为1时小鸟的旋转角度
        this.maxRotateAngle = 45;   // 小鸟最大旋转角度
        this.frame = 0;             // 小鸟绘制时的起始帧数

        // 绑定点击事件
        this._bind();
    }

    // 给原型扩充方法
    util.extend( Bird.prototype, {

        // 绘制小鸟
        draw: function () {
            var rotateAngle;

            this.ctx.save();

            // 平移到小鸟的中心
            this.ctx.translate( this.x + this.width / 2, this.y + this.height / 2 );

            // 根据速度旋转
            rotateAngle = this.baseRotateAngle * this.speed;
            if ( rotateAngle > this.maxRotateAngle ) {
                rotateAngle = this.maxRotateAngle;
            }else if( rotateAngle < -this.maxRotateAngle ){
                rotateAngle = -this.maxRotateAngle;
            }
            this.ctx.rotate( util.angleToRadian( rotateAngle ) );

            // 绘制小鸟，注意坐标变更为负的宽高各一半
            this.ctx.drawImage( this.img,
                this.width * this.frame, 0, this.width, this.height,
                -this.width / 2, -this.height / 2, this.renderWidth, this.renderHeight);

            this.ctx.restore();
        },

        // 更新下一帧数据
        update: function( delay ) {

            // 刷新帧
            this.frame = ++this.frame % this.widthFrame;

            // 计算最新的y轴坐标 = 初始速度 * 时间 + 加速度 * 时间^2 / 2
            this.y += this.speed * delay + this.accelerate * delay * delay / 2;

            // 计算最新的下落速度 = 初始速度 + 加速度 * 时间
            this.speed = this.speed + this.accelerate * delay;
        },

        // 绑定点击事件
        _bind: function () {

            // 先缓存一下当前的this
            var self = this;

            // 点击画布，让小鸟上飞
            this.ctx.canvas.addEventListener('click', function () {
                self.speed = -80;
            });
        }
    });

    // 暴漏工厂函数
    w.getBird = function ( options ) {
        return new Bird( options );
    };

}( window ));
