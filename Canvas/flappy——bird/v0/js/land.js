// 大地类
function Land(x, y) {

    if(!Land.isInit) {
        throw '请初始化Lnad类！';
    }

    this.x = x || 0;
    this.y = y;
    this.width = Land.IMG_WIDTH;
    this.height = Land.IMG_HEIGHT;
    this.speed = -1;   // 运动速度

    // 每创建一个实例，该统计数值++
    Land.total = Land.total? Land.total + 1 : 1;
}

Land.init = function (ctx, landImgObj) {
    Land.ctx = ctx;
    // 把图片添加到类上
    Land.img = landImgObj;
    // 静态属性，代表大地源图像的宽
    Land.IMG_WIDTH = landImgObj.width;
    // 静态属性，代表大地源图像的高
    Land.IMG_HEIGHT = landImgObj.height;

    if(ctx && landImgObj) {
        Land.isInit = true;
    }
};

extend(Land.prototype, {

    // 渲染大地
    draw: function () {
        Land.ctx.drawImage(Land.img, this.x, this.y);
    },

    // 更新下一帧渲染时的数据
    update: function () {
        this.x += this.speed;

        // 当大地走出画布，那么向右拼接
        if(this.x < -this.width) {
            this.x += this.width * Land.total;
        }
    }
});
