

//属性： li列表   div列表
//方法：

//options
//  tabMenu   ul的id
//  tabMain   div的父元素的id
//  autoplay  表示是否要进行自动轮播

function Tab(options){
    //li列表
    this.tabMenus = null;
    //div列表
    this.tabMains = null;

    //根据用户所给的参数，获取到了用户所要设置为tab切换的所有的li和所有div
    this.tabMenus = document.getElementById(options.tabMenu).children;
    this.tabMains = document.getElementById(options.tabMain).children;

    //给所有的li注册事件
    for (var i = 0; i < this.tabMenus.length; i++) {
        var li = this.tabMenus[i];
        li.index = i;

        var that = this;

        li.onclick = function(){
            //更改当前这个li的样式  排他
            for (var j = 0; j < that.tabMenus.length; j++) {
                that.tabMenus[j].className = "tab-item";
                that.tabMains[j].style.display = "none";
            }
            this.className += " active";
            //让对应的div显示出来  排他
            var index = this.index;
            that.tabMains[index].style.display = "block";
        }
    }


    //处理自动轮播
    if(options.autoplay){

    }
}

Tab.prototype = {
    change:function(li){

    }
}
