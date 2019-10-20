/*
 * 加载5张游戏所需图像资源
 * */

(function (w) {
    // 用来存放游戏所需的所有图像的资源地址(存放的路径)
    var imgSrc = {
        bird: 'img/birds.png',
        land: 'img/land.png',
        pipeDown: 'img/pipeDown.png',
        pipeUp: 'img/pipeUp.png',
        sky: 'img/sky.png'
    };

    // 用来存放，根据上面路径创建出来的不同图像对象
    var imgObj = {};
    // 统计图像已经加载了几张
    var imgCount = 0;
    var temImg = null;

    // 给全局暴漏一个获取图像资源对象的方法，
    // 这个方法要求传入一个回调，
    // 当所有的图像资源加载完毕之后，
    // 会调用传进来的回调函数，
    // 然后把加载完毕的图像资源传入这个回调中。
    function getImgObj(fn) {
        for (var key in imgSrc) {
            // 创建一个新的图片对象
            temImg = new Image();
            temImg.addEventListener('load', function () {
                imgCount++;
                if (imgCount >= 5) {
                    // 当所有的资源加载必须之后，调用一个传入进来的回调函数
                    fn(imgObj);
                }
            });
            // 指定该对象的图像资源
            temImg.src = imgSrc[key];
            // 分别把每次创建的图像对象存到imgObj中，以便将来使用
            imgObj[key] = temImg;
        }
    }

    w.getImgObj = getImgObj;
}(window));
