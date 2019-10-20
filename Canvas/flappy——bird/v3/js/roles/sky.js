(function ( w ) {

    /*
     * constructor { Sky } 天空
     * param { options: Object } 所有的参数
     * param { options.ctx: Context } 绘图环境
     * param { options.img: Image } 绘制所需的图像
     * */
    function Sky( options ) {
        this.ctx = options.ctx;
        this.img = options.img;

        // 根据数量初始化x坐标
        this.x = options.img.width * Sky.len;
        this.y = 0;

        // 统计天空的数量
        Sky.len++;

        // 初始速度
        this.speed = 100;
    }

    // 记录天空的数量
    Sky.len = 0;

    // 给原型扩展方法
    Sky.prototype = {
        constructor: Sky,

        // 绘制背景
        draw: function () {
            this.ctx.drawImage( this.img, this.x, this.y );
        },

        // 计算下一帧数据
        update: function( delay ) {

            // 匀速
            this.x -= this.speed * delay;

            // 如果背景走出画布，那么该画布向右拼接
            if ( this.x < -this.img.width ) {
                this.x += this.img.width * Sky.len;
            }
        }
    };

    // 对外暴漏工厂函数
    w.getSky = function ( options ) {
        return new Sky( options );
    };

}(window));
