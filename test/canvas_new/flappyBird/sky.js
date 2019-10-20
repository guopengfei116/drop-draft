(function ( w ) {

    function Sky( options ) {
        this.ctx = options.ctx;
        this.img = options.img;

        this.x = options.x || 0;
        this.y = 0;

        // 背景运动的速度
        this.speed = 1;
    }

    // 给原型扩展方法
    Sky.prototype = {
        constructor: Sky,

        // 绘制背景
        draw: function () {
            this.ctx.drawImage( this.img, this.x, this.y );
        },

        // 计算下一帧数据
        update: function () {
            this.x -= this.speed;
            // 如果背景走出画布，那么该画布向右拼接
            if ( this.x < -this.img.width ) {
                this.x += this.img.width * 2;
            }
        }
    };

    w.Sky = Sky;

}(window));