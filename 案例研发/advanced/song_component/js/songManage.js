SongManage.songManageHtml =
    '<div class="container">'
    + '<div class="songslist-op">'
    + '<label for="txtAddSName">歌曲名:</label><input type="text" id="txtAddSName" />'
    + '<label for="txtAddSinger">歌手:</label><input type="text" id="txtAddSinger" />'
    + '<button id="btnAdd">添加</button>'
    + '<button id="btnRemove">删除</button>'
    + '<button id="btnSearch">查找</button>'
    + '</div>'
    + ''
    + '<div class="songslist-header">'
    + '<div class="songslist-name">歌曲名称</div>'
    + '<div class="songslist-singer">歌手</div>'
    + '<div class="songslist-option">操作</div>'
    + '</div>'
    + '<div class="songslist-main" id="c">'
    + '</div>'
    + '</div>';

SongManage.isInit = false;

function SongManage(options) {
    this.nContainer = document.querySelector(options.container); // 管理组件被添加到的父元素
    this.songList = options.songList || [];                      // 默认的歌曲列表
}
SongManage.prototype = {

    // 初始化页面结构
    init: function() {
        var that = this;

        // 页面结构只初始化一次
        if (!SongManage.isInit) {
            SongManage.isInit = true;
            that.nContainer.innerHTML = SongManage.songManageHtml;

            // 给实例初始化页面中的按钮
            that.btnAdd = document.querySelector('#btnAdd');
            that.btnRemove = document.querySelector('#btnRemove');
            that.btnSearch = document.querySelector('#btnSearch');
            that.nodeSongName = document.querySelector('#txtAddSName');
            that.nodeSinger = document.querySelector('#txtAddSinger');

            // 添加按钮
            that.btnAdd.onclick = function () {
                // 把新数据添加到实例中
                that.add({
                    songName: that.nodeSongName.value,
                    singer: that.nodeSinger.value
                });
                // 添加完毕后，需要手动更新页面内容
                that.render();
            };

            // 删除按钮
            that.btnRemove.onclick = function () {
                that.remove(that.nodeSongName.value);
                // 删除完毕后，需要手动更新页面内容
                that.render();
            };

            // 查询
            that.btnSearch.onclick = function () {

                // 获取要查询的歌曲名
                var searchSong = that.search(that.nodeSongName.value);

                // 如果有只绘制这一个
                if (searchSong) {

                    // 这样调用，render里面会使用init方法，新对象是没有init方法的，所以会报错
                    that.render.call({
                        songList: [searchSong]
                    });
                }

                // 否则绘制全部
                else {
                    that.render();
                }
            }
        }
    },

    // 当第一次调用rendder的时候会初始化页面结构，以后就不会了
    render: function () {
        this.init && this.init();
        var html = '';
        var i = 0, len = this.songList.length;
        for (; i < len; i++) {
            html += '<div class="songslist-single">'
                + '<div class="songslist-name">'
                + this.songList[i].songName
                + '</div>'
                + '<div class="songslist-singer">'
                + this.songList[i].singer
                + '</div>'
                + '</div>';
        }
        document.querySelector('#c').innerHTML = html;
    },
    add: function (song) {
        this.songList.push(song);
    },
    indexOf: function (songName) {
        var i = 0, len = this.songList.length;

        for (; i < len; i++) {
            if (this.songList[i].songName === songName) {
                return i;
            }
        }
        return -1;
    },
    remove: function (songName) {
        var index = this.indexOf(songName);
        if (index !== -1) {
            this.songList.splice(index, 1);
        }
    },
    search: function (songName) {
        var index = this.indexOf(songName);
        if (index !== -1) {
            return this.songList[index];
        } else {
            return null;
        }
    },
    update: function (songName, singer) {
        var song = this.search(songName);
        if (song) {
            song.singer = singer;
        }
    }
};

$.fn.extend({
    renderSongManage: function(options) {
        var songMag = new SongManage(options);
        songMag.nContainer = this.get(0);
        songMag.render();
    }
});
