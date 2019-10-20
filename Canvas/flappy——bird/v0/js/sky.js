// 大地类模块
(function (w) {

    // 大地类
    function Sky(x, y) {
        if (!Sky.isInit) {
            throw '请回吧！';
        }

        this.x = x || 0; // 大地x轴坐标
        this.y = y || 0; // 大地y轴坐标
        this.speed = -3; // 大地运动速度

        // 统计创建了多个大地实例，这是静态属性
        // 每创建一个实例，该统计数值++
        Sky.total = Sky.total? Sky.total + 1: 1;
    }

    Sky.init = function (ctx, skyImgObj) {
        // 给类添加静态属性，有绘图环境，
        // 和天空图像资源，以及1个天空的宽度和高度
        Sky.ctx = ctx;
        Sky.skyImgObj = skyImgObj;
        Sky.imgWidth = Sky.skyImgObj.width;
        Sky.imgHeight = Sky.skyImgObj.height;

        // 只有给我传了绘图环境和添加图像资源，才能让对方创建大地实例
        if (ctx && skyImgObj) {
            Sky.isInit = true;
        }
    };

    // 覆写类的原型
    Sky.prototype = {
        constructor: Sky,  // 手动补全一下丢失的constructor属性

        // 绘制大地
        draw: function () {
            Sky.ctx.drawImage(Sky.skyImgObj, this.x, this.y);
        },

        // 更新大地下一帧渲染时的数据值
        update: function () {
            this.x += this.speed;

            // 如果天空走出画布，那么让天空向右拼接
            if(this.x < -Sky.imgWidth) {
                this.x += Sky.imgWidth * Sky.total;
            }
        }
    };

    w.Sky = Sky;
}(window));