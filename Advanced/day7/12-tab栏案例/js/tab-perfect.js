

//属性： li列表   div列表
//方法：

//options
//  tabMenu   ul的id
//  tabMain   div的父元素的id
//  autoplay  表示是否要进行自动轮播

(function (w){
    function Tab(options){
        //li列表
        this.tabMenus = null;
        //div列表
        this.tabMains = null;

        //调用init方法，对对象做一系列的初始化工作
        this.init(options);
    }

    Tab.prototype = {
        init:function(initOptions){

            //元素获取
            this.getElements(initOptions);

            //事件注册
            this.initEvents();

            //轮播处理
            this.autoPlay(initOptions);

        },
        getElements:function(getOptions){
            //根据用户所给的参数，获取到了用户所要设置为tab切换的所有的li和所有div
            this.tabMenus = document.getElementById(getOptions.tabMenu).children;
            this.tabMains = document.getElementById(getOptions.tabMain).children;

        },
        initEvents:function(){
            //给所有的li注册事件
            for (var i = 0; i < this.tabMenus.length; i++) {
                var li = this.tabMenus[i];
                li.index = i;

                var that = this;

                li.onclick = function(){
                    that.change(this);
                }
            }
        },
        autoPlay:function(autoOptions){
            //处理自动轮播
            if(autoOptions.autoplay){
                var currentIndex = 0;
                var that = this;
                setInterval(function(){
                    if(currentIndex==that.tabMenus.length){
                        currentIndex = 0;
                    }
                    that.change(that.tabMenus[currentIndex++]);
                },500);
            }
        },
        change:function(li){
            //更改当前这个li的样式  排他
            for (var j = 0; j < this.tabMenus.length; j++) {
                this.tabMenus[j].className = "tab-item";
                this.tabMains[j].style.display = "none";
            }
            li.className += " active";
            //让对应的div显示出来  排他
            var index = li.index;
            this.tabMains[index].style.display = "block";
        }
    }

    w.Tab = w.T = Tab;
})(window)

