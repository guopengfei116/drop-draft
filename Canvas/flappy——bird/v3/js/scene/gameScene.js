(function ( w ) {

    /*
    * constructor { GameScene } 游戏操作的场景
    * param { options.ctx: Context } 绘图环境
    * param { imgObj: Object } 该场景所需的所有图像资源
    * */
    function GameScene( ctx, imgMap ) {

        this.ctx = ctx;
        this.imgMap = imgMap;

        // 该场景中所需的角色
        this.roles = [];
        this._initRoles();

        // 获取一个监听者
        this.observer = getObserver();
    }

    // 扩展原型方法
    util.extend( GameScene.prototype, {

        // 创建该场景的所有角色
        _initRoles: function() {
            var i;

            // 背景
            this.roles.push( getSky({ ctx: this.ctx, img: this.imgMap.sky }) );
            this.roles.push( getSky({ ctx: this.ctx, img: this.imgMap.sky, x: this.imgMap.sky.width }) );

            // 管道
            for ( i = 0; i < 6; i++ ) {
                this.roles.push( getPipe({ ctx: this.ctx, downImg: this.imgMap.pipeDown, upImg: this.imgMap.pipeUp,
                    renderHeight: this.ctx.canvas.height - this.imgMap.land.height }) );
            }

            // 大地
            for ( i = 0; i < 4; i++ ) {
                this.roles.push( getLand({ ctx: this.ctx, img: this.imgMap.land,
                    renderHeight: this.ctx.canvas.height}) );
            }

            // 计时文字
            this.roles.push( getTimer({ ctx: this.ctx, x: this.ctx.canvas.width, y: 0,
                align: 'right', baseline: 'top', fillStyle: 'deeppink'}) );

            // 小鸟
            this.roles.push( getBird({ ctx: this.ctx, img: this.imgMap.bird, widthFrame: 3 }) );
        },

        // 判断小鸟是否死亡
        isBirdDie: function() {
            var bird, birdCoreX, birdCoreY;

            // 小鸟的中心坐标
            bird = this.roles[ this.roles.length - 1 ];
            birdCoreX = bird.x + bird.width / 2;
            birdCoreY = bird.y + bird.height / 2;

            // 根据小鸟中心点，判断是否飞出画布或者撞向大地或者撞向管道
            if ( this.ctx.isPointInPath( birdCoreX, birdCoreY ) || birdCoreY < 0
                    || birdCoreY > this.ctx.canvas.height - this.imgMap.land.height){
                return true;
            }

            return false;
        },

        // 添加小鸟死亡的听众
        addListener: function( eventHandle ) {
            this.observer.addListener( 'birdDie', eventHandle );
        },

        // 场景绘制
        draw: function() {
            this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );

            // 清除上一次绘制的管道路径和游戏画面，重新绘制
            this.ctx.beginPath();
            this.roles.forEach( function ( role ) {
                role.draw();
            } );

            // 判断小鸟是否死亡，死亡则发布消息通知
            if ( this.isBirdDie() ) {
                this.observer.trigger( 'birdDie' );
            }
        },

        // 更新角色在场景中表演下一帧时的数据
        update: function( delay ) {
            this.roles.forEach( function ( role ) {
                role.update( delay );
            } );
        }
    } );

    // 暴露工厂
    w.getGameScene = function ( ctx, imgMap ) {
        return new GameScene( ctx, imgMap );
    }

}( window ));
