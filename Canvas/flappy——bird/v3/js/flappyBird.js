(function( w ) {

    /*
     * constructor { FlappyBird } 飞翔的小鸟游戏
     * param { gameContainer: string } 元素选择器，用来获取展示游戏的容器
     * */
    function FlappyBird( gameContainer ) {

        // 游戏画面的宽高
        this.width = 800;
        this.height = 600;

        // 获取绘图上下文
        this.ctx = util.getCanvasContext( gameContainer, this.width, this.height );

        // 游戏所需的图片资源地址&游戏所需的图片资源
        this.imgSrc = {
            bird: './imgs/bird.png',
            land: './imgs/land.png',
            pipeDown: './imgs/pipeDown.png',
            pipeUp: './imgs/pipeUp.png',
            sky: './imgs/sky.png'
        };
        this.imgMap = {};

        // 载入场景、游戏场景和结束场景
        this.loadingScene = null;
        this.gameScene = null;
        this.loadingScene = getLoadingScene( this.ctx );

        // 游戏开关
        this.isRun = false;

        // 上一帧的时间&当前帧的时间&两帧间隔时间(单位秒)
        this.lastFrameTime = Date.now();
        this.currentFrameTime = Date.now();
        this.delay = 0;
    }

    // 扩展原型方法
    FlappyBird.prototype = {
        constructor: FlappyBird,

        // 初始化游戏资源
        _loadImg: function( cbk ) {
            var self = this;
            util.getImage( this.imgSrc, function ( imgMap ) {
                self.imgMap = imgMap;
                cbk();
            });
        },

        // 创建游戏场景
        _initScene: function() {
            this.gameScene = getGameScene( this.ctx, this.imgMap );
            this.overScene = getOverScene( this.ctx, this.imgMap );
        },

        // 开始游戏，切入游戏场景
        draw: function () {
            
            // 当前帧绘制的时间
            this.currentFrameTime = Date.now();

            // 当前帧与上一帧的时间间隔，以秒为单位计算
            this.delay = (this.currentFrameTime - this.lastFrameTime) / 1000;

            // 上一帧绘制的时间
            this.lastFrameTime = this.currentFrameTime;

            // 绘制游戏画面，可能触发birdDie事件
            this.gameScene.draw() ;
            this.gameScene.update( this.delay );
        },

        /*
        * 先切入loadding场景，然后加载游戏资源，
        * 加载完毕后初始化剩余的场景对象，
        * 再监听游戏场景中小鸟的死亡事件，最后开始游戏。
        * */
        start: function() {
            var self = this;
            this.loadingScene.draw();

            // 延迟500毫秒，是为了loading的展示
            setTimeout( function() {
                self._loadImg( function() {

                    // 创建场景对象，需要等资源加载完毕后才能创建
                    self._initScene();

                    // 添加小鸟死亡听众
                    self.gameScene.addListener(function() {
                        self.end();
                    });

                    // 播放游戏场景
                    self.isRun = true;
                    (function loop(){
                        if ( self.isRun ) {
                            self.draw();
                            requestAnimationFrame( loop );
                        }
                    }());
                } );
            }, 500);
        },

        // 暂停游戏，休息场景切入(暂无)
        pause: function() {
            this.isRun = false;
        },

        // 结束游戏，结束场景切入
        end: function() {
            this.isRun = false;
            this.overScene.draw();
        }
    }

    // 单例模式
    var game = null;
    w.getFlappyBird = function ( gameContainer ) {
        if ( !game ) {
            game =  new FlappyBird( gameContainer );
        }
        return game;
    };

}( window ));
