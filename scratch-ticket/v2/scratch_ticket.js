/*
 * 刮刮乐实现原理：
 * 1、创建一个canvasDOM元素
 * 2、设置奖品为canvasDOM元素的背景
 * 3、在画布中绘制一个遮盖层
 * 4、把canvas加到页面中，呈现给用户的是一个遮盖层
 * 5、监听鼠标事件，当鼠标按下并且移动的时候，
 * 把画布指定的区域变为透明，这样奖品就被一点一点的刮出来了。
 *
 *
 * 指定区域变透明的原理：
 * 1、先绘制好奖品遮盖层
 * 2、设置图像冲突处理的属性globalCompositeOperation值为destination-out
 * 3、根据鼠标移动的位置绘制图像，因为这个图像和遮盖层可能产生冲突，
 * 冲突的部分不会显示，即冲突的部分为透明。
 * */
(function() {

    // 判断奖品是否应该全部自动展示
    function isShow( ctx ) {
        /*
         * 1、通过getImageData方法得到该区域的像素数据对象，
         * 2、再通过像素数据对象的data属性得到一个存储像素数据的一维数组
         * 3、遍历这个一维数组，依次判断每一个像素的第四个值(即透明度的值)，
         * 如果这个值为0，证明该像素是透明的。
         * 4、遍历的过程中累计透明的数量，这个数量 除以 像素总数，就得到一个透明部分所占比值。
         * */
        var alphaNumber = 0;
        var imageDataArr = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;

        // 遍历每一个像素的数据
        for( var i = 0, len = imageDataArr.length; i < len; i+=4 ) {

            // 判断每一个像素的alpha值，如果为0，证明这个像素是透明的，则累加透明像素的数量
            if( imageDataArr[ i + 3 ] === 0 ) {
                alphaNumber++;
            }
        }

        // 如果有一半的像素点是透明的，那么返回true，否则返回false
        return alphaNumber / (imageDataArr.length/4) > 0.5;
    }

    // 给原型添加一个刮刮乐插件方法
    $.fn.scratchTicket = function( imgs ) {

        // 获取第一个元素的宽高
        var $node = this.first();
        var $nodeWidth = parseInt( $node.css('width') );
        var $nodeHeight = parseInt( $node.css('height') );

        // 移动鼠标时绘制圆的半径
        var r = 20;

        // 1、创建一个canvasDOM元素，根据第一个元素的大小设置画布的大小
        var $cvs = $('<canvas></canvas>');
        var cvs = $cvs.get(0);
        cvs.width = $nodeWidth;
        cvs.height = $nodeHeight;

        // 获取绘图环境
        var ctx = cvs.getContext('2d');

        // 2、设置奖品为canvasDOM元素的背景
        //var imgs = [ './img/iphone8.jpg', './img/ziyou.jpg' ];
        var randomNum = Math.floor(Math.random() * imgs.length);
        $cvs.css({
            backgroundImage: 'url('+ imgs[randomNum] +')',
            backgroundSize: '100% 100%'
        });

        // 3、在画布中绘制一个遮盖层
        ctx.fillStyle = 'rgb(120, 120, 120)';
        ctx.fillRect( 0, 0, cvs.width, cvs.height );

        // 4、监听鼠标事件，当鼠标按下并且移动的时候，
        // 把画布指定的区域变为透明，这样奖品就被一点一点的刮出来了。
        $cvs.mousedown( function() {

            // 先设置图像冲突的处理方式为：只显示旧图像未冲突的部分
            ctx.globalCompositeOperation = 'destination-out';

            // 鼠标移动时，获取鼠标在画布中的坐标，然后绘制新图像圆
            $cvs.mousemove( function( e ) {

                // 计算鼠标在画布中的坐标
                var x = e.pageX - cvs.offsetLeft;
                var y = e.pageY - cvs.offsetTop;

                // 根据鼠标的轨迹绘制圆
                ctx.beginPath();
                ctx.arc( x, y, r, 0, Math.PI*2 );
                ctx.fill();

                /*
                 * 如果可以直接展示奖品了，
                 * 那么移除鼠标移动事件，
                 * 然后清除画布内容。
                 * */
                if( isShow( ctx ) ) {
                    $cvs.off( 'mousemove' );
                    ctx.clearRect(0, 0, cvs.width, cvs.height);
                }
            });
        });

        // 鼠标放开时，解除鼠标移动的事件
        $cvs.mouseup( function() {
            $cvs.off( 'mousemove' );
        });

        // 5、把canvas加到第一个元素中，用户就可以刮奖啦
        $cvs.appendTo( this.get(0) );
    }
}());