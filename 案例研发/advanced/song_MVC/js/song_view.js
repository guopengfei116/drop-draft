/*
* 这个实例可以监听页面中的添加按钮与删除按钮事件，
* 再获取页面中的表单的值做对应的处理。
*
* 如果是添加，这个实例要把数据交由songModelManager管理，
* 同时更新页面上的歌曲列表展示。
*
* 如果是删除，这个实例要告知songModelManager删除对应的数据，
* 同时更新页面上的歌曲列表展示。
* */

/*
* @construcotr { Fuction } 歌曲管理视图类
* @param { options } 所需的参数列表对象
* @param { options.modelManager } 歌曲数据管理对象
* @param { options.addBtn } 添加按钮的选择器
* @param { options.delBtn } 删除按钮的选择器
* @param { options.nameInput } 歌曲名词的表单选择器
* @param { options.singerInput } 歌手的表单选择器
* @param { options.songContainer } 歌曲列表的容器选择器
* */
function SongViewManager(options) {
    this.modelManager = options.modelManager;
    this.addBtn = document.querySelector(options.addBtn);
    this.delBtn = document.querySelector(options.delBtn);
    this.saveBtn = document.querySelector(options.saveBtn);
    this.nameInput = document.querySelector(options.nameInput);
    this.singerInput = document.querySelector(options.singerInput);
    this.nameTitle = document.querySelector(options.nameTitle);
    this.singerTitle = document.querySelector(options.singerTitle);
    this.songContainer = document.querySelector(options.songContainer);

    // 创建实例时候，顺带着就把按钮的事件绑定了。
    this._bind();
}

SongViewManager.prototype = {

    // 给按钮绑定事件
    _bind: function() {

        /*// bind是由实例调用的，所以bind里的this为实例；
        // 但是add方法是在事件触发时被执行的，所以add方法内的this指向对应的按钮
        this.addBtn.onclick = this.add;
        this.delBtn.onclick = this.del;*/

        var self = this;

        this.addBtn.onclick = function() {
            // 该函数在事件触发时被执行的，所以this为对应的按钮
            self.add({
                songName: self.nameInput.value,
                singer: self.singerInput.value,
            });
        }

        this.delBtn.onclick = function() {
            // 该函数在事件触发时被执行的，所以this为对应的按钮
            self.del(self.nameInput.value);
        }

        this.saveBtn.onclick = function() {
            /*
            * 1、创建xhr对象
            * 2、open
            * 3、监听事件
            * 4、send最新的歌曲数据
            * */
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/song/sava');
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    console.log('发送完毕');
                }
            };
            xhr.send(JSON.stringify(self.modelManager.songList));
        }

        this.nameTitle.onclick = function() {
            self.modelManager.sort('songName');
            self.updateSongList(self.modelManager.songList);
        };

        this.singerTitle.onclick = function() {
            self.modelManager.sort('singer');
            self.updateSongList(self.modelManager.songList);
        };
    },

    // 添加歌曲
    add: function(song) {
        /*
        * 1、把数据交由数据管理对象
        * 2、调用视图更新方法更新视图
        * */
        this.modelManager.add(song);
        this.updateSongList(this.modelManager.songList);
    },

    // 删除歌曲
    del: function(songName) {
        /*
         * 1、通知数据管理对象删除对应的数据
         * 2、调用视图更新方法更新视图
         * */
        this.modelManager.del(songName);
        this.updateSongList(this.modelManager.songList);
    },

    // 根据数据更新歌曲列表页面
    updateSongList: function(data) {

        // data数据结构 ==> [{songName:'那一夜', singer:'你哭了'}, {songName:'你快回来', singer:'我错了'}]
        /*
        * 1、先获取到列表容器
        * 2、遍历数据，转换为对应的html
        * 3、设置容器的内容重置为计算好的html
        * */
        var html = '';
        for(var i = 0, len = data.length; i < len; i++) {
            html += '<div class="songslist-single">' +
                        '<div class="songslist-name">' + data[i].songName + '</div>' +
                        '<div class="songslist-singer">' + data[i].singer + '</div>' +
                    '</div>';
        }
        this.songContainer.innerHTML = html;
    }
};
