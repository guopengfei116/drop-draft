(function( w ) {
    // 角度转换为弧度
    function angleToRadian( angle ) {
        return Math.PI / 180 * angle;
    }

    /*
     * constructor { PipeChart } 饼图构造函数
     * param { options: Object } 可配参数
     * param { options.ctx: Context } 绘图上下文
     * param { options.data: Array } 绘制饼图所需的数据
     * param { options.x: number } 圆心x坐标
     * param { options.y: number } 圆心y坐标
     * param { options.r: number } 饼图半径
     * param { options.textSpace: number } 文字与饼的间距
     * */
    function PipeChart(options) {
        this.ctx = options.ctx;
        this.data = options.data;
        this.x = options.x;
        this.y = options.y;
        this.r = options.r;
        this.textSpace = options.textSpace || 20;
        this.colors = 'blue,hotpink,green,deeppink,violet,skyblue,lavender,lavenderblush'.split(',');
    }

    // 置换原型
    PipeChart.prototype = {
        constructor: PipeChart,

        // 绘制饼图
        draw: function() {
            var sectors = this.getSectors();
            this.drawSector(sectors);
            this.drawText(sectors);
        },

        // 根据数据求每个扇绘制时所需的弧度
        getSectors: function() {

            // 求数据总和
            var num = 0;
            this.data.forEach( function( obj ) {
                num += obj.val;
            });

            // 1单位数据所占弧度
            var ratio = Math.PI*2 / num;

            /*
            * 把每个数据，转换得到每个扇的起始弧度、中间弧度、结束弧度：
            * 1、定义一个新的数组用来存储每个扇的数据
            * 2、遍历数据
            * 3、求每个扇的大小 = 单位弧度 * 每个数据
            * 4、求每个扇绘制时所需的数据
            * 每个扇的起始弧度 = 上一个扇的结束弧度
            * 每个扇的中间弧度 = 上一个扇的结束弧度 + 当前扇大小 / 2
            * 每个扇的结束弧度 = 上一个扇的结束弧度 + 当前扇大小
            * */
            var sector = [], current, prevEnd;
            this.data.forEach(function(obj, i) {
                current = ratio * obj.val;
                prevEnd = i == 0? 0: sector[i - 1].end;
                sector.push({
                    start: prevEnd,
                    center: prevEnd + current / 2,
                    end: prevEnd + current
                });
            });

            return sector;
        },

        // 绘制扇
        drawSector: function(sectors) {
            var self = this;

            sectors.forEach(function(obj, i) {
                self.ctx.beginPath();
                self.ctx.moveTo(self.x, self.y);
                self.ctx.arc(self.x, self.y, self.r, obj.start, obj.end);
                self.ctx.closePath();
                self.ctx.fillStyle = self.colors[i];
                self.ctx.fill();
            });
        },

        // 绘制文字和衬托线
        drawText: function(sectors) {
            var self = this;

            sectors.forEach(function(obj, i) {

                // 文字坐标与文字宽度
                var textX = self.x + (self.r + self.textSpace) * Math.cos(obj.center);
                var textY = self.y + (self.r + self.textSpace) * Math.sin(obj.center);
                var textWidth = self.ctx.measureText(self.data[i].msg).width;

                // 样式设置
                self.ctx.strokeStyle = self.colors[i];
                self.ctx.fillStyle = self.colors[i];
                if(obj.center > Math.PI/2 && obj.center < Math.PI*1.5) {
                    self.ctx.textAlign = 'right';
                    textWidth = -Math.abs(textWidth);
                }else {
                    self.ctx.textAlign = 'left';
                    textWidth = Math.abs(textWidth);
                }

                // 绘制文字与衬托线
                self.ctx.beginPath();
                self.ctx.moveTo(self.x, self.y);
                self.ctx.lineTo(textX, textY);
                self.ctx.lineTo(textX + textWidth, textY);
                self.ctx.stroke();
                self.ctx.fillText(self.data[i].msg, textX, textY - 5);
            });
        }
    };

    w.PipeChart = PipeChart;
}( window ));