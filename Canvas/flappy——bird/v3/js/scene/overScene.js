(function( w ) {
    /*
     * constrcutor { OverScene } 游戏结束场景
     * param { ctx: Context } 绘图环境
     * */
    function OverScene( ctx ) {
        this.ctx = ctx;
    }

    // 给原型扩充方法
    OverScene.prototype.draw = function() {

        // 为了防止影响全局状态，所以先save再restore
        this.ctx.save();

        //this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
        this.ctx.fillStyle = 'rgba( 100, 100, 100, 0.8 )';
        this.ctx.fillRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'red';
        this.ctx.font = '900 40px 微软雅黑';
        this.ctx.fillText( 'GAME OVER!!!', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 );

        this.ctx.restore();
    };
    
    // 暴露工厂
    w.getOverScene = function( ctx ) {
        return new OverScene( ctx );
    }
    
}( window ));